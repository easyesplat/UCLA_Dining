import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../Core/Config'
import { doc, setDoc, Timestamp, addDoc } from "firebase/firestore";
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-navigation'
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
        'sf-pro-m': require('dining_application/assets/fonts/SF-Pro-Text-Medium.otf'),
        'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
        'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
    });

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("HomeScreen")
            }
        })

        return unsubscribe
    }, [])

    if (!loaded) {
        return null;
    }


    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const data = {
                    fname: '',
                    lname: '',
                    email: email,
                    likedItems: [],
                    userImg: null,
                }
                setDoc(doc(db, "users", user.uid), data)
                    .then(() => {
                        alert("Welcome to our app");
                    })
                    .catch((error) => alert(error.message));
            })
            .catch((error) => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch((error) => alert(error.message));
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Gradient style={styles.gradientPosition}/>
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <Text style={styles.headerText}>Welcome back to {'\n'}Bruin Dine</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subtext}>Log in or Sign up</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    headerText: {
        fontFamily: "publica-sans-m", 
        fontSize: 33,
        lineHeight: 40,
        alignSelf: 'flex-start',
        paddingTop: 40, 
    },    
    subtext: {
        fontFamily: "publica-sans-m", 
        fontSize: 18,
        alignSelf: 'flex-start',
        marginBottom: 8, 
    },
    blurContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        width: '100%',
        zIndex: -1, 
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
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: 'white',
        padding: 18, 
        borderRadius: 18,
        marginTop: 5,
        marginBottom: 10,
        borderColor: "#D8D8D8",
        borderWidth: 1,
        fontSize: 15,
        fontFamily: "publica-sans-l", 
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        width: '100%',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
        marginTop: 5,
        borderColor: '#007AFF',
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
        color: '#0782F9',
        fontWeight: '700',
        fontFamily: "publica-sans-m",
        fontSize: 14,
    },
})