import React from "react";
import {StyleSheet, TouchableOpacity, View, Text, Image, Dimensions} from 'react-native'
import ArrowRight from 'dining_application/assets/icons/chevron-right.js'
import { useFonts } from 'expo-font';

function SimpleButton(props) {
    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    let backgroundClassName = styles.backgroundOff; 
    if (props.background == "true") {
        backgroundClassName = styles.backgroundOn; 
    }

    return (
        <TouchableOpacity style={[backgroundClassName, props.style]}>
            <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, paddingRight: 2,}}>{props.text}</Text>
            <ArrowRight/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backgroundOn: {
        flexDirection: "row",
        alignItems: "center", 
        padding: 8, 
        backgroundColor: "#F0F2F5",
        borderRadius: 10, 
    }, 
    backgroundOff: {
        flexDirection: "row",
        alignItems: "center",
    }


}); 

export default SimpleButton; 