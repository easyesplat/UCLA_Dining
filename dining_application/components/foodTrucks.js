import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ImageBackground, } from 'react-native';
import ChevronRight from '../assets/icons/chevron-right';
import FoodTruckData from '../data/foodtruckData';

function FoodTruckCard(props) {
    return (
        <TouchableOpacity style={styles.button}>
            <View>
            <ImageBackground
                style={styles.foodTruckImage}
                resizeMode="cover"
                source={props.image}>

                <View style={[styles.buttonText, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={{fontFamily: "publica-sans-s", fontSize: 16, }}>{props.name}</Text> 
                    <ChevronRight /> 
                </View>

                <View
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#FFE475',
                        padding: 8,
                        borderRadius: 12
                    }}>
                    <Text
                        style={{
                            fontFamily: "publica-sans-s",
                            fontSize: 14,
                            flexWrap: 'wrap'
                        }}>
                        Sproul
                    </Text>
                </View>
            </ImageBackground>
        </View>
        </TouchableOpacity>
    );
}

function FoodTrucks() {
    const renderMenuButton = ({ item }) => (
        <FoodTruckCard image={item.imageUri} name={item.name}/>
    );

    return (
        <View>
            <Text style={{ fontFamily: "publica-sans-s", fontSize: 18, marginTop: 20 }}>Food Trucks here now</Text>
            <FlatList
                horizontal
                data={FoodTruckData}
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
        overflow: "hidden"
    },
    buttonText: {
        position: 'absolute',
        bottom: 10, 
        left: 10,
        backgroundColor: 'white',
        padding: 8,
        paddingLeft: 10, 
        borderRadius: 12,
        color: 'black',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden'
    }
})

export default FoodTrucks;


// import * as React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ImageBackground,
//     Linking,
// } from 'react-native';
// import { useFonts } from 'expo-font';
// import ChevronRight from "dining_application/assets/icons/chevron-right.js";

// const [loaded] = useFonts({
//     'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
//     'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
//     'sf-pro-m': require('dining_application/assets/fonts/SF-Pro-Text-Medium.otf'),
//     'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
//     'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
// });

// function FoodTruckCard(props) {
//     return (
//         <View>
//             <ImageBackground
//                 style={styles.foodTruckImage}
//                 resizeMode="cover"
//                 source={require('./assets/perro.jpeg')}>

//                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Text style={styles.buttonText} onPress={() => Linking.openURL('http://google.com')}>
//                         Perro <ChevronRight /> </Text>
//                 </TouchableOpacity>

//                 <View
//                     style={{
//                         position: 'absolute',
//                         top: 10,
//                         right: 12,
//                         backgroundColor: '#FFE475',
//                         padding: 5,
//                         borderRadius: 8
//                     }}>
//                     <Text
//                         style={{
//                             font: 'publica-sans-s',
//                             fontSize: 12,
//                             flexWrap: 'wrap'
//                         }}>
//                         Sproul
//                     </Text>
//                 </View>

//             </ImageBackground>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     foodTruckImage: {
//         //height: '100%',
//         borderRadius: 18,
//         width: 280,
//         height: 170,
//         shadowColor: 'rgba(100,100,110, 0.18)', // IOS
//         shadowOpacity: 1, // IOS
//         shadowRadius: 29, //IOS
//         backgroundColor: "white",
//         //paddingRight: 5, 
//         marginBottom: 10,
//         marginRight: 10,
//         overflow: "hidden"
//     },
//     buttonText: {
//         position: 'absolute',
//         top: 130,
//         left: 10,
//         backgroundColor: 'white',
//         padding: 5,
//         paddingTop: 6,
//         borderRadius: 8,
//         color: 'black',
//         font: 'publica-sans-m',
//         fontSize: 15,
//         lineHeight: 15,
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         flexDirection: 'row'
//     }
// })

