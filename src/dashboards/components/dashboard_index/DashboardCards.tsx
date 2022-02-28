// Libraries
import React, {FC, useState, useEffect, useMemo} from 'react'
import {connect} from 'react-redux'

// Components
import DashboardCard from 'src/dashboards/components/dashboard_index/DashboardCard'
import {TechnoSpinner} from '@influxdata/clockface'
import AssetLimitAlert from 'src/cloud/components/AssetLimitAlert'

// Selectors
import {getSortedResources, SortTypes} from 'src/shared/utils/sort'

// Types
import {AppState, Dashboard, RemoteDataState} from 'src/types'
import {Sort} from 'src/clockface'
import {LimitStatus} from 'src/cloud/actions/limits'

// Utils
import {extractDashboardLimits} from 'src/cloud/utils/limits'
import {isFlagEnabled} from 'src/shared/utils/featureFlag'
import {CLOUD} from 'src/shared/constants'

let getPinnedItems: () => Promise<any>
if (CLOUD) {
  getPinnedItems = require('src/shared/contexts/pinneditems').getPinnedItems
}

interface StateProps {
  limitStatus: LimitStatus['status']
}

interface OwnProps {
  dashboards: Dashboard[]
  sortKey: string
  sortDirection: Sort
  sortType: SortTypes
  onFilterChange: (searchTerm: string) => void
}

const DashboardCards: FC<OwnProps & StateProps> = ({
  dashboards,
  sortDirection,
  sortKey,
  sortType,
  onFilterChange,
  limitStatus,
}) => {
  const [windowSize, setWindowSize] = useState(0)
  const [pages, setPages] = useState(1)
  const [pinnedItems, setPinnedItems] = useState([])

  let _observer: IntersectionObserver
  let _isMounted: boolean = true
  let _spinner: Element

  useEffect(() => {
    if (isFlagEnabled('pinnedItems') && CLOUD) {
      getPinnedItems()
        .then((res: React.SetStateAction<any[]>) => {
          if (_isMounted) {
            setWindowSize(15)
            setPinnedItems(res)
          }
        })
        .catch((err: any) => {
          console.error(err)
        })
    } else {
      setWindowSize(15)
    }
    return function cleanup() {
      _isMounted = false
    }
  }, [])

  const registerSpinner = (elem: any) => {
    _spinner = elem

    if (!elem) {
      return
    }

    let count = 1.0
    const threshold = []

    while (count > 0) {
      threshold.push(count)
      count -= 0.1
    }

    threshold.reverse()

    _observer = new IntersectionObserver(measure, {
      threshold,
      rootMargin: '60px 0px',
    })

    _observer.observe(_spinner)
  }

  const measure = (entries: any[]) => {
    if (
      entries
        .map(e => e.isIntersecting)
        .reduce((prev, curr) => prev || curr, false)
    ) {
      setPages(prevPages => prevPages + 1)
    }
  }

  const sortedDashboards = useMemo(
    () => getSortedResources(dashboards, sortKey, sortDirection, sortType),
    [dashboards, sortKey, sortDirection, sortType]
  )

  return (
    <div style={{height: '100%'}}>
      <div className="dashboards-card-grid">
        {sortedDashboards
          .filter(d => d.status === RemoteDataState.Done)
          .slice(0, pages * windowSize)
          .map(({id, name, description, labels, meta}) => (
            <DashboardCard
              key={id}
              id={id}
              name={name}
              labels={labels}
              updatedAt={meta.updatedAt}
              description={description}
              onFilterChange={onFilterChange}
              isPinned={
                !!pinnedItems.find(item => item?.metadata.dashboardID === id)
              }
            />
          ))}
        <AssetLimitAlert
          className="dashboards--asset-alert"
          resourceName="dashboards"
          limitStatus={limitStatus}
        />
      </div>
      {windowSize * pages < dashboards.length && (
        <div
          style={{height: '140px', margin: '14px auto'}}
          ref={registerSpinner}
        >
          <TechnoSpinner />
        </div>
      )}
    </div>
  )
}

const mstp = (state: AppState) => {
  return {
    limitStatus: extractDashboardLimits(state),
  }
}

export default connect(mstp)(React.memo(DashboardCards))
