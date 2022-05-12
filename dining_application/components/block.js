import React from "react";
import {StyleSheet, TouchableOpacity, View, Text, Image, Dimensions} from 'react-native'

function Block({ children }, props) {
    return (
        <View style={[styles.block, props.style]}>
            { children }
        </View>
    ); 
}

const styles = StyleSheet.create({
    block: {
        marginTop: 20, 
        padding: 10, 
        borderRadius: 15, 
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
    }
}); 

export default Block; 