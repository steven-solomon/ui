import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const hddtempLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 50"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M1 29V17h54m-6 24c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm6-8H1v12c0 2 2 4 4 4h50c2 0 4-2 4-4V5c0-2-2-4-4-4H5C3 1 1 3 1 5v8m28 28H11m38-16c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-20 0H11M49 9c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM29 9H11"
      style={{
        fill: 'none',
        stroke: '#22adf6',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 10,
      }}
    />
  </svg>
)

export default hddtempLogo
