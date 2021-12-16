import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const filecountLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41.71 53.36"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="m30.37 1.01 10.34 10.35M30.37 1.01 3 1c-1.1 0-2 .9-2 2v47.36c0 1.1.9 2 2 2h35.71c1.1 0 2-.9 2-2v-39M30.37 1.01v8.34c0 1.1.9 2 2 2h8.34M8.21 9.96h12.07M8.21 17.88H33.5M8.21 25.8H33.5"
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

export default filecountLogo
