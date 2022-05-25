import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { auth, db } from '../Core/Config';
import { doc, setDoc } from "firebase/firestore";
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js';
import DropDownPicker from 'react-native-dropdown-picker';



const SignupScreen = () => {
    const [state, setState] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [border1, setBorder1] = useState('#D8D8D8');
    const [border2, setBorder2] = useState('#D8D8D8');
    const [border3, setBorder3] = useState('#D8D8D8');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [mealPlan, setMealPlan] = useState([
        { label: '19P', value: '19P' },
        { label: '19R', value: '19R' },
        { label: '14P', value: '14P' },
        { label: '14R', value: '14R' },
        { label: '11P', value: '11P' },
        { label: '11R', value: '11R' },
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState([]);
    const [dietaryRestriction, setDietaryRestriction] = useState([
        { label: 'Vegan', value: '1' },
        { label: 'Gluten Free', value: '3' },
        { label: 'Pescatarian', value: '2' },
        { label: 'Vegetarian', value: '4' },
        { label: 'Halal', value: '5' },
    ]);

    const myTheme = require("../Themes/dropdownTheme.js");

    DropDownPicker.addTheme("MyThemeName", myTheme);
    DropDownPicker.setTheme("MyThemeName");

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                });
            }
        })
        setState({});
        return unsubscribe
    }, [])


    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const data = {
                    fname: name,
                    email: email,
                    likedItems: [],
                    mealPlan: value,
                    dietaryRestrictions: value2,
                    userImg: null,
                }
                setDoc(doc(db, "users", user.uid), data)
                    .then(() => {
                        alert("Welcome to Bruin Dine");
                        // navigation.replace("Signup");
                    })
                    .catch((error) => alert(error.message));
            })
            .catch((error) => alert(error.message))
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Gradient style={styles.gradientPosition} />
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <View style={{ width: "100%" }}>
                        <Text style={styles.headerText}>Welcome</Text>
                        <Text style={styles.subHeaderText}>Let's set up your account and {'\n'}get you on your way</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subtext}>Sign up</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={[styles.input, { borderColor: border1 }]}
                            onFocus={() => setBorder1("#2774AE")}
                            onBlur={() => setBorder1("#D8D8D8")}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={[styles.input, { borderColor: border2 }]}
                            secureTextEntry
                            onFocus={() => setBorder2("#2774AE")}
                            onBlur={() => setBorder2("#D8D8D8")}
                        />
                        <TextInput
                            placeholder="First Name"
                            value={name}
                            onChangeText={text => setName(text)}
                            style={[styles.input, { borderColor: border3 }]}
                            onFocus={() => setBorder3("#2774AE")}
                            onBlur={() => setBorder3("#D8D8D8")}
                        />
                        <>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={mealPlan}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setMealPlan}
                                theme="MyThemeName"
                                multiple={false}
                                mode="BADGE"
                                placeholder="Meal Plan"
                                placeholderStyle={{
                                    color: "#D8D8D8",
                                    fontFamily: "publica-sans-l",
                                    fontSize: 13,
                                }}
                                closeAfterSelecting={true}
                                onPress={() => { Keyboard.dismiss() }}
                                zIndex={2000}
                                zIndexInverse={1000}
                            />
                        </>
                        <View style={{ height: 10 }}></View>
                        <>
                            <DropDownPicker
                                open={open2}
                                value={value2}
                                items={dietaryRestriction}
                                setOpen={setOpen2}
                                setValue={setValue2}
                                setItems={setDietaryRestriction}
                                theme="MyThemeName"
                                multiple={true}
                                mode="BADGE"
                                placeholder="Dietary Restrictions"
                                placeholderStyle={{
                                    color: "#D8D8D8",
                                    fontFamily: "publica-sans-l",
                                    fontSize: 13,
                                }}
                                onPress={() => { Keyboard.dismiss() }}
                                zIndex={1000}
                                zIndexInverse={2000}
                                badgeDotColors={["#34C759", "#27AE60", "#FF2D55", "#FF9500" ]}
                            />
                        </>
                    </View>

                    <View style={[styles.buttonContainer, {zIndex: 500,}]}>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={{
                            marginTop: 10, 
                            fontFamily: "publica-sans-l", 
                            fontSize: 14, 
                            marginTop: 6,
                        }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => {navigation.replace('Log in')}} style={{marginTop: 4,}}><Text style={{ color: "#2774AE",fontFamily: "publica-sans-l" }}>Log in</Text></TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    headerText: {
        fontFamily: "publica-sans-m",
        fontSize: 33,
        lineHeight: 36,
        alignSelf: 'flex-start',
        paddingTop: 40,
    },
    subtext: {
        fontFamily: "publica-sans-m",
        fontSize: 18,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    subHeaderText: {
        fontFamily: "publica-sans-m",
        fontSize: 20,
        lineHeight: 22,
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