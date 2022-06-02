import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { VegetarianIcon, VeganIcon, HalalIcon, LikedIcon, X, SmallHeart } from '../assets/icons/icons'
import { BlurView } from 'expo-blur';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Haptics from 'expo-haptics';

function GetIcon(props) {
    if (props.type === "vegetarian") {
        return (
            <VegetarianIcon/>
        )
    } else if (props.type === "vegan") {
        return (
            <VeganIcon/>
        )
    } else if (props.type === "halal") {
        return (
            <HalalIcon/>
        )

    } else if (props.type === "liked") {
        return (
            <LikedIcon/>
        )
    }

    return null;
}

function AtAGlanceItem(props) {
    const [modalVisible, setModalVisible] = useState(false);
    let textItems = [];
    for (let i in props.list) {
        textItems.push(<Text style={styles.modalText}>{props.list[i]["itemName"]}</Text>);
        textItems.push(<Text style={styles.parentTextStyle}>at {props.list[i]["parent"]}</Text>);
        if (props.list[i]["liked"] == true) {
            textItems.push(<View style={styles.likedItem}>
                <SmallHeart liked={true} />
                <Text style={{ color: "#D24040", fontFamily: "publica-sans-m", paddingLeft: 5, lineHeight: 14, fontSize: 12 }}>Liked Item</Text>
            </View>);
        }
    }


    return (
        <SafeAreaView>
            {
                props.number !== 0 &&
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
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignSelf: "center", justifyContent: "center", overflow: 'hidden', paddingVertical: 70 }}>
                                {textItems}
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible); 
                                }}
                                style={styles.closingButton}
                            >
                                <Text style={{ color: "white", fontFamily: "publica-sans-s", paddingRight: 5 }}>Swipe down to close</Text>
                                <X />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </GestureRecognizer>
            }
            <TouchableOpacity style={styles.glanceItem} onPress={() => {
                setModalVisible(true); 
                if (props.number == 0) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
                } else {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                }}>
                <GetIcon type={props.type} />
                <Text style={styles.glanceText}>{props.number} {props.type} item{props.number != 1 && "s"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AtAGlanceItem

const styles = StyleSheet.create({
    glanceItem: {
        width: (Dimensions.get('window').width - 85)/4,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F0F2F5",
        borderRadius: 13,
        padding: 8,
        paddingVertical: 12,
        height: 108,
    },
    glanceText: {
        textAlign: 'center',
        fontFamily: "publica-sans-l",
        marginTop: 10,
        fontSize: 12,
    },
    button: {
        paddingVertical: 8,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    textStyle: {
        color: "white",
        fontFamily: "publica-sans-s",
        fontSize: 15,
        lineHeight: 20,
        paddingBottom: 20,
        textAlign: "center"
    },
    modalText: {
        fontFamily: "publica-sans-m",
        color: "white",
        fontSize: 27,
        lineHeight: 30,
        marginBottom: 0,
        textAlign: "center"
    },
    parentTextStyle: {
        color: "white",
        fontFamily: "publica-sans-s",
        fontSize: 16,
        lineHeight: 21,
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
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: -15,
        marginBottom: 30,
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
})

