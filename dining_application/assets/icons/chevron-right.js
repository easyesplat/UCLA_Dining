import * as React from "react"
import Svg, { Path } from "react-native-svg"

// const ChevronRight = (props) => (
// <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={24}
//     height={24}
//     fill="none"
//     stroke="#000"
//     strokeWidth={2.5}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="feather feather-chevron-right"
//     {...props}
// >
//     <Path d="m9 18 6-6-6-6" />
// </Svg>
// )

function ChevronRight(props) {
    if (props.small == "false") {
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                stroke="#000"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right"
                {...props}
            >
                <Path d="m9 18 6-6-6-6" />
            </Svg>
        ); 
    }

    return (
        <Svg
            width={15}
            height={15}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
            d="m5.625 11.25 3.75-3.75-3.75-3.75"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </Svg>
    ); 


}

export default ChevronRight