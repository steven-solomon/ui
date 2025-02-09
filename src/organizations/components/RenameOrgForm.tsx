// Libraries
import React, {ChangeEvent, PureComponent} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'

// Components
// Types
import {
  AlignItems,
  Button,
  ButtonType,
  ComponentColor,
  ComponentSize,
  ComponentStatus,
  FlexBox,
  FlexDirection,
  Form,
  Input,
  Overlay,
} from '@influxdata/clockface'
import {ErrorHandling} from 'src/shared/decorators/errors'

// Actions
import {renameOrg} from 'src/organizations/actions/thunks'
import {AppState, Organization, ResourceType} from 'src/types'

// Selectors
import {getAll} from 'src/resources/selectors'

type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps & RouteComponentProps<{orgID: string}>

interface State {
  org: Organization
}

@ErrorHandling
class RenameOrgForm extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      org: this.props.startOrg,
    }
  }

  public render() {
    const {org} = this.state

    const footerStyle = {
      display: 'flex',
      alignSelf: 'flex-end',
      marginTop: '10px',
    }
    return (
      <Form onSubmit={this.handleRenameOrg}>
        <Overlay.Body>
          <Form.ValidationElement
            label="Name"
            validationFunc={this.handleValidation}
            value={org.name}
          >
            {status => (
              <>
                <FlexBox
                  alignItems={AlignItems.Center}
                  direction={FlexDirection.Column}
                  margin={ComponentSize.Large}
                >
                  <Input
                    placeholder="Give your organization a name"
                    name="name"
                    autoFocus={true}
                    onChange={this.handleInputChange}
                    value={org.name}
                    status={status}
                    testID="create-org-name-input"
                  />
                  <div style={footerStyle}>
                    <Button
                      text="Cancel"
                      color={ComponentColor.Tertiary}
                      onClick={this.handleGoBack}
                    />
                    <Button
                      text="Save changes"
                      status={this.saveButtonStatus(status)}
                      color={ComponentColor.Success}
                      type={ButtonType.Submit}
                      testID="rename-org-submit--button"
                    />
                  </div>
                </FlexBox>
              </>
            )}
          </Form.ValidationElement>
        </Overlay.Body>
      </Form>
    )
  }

  private saveButtonStatus = (
    validationStatus: ComponentStatus
  ): ComponentStatus => {
    if (
      this.state.org.name === this.props.startOrg.name ||
      validationStatus === ComponentStatus.Error
    ) {
      return ComponentStatus.Disabled
    }

    return validationStatus
  }

  private handleGoBack = () => {
    this.props.history.push(`/orgs/${this.props.startOrg.id}/about`)
  }

  private handleValidation = (orgName: string): string | null => {
    if (!orgName) {
      return 'Name is required'
    }

    if (!this.isUniqueName(orgName)) {
      return 'This org name is taken'
    }
  }

  private isUniqueName = (orgName: string): boolean => {
    return !this.props.orgNames.find(o => o === orgName)
  }

  private handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value
    const org = {...this.state.org, name}

    this.setState({org})
  }

  private handleRenameOrg = async () => {
    const {onRenameOrg, startOrg} = this.props
    const {org} = this.state

    await onRenameOrg(startOrg.name, org)

    this.handleGoBack()
  }
}

const mstp = (state: AppState) => {
  const {resources} = state
  const {
    orgs: {org: startOrg},
  } = resources
  const orgs = getAll<Organization>(state, ResourceType.Orgs)

  const orgNames = orgs.filter(o => o.id !== startOrg.id).map(o => o.name)

  return {startOrg, orgNames}
}

const mdtp = {
  onRenameOrg: renameOrg,
}

const connector = connect(mstp, mdtp)

export default connector(withRouter(RenameOrgForm))
