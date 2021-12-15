import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const amqp_consumerLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M417.4 211.4H296.1c-6.1 0-11-4.9-11-11V73.9c0-9.4-7.6-17-17-17h-43.3c-9.4 0-17 7.6-17 17v125.7c0 6.5-5.3 11.8-11.8 11.8l-39.8.2c-6.6 0-11.9-5.3-11.9-11.9l.4-125.7c0-9.4-7.6-17-17-17H84.5c-9.4 0-17 7.6-17 17v354c0 8.3 6.7 15.1 15 15.1h334.9c8.3 0 15.1-6.7 15.1-15.1V226.5c0-8.4-6.7-15.1-15.1-15.1zm-56.8 132.9c0 10.9-8.8 19.7-19.7 19.7h-34.2c-10.9 0-19.7-8.8-19.7-19.7v-34.2c0-10.9 8.8-19.7 19.7-19.7h34.2c10.9 0 19.7 8.8 19.7 19.7v34.2z"
      style={{
        fill: '#f60',
      }}
    />
  </svg>
)

export default amqp_consumerLogo
