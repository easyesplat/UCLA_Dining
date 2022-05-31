import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { Heart, Info, X, SmallHeart, ExternalLink } from '../assets/icons/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../Core/Config';
import AppLoading from 'expo-app-loading';
import { BlurView } from 'expo-blur';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';

const MenuItem = ({ liked, itemName, uid, information, parent, }) => {
    const [itemLiked, setItemLiked] = useState(liked);
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState(null);

    if (itemLiked == null) {
        return <AppLoading />;
    }

    const handleClick = () => {
        if (itemLiked) {
            setItemLiked(false);
            updateDoc(doc(db, "users", uid), {
                likedItems: arrayRemove(itemName),
            }).then(() => {
            }).catch((e) => console.log(e));
        } else {
            setItemLiked(true);
            updateDoc(doc(db, "users", uid), {
                likedItems: arrayUnion(itemName),
            }).then(() => {
            }).catch((e) => console.log(e));
        }
    }
    // let restrictions = []; 
    let restrictionsString = "";
    let itemLink = information[0];
    let description = information[information.length - 1];
    for (let x = 1; x < information.length - 1; x++) {
        restrictionsString = restrictionsString + information[x];
        if (x != information.length - 2) {
            restrictionsString += " ·";
        }
        // restrictions.push(<Text>{information[x]}</Text>); 
    }

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(itemLink);
        setResult(result);
    };


    return (
        <View>
            <GestureRecognizer
                onSwipeDown={() => {
                    setModalVisible(!modalVisible);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={[StyleSheet.absoluteFill, { width: "100%", padding: 40, backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent: "center", borderRadius: 20, }]}>
                        <BlurView intensity={25} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
                        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.modalText}>{itemName}</Text>
                            <Text style={styles.parentTextStyle}>at {parent}</Text>
                            {
                                itemLiked &&
                                <View style={styles.likedItem}>
                                    <SmallHeart liked={true} />
                                    <Text style={{ color: "#D24040", fontFamily: "publica-sans-m", paddingLeft: 5, lineHeight: 14, fontSize: 12 }}>Liked Item</Text>
                                </View>
                            }
                            <TouchableOpacity
                                onPress={() => {
                                    _handlePressButtonAsync();
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                }}
                                style={[styles.button, { marginTop: 0, marginBottom: 20, backgroundColor: "white" }]}
                            >
                                <Text style={{ color: "black", fontFamily: "publica-sans-s", paddingRight: 5 }}>Get more info</Text>
                                <ExternalLink />
                            </TouchableOpacity>
                            <Text style={styles.textStyle}>{restrictionsString}</Text>
                            {
                                description.length != 0 &&
                                <View style={[{ padding: 20, backgroundColor: "white", borderRadius: 18, }]}>
                                    <Text style={[{ fontFamily: "publica-sans-l", lineHeight: 16, fontSize: 14, textAlign: 'center' }]}>{description}</Text>
                                </View>
                            }
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }}
                            style={styles.closingButton}
                        >
                            <Text style={{ color: "white", fontFamily: "publica-sans-s", paddingRight: 5 }}>Swipe down to close</Text>
                            <X />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </GestureRecognizer>
            <View style={styles.item}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }} onPress={() => {
                    setModalVisible(true);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    }} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
                    <Text style={styles.itemText}>{itemName}</Text>
                    <View style={{ marginLeft: 3, padding: 5, }}>
                        <Info />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleClick();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success);
                    }} hitSlop={{top: 20, left: 40, bottom: 20, right: 20}}>
                    <Heart liked={itemLiked} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const MenuHeader = (props) => {
    return (
        <View>
            <Text style={styles.header}>{props.header}</Text>
        </View>
    )
}

const MenuBlock = ({ children }) => {
    return (
        <View style={styles.block}>
            {children}
        </View>
    )
}

export { MenuItem, MenuHeader, MenuBlock }

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        lineHeight: 36,
        marginBottom: 5,
        fontFamily: "publica-sans-s",
    },
    item: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    itemText: {
        fontSize: 15,
        lineHeight: 20,
        fontFamily: "publica-sans-l",
        maxWidth: 240,
    },
    block: {
        paddingHorizontal: 15,
        paddingTop: 10,
        borderRadius: 15,
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 20,
    },
    modalText: {
        fontFamily: "publica-sans-m",
        color: "white",
        fontSize: 35,
        lineHeight: 43,
        marginBottom: 0,
        textAlign: "center"
    },
    button: {
        paddingVertical: 8,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    closingButton: {
        paddingVertical: 8,
        borderRadius: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2,
    },
    textStyle: {
        color: "white",
        fontFamily: "publica-sans-s",
        fontSize: 15,
        lineHeight: 20,
        paddingBottom: 20,
        textAlign: "center"
    },
    parentTextStyle: {
        color: "white",
        fontFamily: "publica-sans-s",
        fontSize: 20,
        lineHeight: 25,
        textAlign: "center",
        marginBottom: 20,
    },
    likedItem: {
        padding: 6,
        paddingHorizontal: 10,
        backgroundColor: "#F5ABAB",
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -15,
        marginBottom: 10,
    }
})