// Libraries
import React, {CSSProperties, FC, Suspense} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

// Components
import {SelectableCard, SquareGrid, ComponentSize} from '@influxdata/clockface'

// Utils
import {getOrg} from 'src/organizations/selectors'

// Graphics
import PlaceholderLogo from 'src/writeData/graphics/placeholderLogo'

// Constants
import {ORGS} from 'src/shared/constants/routes'

// Styles
import 'src/writeData/components/WriteDataItem.scss'

interface Props {
  id: string
  name: string
  url: string
  image?: string
  style?: CSSProperties
  selected?: boolean
  onClick?: any
  testID?: string
}

const WriteDataItem: FC<Props> = ({
  id,
  name,
  url,
  image,
  style,
  selected,
  onClick,
  testID,
}) => {
  const history = useHistory()
  const org = useSelector(getOrg)

  const handleClick = (): void => {
    history.push(`/${ORGS}/${org.id}/load-data/${url}`)
  }

  const svgStyle = style ? style : ({} as CSSProperties)

  let thumb = (
    <Suspense fallback="Loading...">
      <PlaceholderLogo />
    </Suspense>
  )

  if (image) {
    const LazySVG = React.lazy(() => import(`src/writeData/graphics/${image}`))
    console.log('svgStyle:', svgStyle)
    console.log('~~ writeDataItem: image:', image, 'name:', name)
    thumb = (
      <Suspense fallback="Loading">
        <LazySVG style={svgStyle} />
      </Suspense>
    )
  }

  if (onClick) {
    return (
      <SquareGrid.Card key={id}>
        <SelectableCard
          id={id}
          formName="load-data-cards"
          label={name}
          selected={selected}
          onClick={onClick}
          testID={testID}
          fontSize={ComponentSize.ExtraSmall}
          className="write-data--item"
        >
          <div className="write-data--item-thumb">{thumb}</div>
        </SelectableCard>
      </SquareGrid.Card>
    )
  }

  return (
    <SquareGrid.Card key={id}>
      <SelectableCard
        id={id}
        formName="load-data-cards"
        label={name}
        testID={`load-data-item ${id}`}
        selected={false}
        onClick={handleClick}
        fontSize={ComponentSize.ExtraSmall}
        className="write-data--item"
      >
        <div className="write-data--item-thumb">{thumb}</div>
      </SelectableCard>
    </SquareGrid.Card>
  )
}

export default WriteDataItem
