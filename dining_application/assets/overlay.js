import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const Overlay = (props) => (
    <Svg
        width={props.width}
        height={"100%"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h390v390H0z" />
        <Defs>
            <LinearGradient
                id="a"
                x1={195}
                y1={0}
                x2={195}
                y2={390}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#fff" stopOpacity={0} />
                <Stop offset={1} stopColor="#0B0B0D" stopOpacity={0.5} />
            </LinearGradient>
        </Defs>
    </Svg>
)

export default Overlay
