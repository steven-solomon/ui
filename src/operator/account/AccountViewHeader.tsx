// Libraries
import React, {FC, useContext} from 'react'
import {
  ButtonBase,
  ComponentColor,
  ButtonShape,
  IconFont,
  FlexBox,
  FlexDirection,
  ComponentSize,
  Icon,
  ComponentStatus,
} from '@influxdata/clockface'
import {Link} from 'react-router-dom'

// Contexts
import {AccountContext} from 'src/operator/context/account'
import {OperatorContext} from 'src/operator/context/operator'

const AccountViewHeader: FC = () => {
  const {account, setVisible, visible} = useContext(AccountContext)
  const {hasWritePermissions} = useContext(OperatorContext)

  return (
    <FlexBox
      direction={FlexDirection.Row}
      margin={ComponentSize.Large}
      stretchToFitWidth={true}
    >
      <FlexBox.Child>
        <Link to="/operator" data-testid="account-view--back-button">
          <Icon glyph={IconFont.CaretLeft_New} />
          Back to Account List
        </Link>
      </FlexBox.Child>
      {hasWritePermissions && (
        <ButtonBase
          color={ComponentColor.Danger}
          shape={ButtonShape.Default}
          onClick={_e => setVisible(!visible)}
          status={
            account?.deletable
              ? ComponentStatus.Default
              : ComponentStatus.Disabled
          }
          testID="account-delete--button"
        >
          Delete Account
        </ButtonBase>
      )}
    </FlexBox>
  )
}

export default AccountViewHeader
