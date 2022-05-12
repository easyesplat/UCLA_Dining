import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const RedHeart = (props) => (
    <Svg
        width={43}
        height={43}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={21.5} cy={21.5} r={21.5} fill="#F5ABAB" />
        <Path
        d="M30.291 15.612a5.5 5.5 0 0 0-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
        stroke="#D24040"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        />
    </Svg>
)

export default RedHeart
