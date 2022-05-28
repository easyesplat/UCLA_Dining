import { useNavigation } from '@react-navigation/core'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image } from 'react-native'
import { auth } from '../Core/Config'
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'


const WelcomeScreen = () => {
    const navigation = useNavigation(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("HomeScreen");
            }
        })

        return unsubscribe
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <Gradient style={styles.gradientPosition} color1="#2774AE" color2="#FFD100"/>
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={{width: "100%"}}>
                        <Text style={styles.headerText}>Bruin Dine</Text>
                        <Text style={styles.subHeaderText}>Your improved dining {'\n'}experience</Text>
                    </View>
                    <Image style={{ width: 230, height: 250, alignSelf: "center" }} source={require("../assets/animojis/bearWfood.png")} />
                    <View style={styles.buttonContainer}>
                        <Text style={styles.subtext}>Log in or Sign up to get started</Text>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("Log in")}}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("Sign up")}}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}


export default WelcomeScreen

const styles = StyleSheet.create({
    headerText: {
        fontFamily: "publica-sans-m", 
        fontSize: 38,
        lineHeight: 42,
        alignSelf: 'flex-start',
        paddingTop: 40, 
    },    
    subHeaderText: {
        fontFamily: "publica-sans-m", 
        fontSize: 26,
        lineHeight: 28,
        alignSelf: 'flex-start',
        paddingTop: 15, 
    },    
    blurContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        width: '100%',
        zIndex: -1, 
    },
    subtext: {
        fontFamily: "publica-sans-m", 
        fontSize: 18,
        alignSelf: 'flex-start',
        marginBottom: 15, 
        // alignSelf: 'center',
        textAlign: 'center',
    },
    gradientPosition: {
        position: 'absolute', 
        left: 5, 
        top: 10, 
        zIndex: -2, 
    }, 
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        //old color: 007AFF
        backgroundColor: '#2774AE',
        width: '100%',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
        marginTop: 5,
        borderColor: '#2774AE',
        borderWidth: 2,
    },
    buttonOutline: {
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: "publica-sans-m", 
    },
    buttonOutlineText: {
        color: '#2774AE',
        fontWeight: '700',
        fontFamily: "publica-sans-m",
        fontSize: 14,
    },
})