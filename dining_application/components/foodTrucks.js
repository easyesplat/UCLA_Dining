import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground, } from 'react-native';
import ChevronRight from '../assets/icons/chevron-right';
import FoodTruckData from '../data/foodtruckData';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Core/Config'
import AppLoading from 'expo-app-loading';
import Block from './block';

function FoodTruckCard(props) {
    const [result, setResult] = useState(null);

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(props.link);
        setResult(result);
    };

    return (
        <TouchableOpacity style={styles.button} onPress={() => {
            _handlePressButtonAsync();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}>
            <View>
                <ImageBackground
                    style={styles.foodTruckImage}
                    resizeMode="cover"
                    source={props.image}>

                    <View style={[styles.buttonText, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={{ fontFamily: "publica-sans-s", fontSize: 16, }}>{props.name}</Text>
                        <ChevronRight />
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: props.color,
                            padding: 8,
                            borderRadius: 12
                        }}>
                        <Text
                            style={{
                                fontFamily: "publica-sans-s",
                                fontSize: 14,
                                flexWrap: 'wrap'
                            }}>
                            {props.location}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

function FoodTrucks() {
    const [rieber, setRieber] = useState(null);
    const [sproul, setSproul] = useState(null);

    useEffect(() => {
        getDoc(doc(db, "time", "Rieber Court Food Trucks")).then((result) => {
            if (result.exists()) {
                setRieber(result.data());
            }
        }).catch((e) => alert(error));
        getDoc(doc(db, "time", "Sproul Court Food Trucks")).then((result) => {
            if (result.exists()) {
                setSproul(result.data());
            }
        }).catch((e) => alert(error));
    }, [])

    if (rieber == null || sproul == null) {
        return <AppLoading />
    }

    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let timeConstant = hours + (minutes / 60);

    const openingTimes = [17, 11, 7];
    const rieberColor = "#15B7FD";
    const sproulColor = "#FFE475"

    let mealPeriodMessage = "There are no food trucks open now";
    let reiberArray = [];
    let sproulArray = [];
    if (timeConstant >= 7 && timeConstant <= 10) {
        mealPeriodMessage = "Food trucks here breakfast";
        reiberArray = rieber.breakfast;
        sproulArray = sproul.breakfast;
    } else if (timeConstant >= 11 && timeConstant <= 15) {
        mealPeriodMessage = "Food trucks here for lunch";
        reiberArray = rieber.lunch;
        sproulArray = sproul.lunch;
    } else if (timeConstant >= 17 && timeConstant <= 21) {
        mealPeriodMessage = "Food trucks open for dinner";
        reiberArray = rieber.dinner;
        sproulArray = sproul.dinner;
    } else if (timeConstant >= 21) {
        mealPeriodMessage = "Food trucks open for late night";
        reiberArray = rieber.late_night;
        sproulArray = sproul.late_night;
    }

    let finalRender = [];

    for (let i in FoodTruckData) {
        if (reiberArray.includes(FoodTruckData[i].name)) {
            finalRender.push(Object.assign(FoodTruckData[i], { color: rieberColor, location: "Reiber" }))
        } else if (sproulArray.includes(FoodTruckData[i].name)) {
            finalRender.push(Object.assign(FoodTruckData[i], { color: sproulColor, location: "Sproul" }))
        }
    }

    if (finalRender.length == 0) {
        mealPeriodMessage = "There are no food trucks open now";
    }

    if (finalRender.length == 0) {
        return (
            <Block>
                <Text style={{ fontFamily: "publica-sans-s", fontSize: 15, textAlign: "center", paddingHorizontal: 20, marginVertical: 20 }}>{mealPeriodMessage}</Text>
            </Block>
        )
    }

    const renderMenuButton = ({ item }) => (
        <FoodTruckCard image={item.imageUri} name={item.name} link={item.link} color={item.color} location={item.location} />
    );

    return (
        <View>
            <Text style={{ fontFamily: "publica-sans-s", fontSize: 18, marginTop: 20 }}>{mealPeriodMessage}</Text>
            <FlatList
                horizontal
                data={finalRender}
                renderItem={renderMenuButton}
                keyExtractor={item => item.id}
                style={{ overflow: "visible", marginTop: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 18,
        width: 280,
        height: 170,
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 10,
        marginRight: 10,
        overflow: "hidden"
    },
    backgroundImage: {
        width: 50,
        height: 50,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    textWrapper: {
        padding: 10,
        maxWidth: 300,
    },
    foodTruckImage: {
        borderRadius: 18,
        width: 280,
        height: 170,
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 10,
        marginRight: 10,
        overflow: "hidden",
    },
    buttonText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        padding: 8,
        paddingLeft: 10,
        marginRight: 20,
        borderRadius: 12,
        color: 'black',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
    }
})

export default FoodTrucks;


