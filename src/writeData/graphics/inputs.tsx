import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const inputsLogo: FC<Props> = ({style}) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 150 150"
    xmlSpace="preserve"
    style={style}
  >
    <style>
      {
        '.st0{fill:#fff}.st1{fill:#757888}.st2{fill:#0f0e15}.st3{fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}'
      }
    </style>
    <path className="st0" d="m105.1 75-3-1.8-3.7 2.1-8.3-4.8v13.2z" />
    <path className="st1" d="M83.3 52.8v9.6L75 57.6z" />
    <path className="st2" d="M44.9 92.4V57.6L75 75v34.8z" />
    <path className="st0" d="m83.3 49.3 15.1-8.7 15.1 8.7L98.4 58z" />
    <path className="st2" d="m90.1 66.3-6.8-3.9V49.3L98.4 58v17.3l-8.3-4.8z" />
    <path className="st1" d="M113.5 66.7V49.3L98.4 58v17.3z" />
    <path
      className="st0"
      d="M44.9 57.6 75 40.2c3.4 2 12 6.9 12 6.9l-3.7 2.1v3.5s-5.2 3-8.3 4.8c5 2.9 10 5.8 15.1 8.7L75 75 44.9 57.6z"
    />
    <path className="st1" d="m105.1 75-15 8.7V66.3L75 75v34.8l30.1-17.4z" />
    <path
      className="st3"
      d="m105.1 75-3-1.8-3.7 2.1-8.3-4.8v13.2zM83.3 52.8v9.6L75 57.6zM44.9 92.4V57.6L75 75v34.8zM83.3 49.3l15.1-8.7 15.1 8.7L98.4 58z"
    />
    <path
      className="st3"
      d="m90.1 66.3-6.8-3.9V49.3L98.4 58v17.3l-8.3-4.8zM113.5 66.7V49.3L98.4 58v17.3z"
    />
    <path
      className="st3"
      d="M44.9 57.6 75 40.2c3.4 2 12 6.9 12 6.9l-3.7 2.1v3.5s-5.2 3-8.3 4.8c5 2.9 10 5.8 15.1 8.7L75 75 44.9 57.6zM105.1 75l-15 8.7V66.3L75 75v34.8l30.1-17.4z"
    />
  </svg>
)

export default inputsLogo
