// Libraries
import React, {PureComponent, RefObject, createRef} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import memoizeOne from 'memoize-one'

// Styles
import 'src/tasks/components/tasksPagination.scss'

// Components
import {ResourceList} from '@influxdata/clockface'
import TaskCard from 'src/tasks/components/TaskCard'

// Types
import EmptyTasksList from 'src/tasks/components/EmptyTasksList'
import {AppState, Pageable, Task} from 'src/types'
import {SortTypes} from 'src/shared/utils/sort'
import {Sort} from '@influxdata/clockface'
import {TaskSortKey} from 'src/shared/components/resource_sort_dropdown/generateSortItems'

// Selectors
import {getSortedResources} from 'src/shared/utils/sort'
import {getMe} from 'src/me/selectors'
import {getOrg} from 'src/organizations/selectors'

// Contexts
import {
  addPinnedItem,
  deletePinnedItemByParam,
  PinnedItemTypes,
} from 'src/shared/contexts/pinneditems'

// Utils
import {event} from 'src/cloud/utils/reporting'
import {isFlagEnabled} from 'src/shared/utils/featureFlag'
import {CLOUD} from 'src/shared/constants'
import {notify} from 'src/shared/actions/notifications'

import {PaginationNav} from '@influxdata/clockface'

import {
  pinnedItemFailure,
  pinnedItemSuccess,
} from 'src/shared/copy/notifications'

let getPinnedItems
if (CLOUD) {
  getPinnedItems = require('src/shared/contexts/pinneditems').getPinnedItems
}

interface OwnProps {
  pageHeight: number
  pageWidth: number
  tasks: Task[]
  searchTerm: string
  onActivate: (task: Task) => void
  onDelete: (task: Task) => void
  onCreate: () => void
  onClone: (task: Task) => void
  onFilterChange: (searchTerm: string) => void
  totalCount: number
  onAddTaskLabel: any
  onRunTask: any
  onUpdate: (name: string, taskID: string) => void
  filterComponent?: JSX.Element
  sortKey: TaskSortKey
  sortDirection: Sort
  sortType: SortTypes
  checkTaskLimits: any
}

interface State {
  taskLabelsEdit: Task
  isEditingTaskLabels: boolean
  pinnedItems: any[]
}

type ReduxProps = ConnectedProps<typeof connector>
type Props = OwnProps & ReduxProps

const DEFAULT_PAGINATION_CONTROL_HEIGHT = 62

class TasksList extends PureComponent<Props, State> implements Pageable {
  private memGetSortedResources = memoizeOne<typeof getSortedResources>(
    getSortedResources
  )

  private isComponentMounted: boolean
  private paginationRef: RefObject<HTMLDivElement>

  public currentPage: number = 1
  public rowsPerPage: number = 10
  public totalPages: number

  constructor(props) {
    super(props)
    this.state = {
      taskLabelsEdit: null,
      isEditingTaskLabels: false,
      pinnedItems: [],
    }

    this.paginationRef = createRef<HTMLDivElement>()
  }

  public componentDidMount() {
    this.isComponentMounted = true
    const params = new URLSearchParams(window.location.search)
    const urlPageNumber = parseInt(params.get('page'), 10)

    const passedInPageIsValid =
      urlPageNumber && urlPageNumber <= this.totalPages && urlPageNumber > 0
    if (passedInPageIsValid) {
      this.currentPage = urlPageNumber
    }

    this.props.checkTaskLimits()
    if (CLOUD && isFlagEnabled('pinnedItems')) {
      this.updatePinnedItems()
    }
  }

  public componentDidUpdate() {
    // if the user filters the list while on a page that is
    // outside the new filtered list put them on the last page of the new list
    if (this.currentPage > this.totalPages) {
      this.paginate(this.totalPages)
    }
  }

  public componentWillUnmount() {
    this.isComponentMounted = false
  }

  public render() {
    const heightWithPagination =
      this.paginationRef?.current?.clientHeight ||
      DEFAULT_PAGINATION_CONTROL_HEIGHT
    const height = this.props.pageHeight - heightWithPagination

    this.totalPages = Math.max(
      Math.ceil(this.props.tasks.length / this.rowsPerPage),
      1
    )

    return (
      <>
        <ResourceList style={{width: this.props.pageWidth}}>
          <ResourceList.Body
            style={{maxHeight: height, minHeight: height, overflow: 'auto'}}
            emptyState={
              <EmptyTasksList
                searchTerm={this.props.searchTerm}
                onCreate={this.onCreate}
                totalCount={this.props.totalCount}
              />
            }
          >
            {this.renderRows()}
          </ResourceList.Body>
        </ResourceList>
        <PaginationNav.PaginationNav
          ref={this.paginationRef}
          style={{width: this.props.pageWidth}}
          totalPages={this.totalPages}
          currentPage={this.currentPage}
          pageRangeOffset={1}
          onChange={this.paginate}
        />
      </>
    )
  }

  public updatePinnedItems = () => {
    getPinnedItems()
      .then(res => {
        if (this.isComponentMounted) {
          this.setState(prev => ({...prev, pinnedItems: res}))
        }
      })
      .catch(err => console.error(err))
  }

  public handlePinTask = async (taskID: string, name: string) => {
    const {org, me} = this.props

    // add to pinned item list
    try {
      await addPinnedItem({
        orgID: org.id,
        userID: me.id,
        metadata: {
          taskID,
          name,
        },
        type: PinnedItemTypes.Task,
      })
      this.props.sendNotification(pinnedItemSuccess('task', 'added'))
      this.updatePinnedItems()
    } catch (err) {
      this.props.sendNotification(pinnedItemFailure(err.message, 'add'))
    }
  }

  public handleUnpinTask = async (taskID: string) => {
    // delete from pinned item list
    try {
      await deletePinnedItemByParam(taskID)
      this.props.sendNotification(pinnedItemSuccess('task', 'deleted'))
      this.updatePinnedItems()
    } catch (err) {
      this.props.sendNotification(pinnedItemFailure(err.message, 'delete'))
    }
  }

  public paginate = page => {
    this.currentPage = page
    const url = new URL(location.href)
    url.searchParams.set('page', page)
    history.replaceState(null, '', url.toString())
    this.forceUpdate()
  }

  private onCreate = () => {
    event('Task Created From Dropdown', {source: 'list'})
    this.props.onCreate()
  }

  private renderRows(): JSX.Element[] {
    const {tasks, sortKey, sortDirection, sortType} = this.props

    const sortedTasks = this.memGetSortedResources(
      tasks,
      sortKey,
      sortDirection,
      sortType
    )

    const startIndex = this.rowsPerPage * Math.max(this.currentPage - 1, 0)
    const endIndex = Math.min(
      startIndex + this.rowsPerPage,
      this.props.totalCount
    )

    const rows = []
    for (let i = startIndex; i < endIndex; i++) {
      const task = sortedTasks[i]
      if (task) {
        rows.push(
          <TaskCard
            key={`task-id--${task.id}`}
            task={task}
            onActivate={this.props.onActivate}
            onDelete={this.props.onDelete}
            onClone={this.props.onClone}
            onUpdate={this.props.onUpdate}
            onRunTask={this.props.onRunTask}
            onFilterChange={this.props.onFilterChange}
            onPinTask={this.handlePinTask}
            onUnpinTask={this.handleUnpinTask}
            isPinned={
              this.state.pinnedItems?.length &&
              !!this.state.pinnedItems.find(
                item => item?.metadata.taskID === task.id
              )
            }
          />
        )
      }
    }
    return rows
  }
}

const mdtp = {
  sendNotification: notify,
}

const mstp = (state: AppState) => {
  const me = getMe(state)
  const org = getOrg(state)

  return {
    me,
    org,
  }
}

const connector = connect(mstp, mdtp)

export default connector(TasksList)
