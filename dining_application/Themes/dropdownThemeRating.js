import {
    StyleSheet
} from 'react-native';

export const ICONS = {
    ARROW_DOWN: require('../assets/Dropdown/chevron-down.png'),
    ARROW_UP: require('../assets/Dropdown/chevron-up.png'),
    TICK: require('../assets/Dropdown/check.png'),
    CLOSE: require('../assets/Dropdown/x.png')
};

export default StyleSheet.create({
    container: {
        width: '100%',
    },
    style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: 55,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        padding: 18,
        marginTop: 5, 
        backgroundColor: "rgba(240, 242, 245, 0.63)"
    },
    label: {
        flex: 1,
        color: "#000",
        fontFamily: "publica-sans-l",
        fontSize: 15, 
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    arrowIcon: {
        width: 20,
        height: 20
    },
    tickIcon: {
        width: 20,
        height: 20
    },
    closeIcon: {
        width: 30,
        height: 30
    },
    badgeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#FEFE",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily: "publica-sans-l",
        fontSize: 15, 
    },
    badgeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 8,
        backgroundColor: "#FEFE"
    },
    badgeSeparator: {
        width: 5,
    },
    listBody: {
        height: '100%',
    },
    listBodyContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    dropDownContainer: {
        position: 'absolute',
        borderRadius: 18,
        borderColor: "#D8D8D8",
        borderWidth: 1,
        width: '100%',
        overflow: 'hidden',
        zIndex: 1000,
        marginTop: 5, 
        backgroundColor: "rgba(240, 242, 245, 0.63)"
    },
    modalContentContainer: {
        flexGrow: 1,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40,
    },
    listItemLabel: {
        flex: 1,
        color: "#000",
        fontFamily: "publica-sans-l",
        fontSize: 15, 
    },
    iconContainer: {
        marginRight: 10
    },
    arrowIconContainer: {
        marginLeft: 10
    },
    tickIconContainer: {
        marginLeft: 10
    },
    closeIconContainer: {
        marginLeft: 10
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 1
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderColor: "#000",
        borderWidth: 1,
        color: "#000"
    },
    itemSeparator: {
        height: 1,
        backgroundColor: "#000",
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    customItemContainer: {

    },
    customItemLabel: {
        fontStyle: 'italic'
    },
    listMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    listMessageText: {

    },
    selectedItemContainer: {

    },
    selectedItemLabel: {

    },
    modalTitle: {
        fontSize: 18,
        color: "#000",
        fontFamily: "publica-sans-l",
        fontSize: 15,
    },
    extendableBadgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    extendableBadgeItemContainer: {
        marginVertical: 3,
        marginEnd: 7
    }
});