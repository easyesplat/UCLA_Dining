import { useNavigation } from '@react-navigation/core';
import { useRoute } from "@react-navigation/native"
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { auth, db } from '../Core/Config';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js';
import DropDownPicker from 'react-native-dropdown-picker';
import Loading from '../components/loading.js';



const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [border3, setBorder3] = useState('#D8D8D8');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [mealPlan, setMealPlan] = useState([
        { label: '19P', value: '19P' },
        { label: '19R', value: '19R' },
        { label: '14P', value: '14P' },
        { label: '14R', value: '14R' },
        { label: '11P', value: '11P' },
        { label: '11R', value: '11R' },
    ]);
    const [userDoc, setUserDoc] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const routes = useRoute();
    const navigation = useNavigation();

    const myTheme = require("../Themes/dropdownTheme.js");

    DropDownPicker.addTheme("MyThemeName", myTheme);
    DropDownPicker.setTheme("MyThemeName");

    function authStateChanged(user) {
        setUser(user);
        if (user != null) {
            getDoc(doc(db, "users", user.uid)).then((snapShot) => {
                setUserDoc(snapShot.data())
            }).catch((e) => alert(e))
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, authStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing || userDoc === null) return <Loading />;

    if (userDoc == null) {
        return <Loading />;
    }

    const handleSignUp = () => {
        let finalName = name; 
        let finalMealPlan = value; 
        if (name == "") finalName = userDoc.fname;
        if (value == null) finalMealPlan = userDoc.mealPlan;
        updateDoc(doc(db, "users", user.uid), {
            fname: finalName,
            mealPlan: finalMealPlan,
        }).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }]
            });
        }).catch((e) => console.log(e));
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Gradient style={styles.gradientPosition} color1="#2774AE" color2="#FFD100"/>
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <View style={{ width: "100%" }}>
                        <Text style={styles.headerText}>Update Your {"\n"}Profile</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Change First Name</Text>
                        <TextInput
                            placeholder={userDoc.fname}
                            value={name}
                            onChangeText={text => setName(text)}
                            style={[styles.input, { borderColor: border3 }]}
                            onFocus={() => setBorder3("#2774AE")}
                            onBlur={() => setBorder3("#D8D8D8")}
                        />
                        <>
                            <Text style={styles.formTitle}>Change Meal Plan</Text>
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
                                placeholder={userDoc.mealPlan}
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
                        
                    </View>

                    <View style={[styles.buttonContainer, {zIndex: 500,}]}>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Update your account</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default ProfileScreen

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
    formTitle: {
        fontFamily: "publica-sans-m",
        fontSize: 15,
        alignSelf: 'flex-start',
        marginBottom: 8,
        marginTop: 10, 
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