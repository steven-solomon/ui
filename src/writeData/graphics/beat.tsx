import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const beatLogo: FC<Props> = ({style}) => (
  <svg width={64} height={64} xmlns="http://www.w3.org/2000/svg" style={style}>
    <title>beats-logo-color-64px</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h64v64H0z" />
      <path
        d="M45.32 27.873a16.774 16.774 0 0 0-9.008-2.623H11v13.5h18.562c7.204 0 13.337-4.523 15.758-10.877"
        fill="#343741"
      />
      <path
        d="M49.284 31.335C45.75 38.673 38.237 43.75 29.562 43.75H11V59h25.312c9.321 0 16.875-7.556 16.875-16.875 0-4.105-1.467-7.865-3.903-10.79"
        fill="#00BFB3"
      />
      <path
        d="M45.32 27.873a16.797 16.797 0 0 0 1.117-5.998C46.437 12.555 38.883 5 29.562 5H11v20.25h25.312c3.317 0 6.4.97 9.008 2.623"
        fill="#07C"
      />
    </g>
  </svg>
)

export default beatLogo
