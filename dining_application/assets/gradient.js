import * as React from "react"
import Svg, { G, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

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
                <Stop stopColor="#2774AE" />
                <Stop offset={1} stopColor="#FFD100" stopOpacity={0.62} />
            </LinearGradient>
        </Defs>
    </Svg>
)

export default Gradient


//git log --oneline --decorate --graph --all 14a38adf53033553da085549be989f02ca9d4ee4..79aed792415b35d1b31ddc26814a211c7bae97fe
