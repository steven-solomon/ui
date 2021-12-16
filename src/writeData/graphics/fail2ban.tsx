import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const fail2banLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 54.64 54.64"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M53.64 27.32c0 14.54-11.78 26.32-26.32 26.32S1 41.85 1 27.32 12.78 1 27.32 1s26.32 11.78 26.32 26.32zM11.53 11.6c-4.03 4.03-6.49 9.57-6.49 15.72 0 12.3 9.97 22.28 22.28 22.28 5.13 0 9.86-1.74 13.63-4.65m3.21-3.05c3.39-3.9 5.44-9 5.44-14.58 0-12.3-9.97-22.28-22.28-22.28-4.58 0-8.83 1.38-12.37 3.75m2.11 13.24h-4.09c-1.1 0-2 .9-2 2v6.57c0 1.1.9 2 2 2h13.66m12.69.01h2.34c1.1 0 2-.9 2-2v-6.57c0-1.1-.9-2-2-2H30.15m-14.96 5.28h6.13m16.2 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6.64 12.58L14.95 8.79m26 36.15L11.53 11.6"
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

export default fail2banLogo
