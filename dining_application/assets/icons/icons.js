import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const SignOut = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-log-out"
        {...props}
    >
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Svg>
)

const PersonFill = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M11.994 24C18.571 24 24 18.569 24 12S18.56 0 11.983 0C5.417 0 0 5.431 0 12s5.429 12 11.994 12Zm0-7.985c-3.27 0-5.811 1.173-7.04 2.519A9.588 9.588 0 0 1 2.412 12c0-5.327 4.257-9.598 9.57-9.598A9.589 9.589 0 0 1 21.599 12c0 2.53-.963 4.828-2.552 6.546-1.23-1.358-3.77-2.53-7.053-2.53Zm0-1.903c2.25.023 4.002-1.903 4.002-4.387 0-2.344-1.763-4.305-4.002-4.305-2.227 0-4.002 1.961-3.99 4.305.011 2.484 1.751 4.376 3.99 4.387Z"
            fill={props.color}
        />
    </Svg>
)

const Food = (props) => (
    <Svg
        width={26}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M3.218 22.24h10.96a4.928 4.928 0 0 1-.051-.408l-1.06-10.952c-.142-1.577.937-2.83 2.506-2.83h2.76c-.02-.559-.112-.824-.397-1.21L15.95 4.214V2.453C15.95.875 15.033 0 13.393 0H4.97C3.33 0 2.414.875 2.414 2.453v1.76L.428 6.84C.102 7.298 0 7.634 0 8.387v10.666c0 2.107 1.1 3.186 3.218 3.186ZM6.448 4.06a.709.709 0 0 1 0-1.415h5.448a.709.709 0 0 1 0 1.415H6.447ZM17.945 24h4.644c1.457 0 2.19-.733 2.343-2.32l1.06-10.942c.07-.723-.347-1.201-1.04-1.201h-3.758l.03-.428c.041-.488.174-.763.52-1.007l3.412-2.443c.876-.631-.061-1.975-.998-1.293l-3.27 2.362c-.814.59-1.17 1.241-1.262 2.28l-.041.529h-4.013c-.683 0-1.1.488-1.029 1.2l1.06 10.942c.152 1.588.875 2.321 2.342 2.321Z"
            fill={props.color}
        />
    </Svg>
)

const Feed = (props) => (
    <Svg
        width={27}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M0 20.456C0 22.749 1.263 24 3.644 24H22.57c2.404 0 3.655-1.24 3.655-3.61V3.61c0-2.37-1.251-3.61-3.655-3.61H8.716C6.313 0 5.072 1.24 5.072 3.61V8.54H2.636C.986 8.539 0 9.469 0 11.053v9.403Zm6.955 1.329c.21-.399.321-.875.321-1.418V3.81c0-1.063.554-1.595 1.584-1.595h13.567c1.041 0 1.584.532 1.584 1.595v16.38c0 1.063-.543 1.595-1.584 1.595H6.955ZM10.09 6.922H21.22c.421 0 .742-.332.742-.753a.726.726 0 0 0-.742-.731H10.09c-.443 0-.765.321-.765.73 0 .422.333.754.764.754Zm0 3.821H21.22c.421 0 .742-.321.742-.731a.738.738 0 0 0-.742-.753H10.09a.75.75 0 0 0-.765.753c0 .41.322.731.764.731Zm-7.885 9.591v-8.893c0-.432.277-.698.72-.698h2.148v9.591c0 .853-.62 1.451-1.428 1.451-.809 0-1.44-.62-1.44-1.45Zm8.506-1.905h2.746c.864 0 1.396-.52 1.396-1.384v-2.57c0-.852-.532-1.384-1.396-1.384H10.71c-.864 0-1.396.532-1.396 1.384v2.57c0 .864.532 1.384 1.396 1.384Zm6.102-3.854h4.408c.421 0 .742-.321.742-.731a.738.738 0 0 0-.742-.753h-4.408a.734.734 0 0 0-.753.753c0 .41.321.731.753.731Zm0 3.854h4.408c.421 0 .742-.321.742-.73a.738.738 0 0 0-.742-.754h-4.408a.74.74 0 0 0-.753.753c0 .41.31.731.753.731Z"
            fill={props.color}
        />
    </Svg>
)

//!ios theme bell
const Bell = (props) => (
    <Svg
        width={21}
        height={23}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M1.813 18.99h4.446A4.176 4.176 0 0 0 10.5 23c2.471 0 4.165-1.907 4.252-4.01h4.435c1.122 0 1.813-.625 1.813-1.567 0-1.173-1.047-2.17-2.029-3.123-.766-.756-.95-2.269-1.09-3.814-.15-4.13-1.349-6.892-4.154-7.922C13.306 1.107 12.107 0 10.5 0 8.892 0 7.694 1.107 7.284 2.564c-2.816 1.03-4.003 3.791-4.165 7.922-.14 1.545-.324 3.058-1.09 3.814C1.047 15.253 0 16.25 0 17.423c0 .942.69 1.567 1.813 1.567Zm.82-2.039v-.131c.28-.318.907-.899 1.435-1.512.745-.866 1.09-2.466 1.198-4.548.13-4.394 1.468-5.873 3.194-6.344.27-.077.41-.208.432-.504.054-1.107.67-1.852 1.608-1.852.95 0 1.554.745 1.608 1.852.021.296.173.427.432.504 1.737.471 3.064 1.95 3.194 6.344.118 2.082.464 3.682 1.198 4.548.528.613 1.133 1.194 1.413 1.512v.131H2.633Zm7.867 4.285c-1.22 0-2.094-.888-2.17-2.247h4.35c-.065 1.348-.95 2.247-2.18 2.247Z"
            fill="#1C1C1E"
        />
    </Svg>
)

function Heart(props) {
    if (!props.liked) {
        return (
            <Svg
                width={19}
                height={17}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path
                    d="M16.69 2.326a4.468 4.468 0 0 0-1.452-.981 4.428 4.428 0 0 0-4.876.981l-.862.872-.862-.872A4.448 4.448 0 0 0 5.474 1 4.448 4.448 0 0 0 2.31 2.326c-.839.849-1.31 2-1.31 3.2 0 1.201.471 2.352 1.31 3.201l.862.872L9.5 16l6.327-6.4.862-.873c.416-.42.745-.92.97-1.468a4.571 4.571 0 0 0-.97-4.933v0Z"
                    stroke="#D8D8D8"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    } else {
        return (
            <Svg
                width={19}
                height={17}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path
                    d="M16.69 2.326a4.468 4.468 0 0 0-1.452-.981 4.428 4.428 0 0 0-4.876.981l-.862.872-.862-.872A4.448 4.448 0 0 0 5.474 1 4.448 4.448 0 0 0 2.31 2.326c-.839.849-1.31 2-1.31 3.2 0 1.201.471 2.352 1.31 3.201l.862.872L9.5 16l6.327-6.4.862-.873c.416-.42.745-.92.97-1.468a4.571 4.571 0 0 0-.97-4.933v0Z"
                    fill="#D24040"
                    stroke="#D24040"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        );
    }

}

function Info(props) {
    return (
        <Svg
            width={19}
            height={19}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.5 18a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM9.5 12.9V9.5M9.5 6.1h.009"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

const X = (props) => (
    <Svg
        width={7}
        height={7}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M6 1 1 6M1 1l5 5"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const SmallHeart = (props) => (
    <Svg
        width={12}
        height={11}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.229 1.796a2.627 2.627 0 0 0-.854-.59 2.56 2.56 0 0 0-2.014 0c-.32.137-.61.337-.854.59L6 2.319l-.507-.523A2.591 2.591 0 0 0 3.632 1c-.698 0-1.368.286-1.861.796A2.76 2.76 0 0 0 1 3.716c0 .72.277 1.41.77 1.92l.508.523L6 10l3.722-3.84.507-.524c.244-.252.438-.551.57-.88a2.79 2.79 0 0 0 0-2.08 2.722 2.722 0 0 0-.57-.88Z"
            fill="#D80000"
            stroke="#D80000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const VegetarianIcon = (props) => (
    <Svg
        width={36}
        height={36}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={18} cy={18} r={18} fill="#2ECC71" />
        <Path
            d="M10.134 14.072c0 5.522 3.325 9.155 8.415 9.155 1.927 0 3.545-.674 4.637-1.802.395.813.585 1.744.922 2.805.118.374.381.535.682.535.593 0 1.076-.55 1.076-1.208 0-.894-.893-2.38-1.714-3.545.33-.703.506-1.502.506-2.366 0-3.142-2.556-5.413-6.08-5.413-1.208 0-2.416.337-3.742.337-1.113 0-2.05-.337-2.835-1.223-.49-.571-1.42-.564-1.64.344-.183.718-.227 1.978-.227 2.38Zm4.3 1.78c.446 1.37 1.838 2 3.617 2.424 2.373.556 3.465 1.018 4.373 2.029-.843 1.01-2.205 1.611-3.875 1.611-4.35 0-7.104-3.047-7.104-7.844 0-.41.007-.872.058-1.209.015-.11.074-.124.154-.058.813.688 2.044 1.076 3.179 1.076.798 0 1.523-.102 2.168-.19.578-.08 1.091-.147 1.575-.147 2.797 0 4.768 1.707 4.768 4.102 0 .44-.066.864-.176 1.252-1.033-.857-2.549-1.384-4.702-1.72-1.48-.242-2.674-.601-3.465-1.62-.27-.344-.695-.11-.57.294Z"
            fill="#fff"
        />
    </Svg>
)

const VeganIcon = (props) => (
    <Svg
        width={36}
        height={36}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={18} cy={18} r={18} fill="#28CD41" />
        <Path
            d="M24.267 11.986 19.776 25h-2.979l-4.455-13.014h2.511l3.438 9.963 3.465-9.963h2.511Z"
            fill="#fff"
        />
    </Svg>
)

const HalalIcon = (props) => (
    <Svg
        width={36}
        height={36}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={18} cy={18} r={18} fill="#000" />
        <Path
            d="m11.287 13.354-.53 1.126v6.815c0 1.076-.465 1.926-1.396 2.55-.94.669-1.949 1.003-3.025 1.003-1.143 0-1.955-.314-2.434-.942-.48-.624-.719-1.244-.719-1.858 0-.873.174-1.698.522-2.476.353-.782.57-1.223.651-1.322.086-.104.156-.156.21-.156 0 .086-.004.151-.013.197-.005.045-.086.357-.244.936-.158.578-.233.999-.224 1.26 0 .896.274 1.504.82 1.825.557.253 1.07.38 1.54.38.728-.06 1.252-.145 1.573-.258.326-.108.592-.21.8-.305.213-.095.385-.292.516-.59v-7.663l-.272-1.43 1.41-1.16.177 1.397.638.671Zm10.82 7.968h-.686c-.438 0-.874-.158-1.308-.475-.317-.226-.57-.608-.76-1.146a8.658 8.658 0 0 1-.332-1.288c-.073-.412-.127-.617-.163-.617-.009 0-.249.459-.719 1.376-.529 1-1.028 1.664-1.498 1.994-.53.375-1.712.563-3.547.563-.67 0-1.004-.036-1.004-.109 0-.045.247-.138.74-.278a19.2 19.2 0 0 0 1.695-.57c.529-.22 1.146-.555 1.851-1.003.095-.353.142-.787.142-1.302 0-.402-.047-.703-.142-.902a9.381 9.381 0 0 0-1.078-1.709c-.34-.425-.597-.696-.773-.813l-.55.637c-.904-.859-1.38-1.494-1.43-1.906-.037-.293.034-.675.21-1.146.18-.47.353-.734.515-.793.376-.131 1.063.416 2.062 1.641.999 1.22 1.553 2.254 1.661 3.099.023.154.034.344.034.57 0 .529-.052 1.227-.156 2.095a2.85 2.85 0 0 0 .63-.461c.435-.434.724-.986.869-1.655.058-.257.088-.834.088-1.729l.014-3.16 1.132-1.058.088 5.032c.023 1.257.176 2.066.461 2.428.29.357.706.535 1.248.535h.705v2.15Zm10.917 0H21.706v-2.15l7.704.014c0-.054-.2-.27-.597-.644a10.089 10.089 0 0 0-1.275-1.031 2.68 2.68 0 0 0-1.553-.502c-.43 0-1.092.16-1.987.482.37-.642.633-1.038.787-1.187.398-.461 1.06-.692 1.987-.692.972 0 2.052.538 3.241 1.614.457.43.904.81 1.343 1.14.438.325.994.582 1.668.772v2.184Z"
            fill="#fff"
        />
    </Svg>
)

const LikedIcon = (props) => (
    <Svg
        width={36}
        height={36}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={18} cy={18} r={18} fill="#F5ABAB" />
        <Path
            d="M24.766 12.238A4.208 4.208 0 0 0 21.79 11a4.198 4.198 0 0 0-2.978 1.238l-.811.814-.812-.814a4.204 4.204 0 0 0-5.955 0 4.231 4.231 0 0 0 0 5.974l.812.814L18 25l5.955-5.974.811-.814A4.225 4.225 0 0 0 26 15.225a4.237 4.237 0 0 0-1.234-2.987Z"
            fill="#D80000"
            stroke="#D80000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const BigLikedIcon = (props) => (
    <Svg
        width={43}
        height={43}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={21.5} cy={21.5} r={21.5} fill="#F5ABAB" />
        <Path
            d="M29.582 14.617a5.028 5.028 0 0 0-3.557-1.478 5.014 5.014 0 0 0-3.556 1.478l-.97.972-.968-.972a5.022 5.022 0 0 0-7.113 0 5.054 5.054 0 0 0 0 7.136l.969.972 7.113 7.136 7.113-7.136.969-.972a5.045 5.045 0 0 0 1.473-3.568 5.058 5.058 0 0 0-1.473-3.568Z"
            fill="#D80000"
            stroke="#D80000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const TabLikedIcon = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={12} cy={12} r={12} fill={props.color} />
        <Path
            d="M15.383 8.619a2.104 2.104 0 0 0-2.294-.458 2.104 2.104 0 0 0-.683.458L12 9.026l-.406-.407a2.102 2.102 0 0 0-2.977 0 2.116 2.116 0 0 0 0 2.987l.405.407L12 15l2.977-2.987.406-.407a2.112 2.112 0 0 0 .457-2.302 2.113 2.113 0 0 0-.457-.685Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const ExternalLink = (props) => (
    <Svg
        width={14}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.375 7.25V11a1.25 1.25 0 0 1-1.25 1.25H2.25A1.25 1.25 0 0 1 1 11V4.125a1.25 1.25 0 0 1 1.25-1.25H6M8.5 1h3.75v3.75M5.375 7.875 12.25 1"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const GreenHeart = (props) => (
    <Svg
        width={43}
        height={43}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={21.5} cy={21.5} r={21.5} fill="#95EDB8" />
        <Path
            d="M30.291 15.612a5.5 5.5 0 0 0-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0Z"
            stroke="#37B96B"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)


export { SignOut, PersonFill, Food, Feed, Bell, Heart, Info, X, SmallHeart, VegetarianIcon, VeganIcon, HalalIcon, LikedIcon, ExternalLink, GreenHeart, BigLikedIcon, TabLikedIcon }; 