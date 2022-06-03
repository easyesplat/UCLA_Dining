import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from "expo-location"
import diningLocationInformation from '../Core/findNearest';
import AppLoading from 'expo-app-loading';
import { MapIcon, X } from '../assets/icons/icons';
import GradientText from './GradientText';
import SimpleButton from './simpleButton';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { BlurView } from 'expo-blur';
import RateDiningHall from './RateDiningHall';


function LocationComponent(props) {
    const navigation = useNavigation();
    const [position, setPosition] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    // Request permissions right after starting the app
    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) {
                const { granted } = await Location.getForegroundPermissionsAsync()
                if (!granted) {
                    console.log("location tracking denied")
                    return
                }
                foregroundSubscription = await Location.watchPositionAsync(
                    {
                        // For better logs, we set the accuracy to the most sensitive option
                        accuracy: Location.Accuracy.BestForNavigation,
                    },
                    location => {
                        setPosition(location.coords)
                    }
                )
            }
        }
        requestPermissions()
    }, [])

    if (position === null) {
        return <AppLoading />;
    }

    // const data = diningLocationInformation(position.latitude, position.longitude, props.open)
    const data = diningLocationInformation(34.07190257151363, -118.4497362187541, props.open)
    // console.log(data)

    let message = "Your nearest open dining hall is "
    if (data.survey) {
        message = "Looks like you are at ";
    }
    // alert(data.notOnHill)
    if (!data.notOnHill) {
        message = "Looks like you aren't on the hill";
    }

    let otherHalls = [];

    for (let x in data.all) {
        if (x == 0) continue;

        let miles = (data.all[x].distance) / 1609
        miles = Math.round(miles * 100) / 100

        let distanceColor = '#37B96B';
        if (miles > 0.15) {
            distanceColor = "#D24040";
        } else if (miles > 0.1) {
            distanceColor = "#EFC42B";
        }

        otherHalls.push(
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                <Text style={{ fontFamily: "publica-sans-s", fontSize: 15 }}>{data.all[x].name}</Text>
                <Text style={{ fontFamily: "publica-sans-s", fontSize: 15, color: distanceColor }}>{miles} {miles == 1 ? "mile" : "miles"}</Text>
            </View>
        )
    }

    const d = new Date(); 
    let date = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString(); 
    let docName = (data.closest) + date + props.time;

    let showSurvey = true; 
    if (props.userAnswered.includes(docName)) {
        showSurvey = false; 
    }

    showSurvey = data.survey && showSurvey; 

    return (
        <View style={styles.block}>
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
                    <View style={[StyleSheet.absoluteFill, { width: "100%", padding: 40, backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "flex-start", justifyContent: "flex-start", borderRadius: 20, }]}>
                        <BlurView intensity={25} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
                        <RateDiningHall name={data.closest} time={props.time} userId={props.userId}/>
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


            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 15, marginHorizontal: 15 }}>
                <MapIcon style={{ marginRight: 10 }} />
                <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', marginRight: 60 }}>
                    <Text style={{ fontFamily: "publica-sans-s", fontSize: 16, lineHeight: 18 }} >{message}</Text>
                    <GradientText colors={['#3778F5', '#34CDA5']} style={{ fontFamily: "publica-sans-s", fontSize: 16, lineHeight: 18 }}>{data.closest}</GradientText>
                </View>
            </View>
            {
                showSurvey &&
                <SimpleButton style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 10 }} background="true" text={"Rate " + data.closest} onPress={() => {
                    setModalVisible(!modalVisible);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }} />
            }
            <View style={{
                marginHorizontal: 15,
                marginBottom: 15,
                marginTop: 15,
                backgroundColor: "rgba(240, 242, 245, 0.63)",
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                borderRadius: 12,
                padding: 15,
            }}>
                <Text style={{ fontFamily: "publica-sans-s", fontSize: 18, marginBottom: 12 }} >Other Dining Halls</Text>
                {
                    otherHalls
                }
            </View>
        </View>
    )
}

export default LocationComponent

const styles = StyleSheet.create({
    block: {
        marginTop: 20,
        // padding: 10,
        borderRadius: 15,
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
    },
    closingButton: {
        paddingVertical: 8,
        borderRadius: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2,
        alignSelf: "center",
        marginTop: -20, 
    },
})