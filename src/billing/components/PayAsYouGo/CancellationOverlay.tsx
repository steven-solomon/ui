// Libraries
import React, {FC, useContext, useMemo, useState} from 'react'
import {
  Overlay,
  Alert,
  ComponentColor,
  ComponentSize,
  IconFont,
  Button,
  ComponentStatus,
} from '@influxdata/clockface'

// Components
import TermsCancellationOverlay from 'src/billing/components/PayAsYouGo/TermsCancellationOverlay'
import ConfirmCancellationOverlay from 'src/billing/components/PayAsYouGo/ConfirmCancellationOverlay'
import {CancelServiceContext, VariableItems} from './CancelServiceContext'
import {track} from 'rudder-sdk-js'
import {event} from 'src/cloud/utils/reporting'
import {useDispatch, useSelector} from 'react-redux'
import {getQuartzMe} from 'src/me/selectors'
import {getOrg} from 'src/organizations/selectors'
import {isFlagEnabled} from 'src/shared/utils/featureFlag'
import {postSignout} from 'src/client'
import {postCancel} from 'src/client/unityRoutes'
import {getErrorMessage} from 'src/utils/api'
import {accountCancellationError} from 'src/shared/copy/notifications'
import {notify} from 'src/shared/actions/notifications'

interface Props {
  onHideOverlay: () => void
}

const CancellationOverlay: FC<Props> = ({onHideOverlay}) => {
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)
  const [hasClickedCancel, setHasClickedCancel] = useState(false)
  const {
    reason,
    canContactForFeedback,
    suggestions,
    shortSuggestion,
    getRedirectLocation,
  } = useContext(CancelServiceContext)
  const quartzMe = useSelector(getQuartzMe)
  const org = useSelector(getOrg)
  const dispatch = useDispatch()

  const handleCancelAccount = async () => {
    try {
      event('Cancel account initiated')
      const resp = await postCancel({})

      if (resp.status !== 204) {
        throw new Error(resp.data.message)
      }
      event('Cancel account success')
    } catch (error) {
      const message = getErrorMessage(error)
      event('Cancel account failed', {message})
      dispatch(notify(accountCancellationError(message)))
    }
  }

  const handleCancelService = async () => {
    if (!hasClickedCancel) {
      setHasClickedCancel(true)
      return
    }

    const payload = {
      org: org.id,
      tier: quartzMe?.accountType,
      email: quartzMe?.email,
      alternativeProduct: shortSuggestion,
      suggestions,
      reason: VariableItems[reason],
      canContactForFeedback: canContactForFeedback ? 'true' : 'false',
    }
    event('CancelServiceExecuted Event', payload)

    if (isFlagEnabled('rudderstackReporting')) {
      // Send to Rudderstack
      track('CancelServiceExecuted', payload)
    }

    await handleCancelAccount()

    event('Canceled service. Signout initiated')
    postSignout({})
      .then(() => {
        event('Signout success')
        window.location.href = getRedirectLocation()
      })
      .catch(() => event('Cancel service failed', payload))
  }

  const handleDismiss = () => {
    const payload = {
      org: org.id,
      tier: quartzMe?.accountType,
      email: quartzMe?.email,
    }
    event('CancelServiceDismissed Event', payload)

    if (isFlagEnabled('rudderstackReporting')) {
      // Send to Rudderstack
      track('CancelServiceDismissed', payload)
    }

    setHasClickedCancel(false)
    onHideOverlay()
  }

  const isFormValid = useMemo(() => {
    // Has Agreed to Terms & Conditions
    // as well as
    // Selected an option from the Reasons Dropdown
    return hasAgreedToTerms && VariableItems[reason] !== VariableItems.NO_OPTION
  }, [hasAgreedToTerms, reason])

  return (
    <Overlay visible={true} className="cancellation-overlay">
      <Overlay.Container maxWidth={700}>
        <Overlay.Header title="Cancel Service" onDismiss={handleDismiss} />
        <Overlay.Body>
          <Alert
            color={ComponentColor.Danger}
            icon={IconFont.AlertTriangle}
            testID="cancel-overlay--alert"
          >
            This action cannot be undone
          </Alert>
          {hasClickedCancel ? (
            <ConfirmCancellationOverlay />
          ) : (
            <TermsCancellationOverlay
              hasAgreedToTerms={hasAgreedToTerms}
              onAgreedToTerms={() => setHasAgreedToTerms(prev => !prev)}
            />
          )}
        </Overlay.Body>
        <Overlay.Footer>
          <Button
            color={ComponentColor.Danger}
            onClick={handleCancelService}
            text={
              hasClickedCancel === false
                ? 'I understand, Cancel Service'
                : 'Confirm and Cancel Service'
            }
            size={ComponentSize.Small}
            status={
              isFormValid ? ComponentStatus.Default : ComponentStatus.Disabled
            }
            testID="cancel-service-confirmation--button"
          />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  )
}

export default CancellationOverlay
