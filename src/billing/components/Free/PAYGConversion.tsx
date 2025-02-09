// Libraries
import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {
  Panel,
  ComponentSize,
  ComponentColor,
  Gradients,
  Grid,
  Columns,
  Heading,
  HeadingElement,
  FontWeight,
  Button,
} from '@influxdata/clockface'
import {useHistory} from 'react-router-dom'

// Components
import CloudUpgradeButton from 'src/shared/components/CloudUpgradeButton'
import {GoogleOptimizeExperiment} from 'src/cloud/components/experiments/GoogleOptimizeExperiment'

// Utils
import {shouldGetCredit250Experience} from 'src/me/selectors'
import {isFlagEnabled} from 'src/shared/utils/featureFlag'
import {event} from 'src/cloud/utils/reporting'
import {getDataLayerIdentity} from 'src/cloud/utils/experiments'

// Constants
import {CREDIT_250_EXPERIMENT_ID} from 'src/shared/constants'

const CARDINALITY_LIMIT = 1_000_000

export const Credit250PAYGConversion: FC = () => {
  const isCredit250ExperienceActive = useSelector(shouldGetCredit250Experience)

  const credit250Experience = (
    <Grid className="credit-250-conversion-panel" key="1">
      <Grid.Column
        className="credit-250-conversion-panel--message"
        widthSM={Columns.Four}
      >
        <Heading
          className="credit-250-conversion-panel--header"
          element={HeadingElement.H3}
          weight={FontWeight.Bold}
        >
          Get free $250 credit
        </Heading>
        <Heading
          className="credit-250-conversion-panel--header"
          element={HeadingElement.H5}
          weight={FontWeight.Regular}
        >
          Credit applied to first 30 days of usage
        </Heading>
        <CloudUpgradeButton
          className="credit-250-conversion-upgrade--button"
          metric={() => {
            const identity = getDataLayerIdentity()
            event(`billing.conversion.payg.credit-250.upgrade`, {
              location: 'billing',
              ...identity,
              experimentId: CREDIT_250_EXPERIMENT_ID,
              experimentVariantId: isCredit250ExperienceActive ? '2' : '1',
            })
          }}
          showPromoMessage={false}
          size={ComponentSize.Large}
        />
      </Grid.Column>
      <Grid.Column widthSM={Columns.Eight}>
        <div className="conversion-panel--list">
          <ul className="credit-250-conversion-panel--benefits">
            <li>Unlimited buckets to store your data</li>
            <li>Unlimited storage retention</li>
            <li>Unlimited dashboards</li>
            <li>Unlimited tasks</li>
            <li>Unlimited alert checks and notification rules</li>
            <li>HTTP and PagerDuty notifications</li>
            <li>
              Up to {Intl.NumberFormat().format(CARDINALITY_LIMIT)} series
              cardinality
            </li>
          </ul>
        </div>
      </Grid.Column>
    </Grid>
  )

  if (isFlagEnabled('credit250Experiment')) {
    if (isCredit250ExperienceActive) {
      return credit250Experience
    }

    return (
      <GoogleOptimizeExperiment
        experimentID={CREDIT_250_EXPERIMENT_ID}
        variants={[credit250Experience]}
      />
    )
  }
  return null
}

export const PAYGConversion: FC = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/checkout')
  }

  return (
    <>
      <Heading
        element={HeadingElement.H2}
        weight={FontWeight.Regular}
        className="section-header"
      >
        Need more wiggle room?
      </Heading>
      <Grid testID="payg-grid--container">
        <Grid.Row>
          <Grid.Column widthSM={Columns.Eight} offsetSM={Columns.Two}>
            <Panel gradient={Gradients.HotelBreakfast}>
              <Panel.Header size={ComponentSize.Medium}>
                <Heading element={HeadingElement.H2}>
                  Switch to a usage-based plan to get:
                </Heading>
              </Panel.Header>
              <Panel.Body size={ComponentSize.Medium}>
                <div>
                  <div className="conversion-panel--list">
                    <ul className="conversion-panel--benefits">
                      <li>Unlimited buckets to store your data</li>
                      <li>Unlimited storage retention</li>
                      <li>Unlimited dashboards</li>
                      <li>Unlimited tasks</li>
                      <li>Unlimited alert checks and notification rules</li>
                      <li>HTTP and PagerDuty notifications</li>
                      <li>
                        Up to {Intl.NumberFormat().format(CARDINALITY_LIMIT)}{' '}
                        series cardinality
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="conversion-panel--final-p">
                  No upfront commitments. Pay only for what you use. Turn off
                  when you don’t need it.
                </p>
              </Panel.Body>
              <Panel.Footer
                size={ComponentSize.Medium}
                testID="payg-button--upgrade"
              >
                <Button
                  color={ComponentColor.Primary}
                  size={ComponentSize.Large}
                  text="Upgrade to a Usage-Based Plan"
                  className="cf-cta-button conversion-panel--cta"
                  onClick={handleClick}
                />
              </Panel.Footer>
            </Panel>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
