import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const clickhouseLogo: FC<Props> = ({style}) => (
  <svg
    height={2222}
    viewBox="0 0 9 8"
    width={2500}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path d="M0 7h1v1H0z" fill="red" />
    <path
      d="M0 0h1v7H0zm2 0h1v8H2zm2 0h1v8H4zm2 0h1v8H6zm2 3.25h1v1.5H8z"
      fill="#fc0"
    />
  </svg>
)

export default clickhouseLogo
