import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BigLikedIcon } from '../assets/icons/icons'

const LikedItems = () => {
    return (
        <View style={styles.block}>
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%"}}>
                <BigLikedIcon />
                <Text>Your Liked Items Today</Text>
            </View>
        </View>
    )
}

export default LikedItems

const styles = StyleSheet.create({
    block: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 20,
        marginTop: 10,
    },
})