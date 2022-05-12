import React from "react";
import {StyleSheet, View, Text} from 'react-native'
import { useFonts } from 'expo-font';

function MealPlan(props) {
    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    return (
        <View style={[styles.circle, props.style]}>
            <Text style={{fontFamily: "sf-pro-sb", fontSize: 16, paddingTop: 2, color: "#fff"}}>{props.mealPlan}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: "50%",
        width: 43,
        height: 43, 
        backgroundColor: "#005587",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }


}); 

export default MealPlan; 