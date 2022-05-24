import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native"
import DiningLogo from '../assets/icons/diningLogo';
import AppLoading from 'expo-app-loading';
import readMenus from '../Core/menuDatabase';
import { MenuItem, MenuHeader, MenuBlock } from '../components/menuItem';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../Core/Config';

function DiningHall() {
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
        readMenus(routes.params.name).then((result) => {
            setMenuMap(result);
        }).catch((error) => console.log('error', error));

        const subscriber = onAuthStateChanged(auth, authStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing || userDoc === null) return <AppLoading />;

    if (menuMap == null || userDoc == null) {
        return <AppLoading />;
    }

    if (!loaded) {
        return null;
    }

    const menu = []; 

    for(let [key, value] of menuMap.get(routes.params.period))
    {
        menu.push(<MenuHeader header={key}/>)
        const subMenu = []; 
        for(let item in value["food"])
        {
            let alreadyLiked = false; 
            if(userDoc.likedItems.includes(item)) {
                alreadyLiked = true; 
            }
            subMenu.push(<MenuItem itemName={item} liked={alreadyLiked} uid={user.uid}/>)
        }
        menu.push(<MenuBlock>{subMenu}</MenuBlock>)
    }

    let mealPeriod = routes.params.period; 
    if (routes.params.period === "late_night") {
        mealPeriod = "late night"; 
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <ImageBackground transition={false} style={styles.header} resizeMode="cover" source={routes.params.data.imageUri}>
                    <LinearGradient
                        colors={['transparent', 'rgba(11,11,13,0.4)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <DiningLogo name={routes.params.name} />
                </ImageBackground>
                <Text style={styles.mainHeading}>{routes.params.name} for {mealPeriod}</Text>
                <SafeAreaView style={styles.items}>
                    {menu}
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 400,
        //alignItems: "flex-end", 
        justifyContent: "flex-end",
        padding: 20,
    },
    mainHeading: {
        paddingTop: 20, 
        paddingHorizontal: 20, 
        fontSize: 28,
        lineHeight: 36,
        marginBottom: 5, 
        fontFamily: "publica-sans-s",
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
        fontFamily: 'sf-pro-sb',
        fontSize: 18,
    },
    items: {
        paddingHorizontal: 20,
        marginTop: -40,
    }, 




});

export default DiningHall; 


{/* <View style={styles.body}>
                    <Block>
                        <View style={{ padding: 8 }}>
                            <Text style={styles.insightsHeaderText}>{routes.params.name} at a glance</Text>
                        </View>
                    </Block>
                </View> */}