import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const directory_monitorLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 47.6 35.98"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M1 32.66V3.32C1 2.04 2.04 1 3.32 1h10.37c.81 0 1.55.42 1.98 1.1l.22.36c.42.69 1.17 1.1 1.98 1.1h26.41c1.28 0 2.32 1.04 2.32 2.32v26.77c0 1.28-1.04 2.32-2.32 2.32H3.32A2.307 2.307 0 0 1 1 32.66zM1 7.23h41.82m-7.12 7.08H11.95v13.11H35.7V14.31zm-18.73 4.01h7.96m-7.96 5.09h13.7"
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

export default directory_monitorLogo
