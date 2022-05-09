import React from "react";
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native'
import ArrowRight from 'dining_application/assets/icons/chevron-right.js'
import { useFonts } from 'expo-font';
import { Keyframe, Easing } from 'react-native-reanimated';

function Menubutton(props) {
    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    let timeColor = '#37B96B'; 
    if (props.waitTime > 30) {
        timeColor = "#D24040"; 
    } else if (props.waitTime > 20) {
        timeColor = "#EFC42B"; 
    }

    return (
        <TouchableOpacity style={styles.button}>
            <Image style={styles.icon} source={props.imageUri}/>
            <View style={styles.textWrapper}>
                <Text style={{ fontFamily: 'sf-pro-sb', paddingBottom: 1, fontSize: 15, }}>{props.name}</Text>
                <Text style={{ fontFamily: 'sf-pro-sb', fontSize: 13, color: timeColor}}>{props.waitTime} minutes</Text>
            </View>
            <ArrowRight></ArrowRight>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5, 
        color: "#000", 
        // width: "100%",  
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        paddingRight: 5, 
    },
    icon: {
        width: 50, 
        height: 50, 
        borderBottomLeftRadius: 5, 
        borderTopLeftRadius: 5, 
    }, 
    textWrapper: {
        padding: 10,

    }
})

export default Menubutton; 