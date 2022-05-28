import * as React from "react"
import Svg, { G, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"

const Gradient = (props) => (
    <Svg
        width={390}
        height={200}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G filter="url(#a)">
            <Ellipse cx={45.5} rx={344.5} ry={100} fill="url(#b)" fillOpacity={0.4} />
        </G>
        <Defs>
            <LinearGradient
                id="b"
                x1={44.844}
                y1={-15.5}
                x2={522.998}
                y2={-17.174}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor={props.color1} />
                <Stop offset={1} stopColor={props.color2} stopOpacity={0.62} />
            </LinearGradient>
        </Defs>
    </Svg>
)

export default Gradient

//#2774AE
//#FFD100
