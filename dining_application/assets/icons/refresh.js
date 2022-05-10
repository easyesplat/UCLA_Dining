import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Refresh = (props) => (
    <Svg
        width={26}
        height={22}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M1 2.08v6.5h6.5M24.833 19.414v-6.5h-6.5"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M22.114 7.497a9.751 9.751 0 0 0-16.087-3.64L1 8.581m23.833 4.333-5.026 4.723a9.75 9.75 0 0 1-16.088-3.64"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default Refresh