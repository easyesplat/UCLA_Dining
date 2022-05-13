import React from "react";
import {StyleSheet, TouchableOpacity, View, Text, Image, Dimensions} from 'react-native'
import ArrowRight from 'dining_application/assets/icons/chevron-right.js'
import { useFonts } from 'expo-font';

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
        //timeColor = "#EC9706"; 
        //timeColor = "#FCAE1E"
    }

    return (
        <TouchableOpacity style={styles.button} blurRadius={90}>
            <View style={{flexDirection: "row"}}>
                <Image style={styles.icon} source={props.imageUri} />
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={{ fontFamily: 'sf-pro-sb', paddingBottom: 1, fontSize: 13, }}>{props.name}</Text>
                    <Text numberOfLines={1} style={{ fontFamily: 'sf-pro-sb', fontSize: 12, color: timeColor}}>{props.waitTime} minutes</Text>
                </View>
            </View>
            <ArrowRight small="false"/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10, 
        width: (Dimensions.get('window').width / 2) - 25,
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        paddingRight: 5, 
        marginBottom: 10, 
        marginRight: 10, 
    },
    icon: {
        width: 50, 
        height: 51.5, 
        borderBottomLeftRadius: 10, 
        borderTopLeftRadius: 10, 
    }, 
    textWrapper: {
        padding: 10,
        maxWidth: 100,
    }
});

export default Menubutton; 