import React, {CSSProperties, FC} from 'react'

interface Props {
  style: CSSProperties
}

const burrowLogo: FC<Props> = ({style}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1538 2500"
    xmlSpace="preserve"
    style={style}
  >
    <path
      d="M1212.5 1383.5c-97.2 0-184.4 43.1-244.1 110.9l-153-108.3c16.2-44.7 25.6-92.7 25.6-143 0-49.4-9-96.6-24.7-140.6l152.6-107.1c59.7 67.5 146.6 110.3 243.6 110.3 179.5 0 325.5-146 325.5-325.5s-146-325.5-325.5-325.5S887 600.7 887 780.2c0 32.1 4.9 63.1 13.6 92.5L747.8 979.8C684 900.6 592.1 845.4 487.4 828.5V644.4c147.5-31 258.6-162 258.6-318.5C746 146.4 600 .4 420.5.4S94.9 146.4 94.9 325.9c0 154.4 108.2 283.8 252.7 317v186.5C150.5 864 0 1036.1 0 1243.1c0 208 151.9 380.7 350.6 414.2v196.9C204.6 1886.3 95 2016.5 95 2172c0 179.5 146 325.5 325.5 325.5S746 2351.5 746 2172c0-155.5-109.7-285.7-255.6-317.8v-196.9c100.5-16.9 191.5-69.8 255.9-148.8l154 109c-8.5 29.1-13.3 59.8-13.3 91.6 0 179.5 146 325.5 325.5 325.5s325.5-146 325.5-325.5-146-325.6-325.5-325.6zm0-761.2c87 0 157.8 70.8 157.8 157.8S1299.5 938 1212.5 938s-157.8-70.8-157.8-157.8 70.7-157.9 157.8-157.9zM262.6 325.9c0-87 70.8-157.8 157.8-157.8s157.8 70.8 157.8 157.8-70.8 157.8-157.8 157.8-157.8-70.8-157.8-157.8zM578.3 2172c0 87-70.8 157.8-157.8 157.8S262.6 2259 262.6 2172s70.8-157.8 157.8-157.8S578.3 2085 578.3 2172zm-157.8-708.8c-121.4 0-220.1-98.7-220.1-220.1 0-121.4 98.8-220.1 220.1-220.1 121.4 0 220.1 98.8 220.1 220.1 0 121.4-98.8 220.1-220.1 220.1zm792 403.6c-87 0-157.8-70.8-157.8-157.8 0-87 70.8-157.8 157.8-157.8s157.8 70.8 157.8 157.8c0 87-70.8 157.8-157.8 157.8z"
      style={{
        fill: '#fff',
      }}
    />
  </svg>
)

export default burrowLogo
