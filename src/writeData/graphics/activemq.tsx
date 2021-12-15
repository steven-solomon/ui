import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const activemqLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 49.203 71.203"
    fill="#fff"
    fillRule="evenodd"
    stroke="#000"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <use xlinkHref="#A" x="3.102" y="3.101" />
    <symbol id="A" overflow="visible">
      <g stroke="none" fillRule="nonzero">
        <use xlinkHref="#C" fill="#c12766" />
        <path
          d="M17.877 53.134l-11.94-.037L0 42.738l5.998-10.322 11.94.037 5.936 10.36z"
          fill="#3e489f"
        />
        <use xlinkHref="#C" x="-0.112" y="21.71" fill="#714099" />
        <use xlinkHref="#C" x="-18.764" y="-10.731" fill="#78932c" />
        <path
          d="M36.734 20.718l-11.94-.037-5.936-10.36L24.855 0l11.94.037 5.936 10.36z"
          fill="#cf242a"
        />
        <use xlinkHref="#D" />
        <use xlinkHref="#D" x="-18.757" y="10.837" />
        <use xlinkHref="#E" />
        <use xlinkHref="#E" x="18.745" y="10.875" />
      </g>
      <path
        d="M29.663 10.874l-16.425 9.4m-1.265 2.338l.062 18.93m1.24 2.016l16.276 9.676"
        stroke="#fff"
        fill="none"
        strokeWidth=".602"
      />
      <use
        xlinkHref="#D"
        x="0.006"
        y="21.58"
        stroke="none"
        fillRule="nonzero"
      />
      <path
        d="M30.748 11.643l.062 18.93m.03 2.766l.062 18.93M29.687 32.69l-16.425 9.4m.074-20.035l16.276 9.677"
        stroke="#fff"
        fill="none"
        strokeWidth=".602"
      />
    </symbol>
    <defs>
      <path
        id="C"
        d="M36.746 42.304l-11.94-.037-5.936-10.36 5.998-10.322 11.94.037 5.936 10.36z"
      />
      <path
        id="D"
        d="M28.992 10.37c0-1.003.808-1.81 1.81-1.81s1.81.808 1.81 1.81-.808 1.81-1.81 1.81-1.81-.808-1.81-1.81z"
      />
      <path
        id="E"
        d="M10.135 42.78c0-1.004.808-1.81 1.81-1.81s1.81.808 1.81 1.81-.808 1.81-1.81 1.81-1.81-.808-1.81-1.81z"
      />
    </defs>
  </svg>
)

export default activemqLogo
