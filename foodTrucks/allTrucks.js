import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native"
import readMenus from '../Core/menuDatabase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../Core/Config';
import Loading from '../components/loading';

function allTrucks() {
    const routes = useRoute();
    const [menuMap, setMenuMap] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
        'sf-pro-m': require('dining_application/assets/fonts/SF-Pro-Text-Medium.otf'),
        'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
        'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
    });

    if (initializing || userDoc === null) return <Loading/>;

    if (userDoc == null) {
        return <Loading/>;
    }

    if (!loaded) {
        return null;
    }

    return (
        
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                 <Gradient style={styles.gradientPosition} color1="#2774AE" color2="#FFD100"/>
                 <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
                <Text style={styles.mainHeading}>{"Food Trucks"}</Text>
                <View style={styles.body}>
                    <View style={styles.block}>
                        <View style={{ padding: 8 }}>
                            <Text style={styles.insightsHeaderText}>Dinner</Text>
                            {
                                <View style={styles.glanceView}>
                                    {
                                        <>
                                            <foodTruck/>
                                            <foodTruck/>
                                            <foodTruck/>
                                        </>
                                    }
                                </View>
                            }
                            <Text style={styles.insightsHeaderText}>Late Night</Text>
                            {
                                <View style={styles.glanceView}>
                                    {
                                        <>
                                            <foodTruck/>
                                            <foodTruck/>
                                            <foodTruck/>
                                        </>
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 400,
        justifyContent: "flex-end",
        padding: 20,
    },
    mainHeading: {
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 28,
        lineHeight: 36,
        fontFamily: "publica-sans-s",
        marginBottom: 20,
    },
    headerText: {
        fontFamily: 'sf-pro-sb',
        fontSize: 56,
        color: "#fff",
        paddingTop: 15,
        overflow: "visible"
    },
    body: {
        paddingHorizontal: 20,
    },
    insightsHeaderText: {
        fontFamily: 'publica-sans-s',
        fontSize: 18,
        marginBottom: 20,
    },
    items: {
        paddingHorizontal: 20,
        marginTop: -45,
    },
    block: {
        padding: 10,
        borderRadius: 15,
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 20,
    },
    glanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});

export default DiningHall; 
