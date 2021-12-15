import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const cloudwatchLogo: FC<Props> = ({style}) => (
  <svg
    width={2207}
    height={2500}
    viewBox="0 0 256 290"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    style={style}
  >
    <path
      d="m256 199.305-127.957-18.797L0 199.329l128.01 47.439L256 199.305"
      fill="#B7CA9D"
    />
    <path
      d="m25.621 197.113 21.63 6.761 1.971-2.238V50.284l-1.971-2.585-21.63 8.274v141.14"
      fill="#4B612C"
    />
    <path
      d="m123.832 190.423-76.581 13.451V47.703l76.581 17.222v125.498"
      fill="#759C3E"
    />
    <path
      d="m89.686 216.889-29.848-9.201V14.928L89.686.004l2.612 2.845v210.858l-2.612 3.182"
      fill="#4B612C"
    />
    <path
      d="M191.967 192.894 89.686 216.889V0l102.281 39.866v153.028"
      fill="#759C3E"
    />
    <path
      d="M127.965 244.714 0 199.329v26.324l127.965 63.983v-44.922"
      fill="#4B612C"
    />
    <path
      d="m256 225.622-128.035 64.014v-44.922L256 199.305v26.317"
      fill="#759C3E"
    />
    <path
      d="M220.039 155.692h-31.026l-88.445 6.026L128 166.775l92.039-11.083"
      fill="#B7CA9D"
    />
    <path
      d="m100.568 219.906 27.42 8.226.789-.849-.023-61.849-.789-.758-27.397-2.958v58.188"
      fill="#4B612C"
    />
    <path
      d="m220.039 155.692-92.074 8.98.023 63.46 92.051-27.711v-44.729"
      fill="#759C3E"
    />
  </svg>
)

export default cloudwatchLogo
