import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native'
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
import AtAGlanceItem from '../components/atAGlanceItem';

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

    let menuSupported = true; 
    let dietaryRestriction = true; 

    if (routes.params.name === "The Study at Hedrick") {
        menuSupported = false; 
    } else if (routes.params.name === "Bruin Café" || routes.params.name === "The Drey") {
        dietaryRestriction = false; 
    }

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
    let vegetarianItems = 0; 
    let veganItems = 0; 
    let halalItems = 0; 
    let likedItems = 0;
    
    let vegetarianItemsList = []; 
    let veganItemsList = [];
    let halalItemsList = [];
    let likedItemsList = [];

    for(let [key, value] of menuMap.get(routes.params.period))
    {
        menu.push(<MenuHeader header={key}/>)
        const subMenu = []; 
        for(let item in value["food"])
        {
            let alreadyLiked = false; 
            if(userDoc.likedItems.includes(item)) {
                alreadyLiked = true;
                likedItems++;  
                likedItemsList.push({parent: key, itemName: item, liked: null}); 
            }
            for(let x in (value["food"])[item])
            {
                if (value["food"][item][x] == " Vegetarian Menu Option") {
                    vegetarianItems++; 
                    vegetarianItemsList.push({parent: key, itemName: item, liked: alreadyLiked}); 
                } else if (value["food"][item][x] == " Vegan Menu Option") {
                    veganItems++; 
                    veganItemsList.push({parent: key, itemName: item, liked: alreadyLiked}); 
                } else if (value["food"][item][x] == " Halal Menu Option") {
                    halalItems++; 
                    halalItemsList.push({parent: key, itemName: item, liked: alreadyLiked}); 
                }
            }
            subMenu.push(<MenuItem itemName={item} liked={alreadyLiked} uid={user.uid} parent={key} information={(value["food"])[item]}/>)
        }
        menu.push(<MenuBlock>{subMenu}</MenuBlock>)
    }

    if (menu.length === 0) {
        menu.push(
            <View>
                <MenuBlock>
                    <Text style={{
                        fontSize: 15,
                        lineHeight: 20,
                        fontFamily: "publica-sans-l",
                        margin: 5, 
                        marginBottom: 15, 
                        textAlign: 'center',
                    }}>Looks like we don't support menus for this dining hall yet!</Text>
                </MenuBlock>
            </View>
        );
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
                <View style={styles.body}>
                    <View style={styles.block}>
                        <View style={{ padding: 8 }}>
                            <Text style={styles.insightsHeaderText}>{mealPeriod[0].toUpperCase() + mealPeriod.substring(1)} at a glance</Text>
                            {
                                menuSupported &&
                                <View style={styles.glanceView}>
                                    {
                                        dietaryRestriction && 
                                        <>
                                            <AtAGlanceItem number={vegetarianItems} type="vegetarian" list={vegetarianItemsList}/>
                                            <AtAGlanceItem number={veganItems} type="vegan" list={veganItemsList}/>
                                            <AtAGlanceItem number={halalItems} type="halal" list={halalItemsList}/>
                                        </>
                                    }
                                    <AtAGlanceItem number={likedItems} type="liked" list={likedItemsList}/>
                                </View>
                            }
                        </View>
                    </View>
                </View>
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
    }
});

export default DiningHall; 
