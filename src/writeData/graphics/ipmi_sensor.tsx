import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const ipmi_sensorLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M30 33c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm2.1-5.1L47 13M27.8 32.2 24 36m31-6h-4m3.1-6.5-3.9 1m1.4-7-3.5 2m-6.5-9.3C38.2 8.2 34.2 7 30 7 17.3 7 7 17.3 7 30c0 4.2.9 9 4 13m37 4H6.5h0c5.3 7.2 13.9 12 23.5 12 16 0 29-13 29-29S46 1 30 1 1 14 1 30c0 4.7 1.1 9.1 3.1 13.1"
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

export default ipmi_sensorLogo
