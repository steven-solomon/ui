import React, {FC} from 'react'

// Components
import {Page} from '@influxdata/clockface'
import RateLimitAlert from 'src/cloud/components/RateLimitAlert'

const LoadDataHeader: FC = () => {
  return (
    <Page.Header fullWidth={false} testID="load-data--header">
      <Page.Title title="Load Data" />
      <RateLimitAlert location="load data" />
    </Page.Header>
  )
}

export default LoadDataHeader
