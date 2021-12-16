import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const fibaroLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 115.9 24.2"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M0 .4v23.3h4.9v-9.4h11v-4.2h-11V4.8H18V.4H0zm20.3 0h4.9v23.3h-4.9V.4zm24.2 11.2c1.9 1.1 3 3.2 3 5.3 0 3.9-2.5 6.8-8 6.8H27.4V.4h11.8c5.1 0 7.7 2.8 7.7 6.2-.1 2.1-1 4.2-2.4 5m-5.9-2c2.2 0 3.3-.9 3.3-2.6s-1.1-2.6-3.3-2.6h-6.3v5.3l6.3-.1zm.1 9.9c2.4 0 3.8-.9 3.8-2.9s-1.2-3-3.7-3h-6.5v5.9h6.4zM83.5.4c5.2 0 8.2 2.7 8.2 7.2.2 2.6-1.2 5-3.5 6.2l3.5 9.8h-4.9L83.7 15h-7.1v8.8h-4.9V.4h11.8zm-6.9 10.4h6.3c2.9 0 3.9-1.1 3.9-3.1 0-2.2-1.2-3-4.4-3h-5.8v6.1zm39.3 1.3c0 6.9-4 12.1-11.4 12.1S93.1 19 93.1 12.1 97.1 0 104.5 0s11.4 5.2 11.4 12.1m-5 0c0-4.3-2-7.7-6.4-7.7s-6.4 3.4-6.4 7.7 2 7.7 6.4 7.7 6.4-3.4 6.4-7.7m-47.3 5.3h-9.3l-1.9 6.3h-4.8L55 .4h8l7.4 23.3h-5l-1.8-6.3zm-8.1-4.2h6.7l-2.4-8.1H58l-2.5 8.1z"
      style={{
        fill: '#fff',
      }}
    />
  </svg>
)

export default fibaroLogo
