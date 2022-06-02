import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import ArrowRight from 'dining_application/assets/icons/chevron-right.js';
import TextTicker from 'react-native-text-ticker';

function Menubutton(props) {

    //Need to Change Colors
    let timeColor = '#37B96B';
    if (props.waitTime > 30) {
        timeColor = "#D24040";
    } else if (props.waitTime > 20) {
        timeColor = "#EFC42B";
    }

    return (
        <TouchableOpacity style={styles.button} blurRadius={90} onPress={props.onPress}>
            <View style={{ flexDirection: "row" }}>
                <Image style={styles.icon} source={props.imageUri} />
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={{ fontFamily: 'publica-sans-s', paddingBottom: 2, fontSize: 14, }}>{props.name}</Text>
                    <TextTicker
                        style={{ fontFamily: 'publica-sans-s', fontSize: 13, color: timeColor }}
                        duration={7000}
                        loop
                        bounce
                        repeatSpacer={25}
                        marqueeDelay={6000}
                    >
                        {props.level} - Activity Level: {props.waitTime}%
                    </TextTicker>
                </View>
            </View>
            <ArrowRight small="false" />
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
        paddingTop: 12,
        paddingHorizontal: 10,
        maxWidth: 100,
    }
});

export default Menubutton; 