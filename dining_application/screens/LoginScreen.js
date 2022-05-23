import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { auth, db } from '../Core/Config'
import { doc, setDoc, Timestamp, addDoc, getDoc } from "firebase/firestore";
// import { SafeAreaView } from 'react-navigation'
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [border1, setBorder1] = useState('#D8D8D8');
    const [border2, setBorder2] = useState('#D8D8D8');
    const [userDoc, setUserDoc] = useState(null)

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("HomeScreen");
            }
        })

        return unsubscribe
    }, [])


    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                //Todo: Firestore
                //const userData = getDoc(doc(db, "users", user.uid)); 
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
                            style={[styles.input, {borderColor: border1}]}
                            onFocus={() => setBorder1("#2774AE")}
                            onBlur={() => setBorder1("#D8D8D8")}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={[styles.input, {borderColor: border2}]}
                            secureTextEntry
                            onFocus={() => setBorder2("#2774AE")}
                            onBlur={() => setBorder2("#D8D8D8")}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                        <Text style={{
                            marginTop: 10, 
                            fontFamily: "publica-sans-l", 
                            fontSize: 14, 
                            marginTop: 6,
                        }}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => {navigation.replace('Sign up')}} style={{marginTop: 4,}}><Text style={{ color: "#2774AE",fontFamily: "publica-sans-l" }}>Sign up</Text></TouchableOpacity>
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