import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const aerospikeLogo: FC<Props> = ({style}) => (
  <svg
    width="2500"
    height="2500"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    style={style}
  >
    <path d="M0 0h256v256H0V0z" fill="#B0252A" />
    <path
      d="M156.293 95.605l-73.169 32.594 73.17 32.81V95.605zm-92.032 39.979l-17.049-7.3 17.049-7.882 144.527-65.376v17.403l-37.932 16.824v78.117l37.932 17v16.604L64.26 135.584z"
      fill="#FFF"
    />
  </svg>
)

export default aerospikeLogo
