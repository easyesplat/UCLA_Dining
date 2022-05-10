import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

const BellNotification = (props) => (
    <Svg
        width={25}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17.5 13.667a6.5 6.5 0 1 0-13 0c0 7.583-3.25 9.75-3.25 9.75h19.5s-3.25-2.167-3.25-9.75ZM12.874 27.75a2.167 2.167 0 0 1-3.748 0"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle
            cx={18}
            cy={7}
            r={5.5}
            fill="#2774AE"
            stroke="#fff"
            strokeWidth={3}
        />
    </Svg>
)

export default BellNotification