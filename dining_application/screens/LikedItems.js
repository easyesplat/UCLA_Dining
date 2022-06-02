import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import Gradient from '../assets/gradient.js'
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native"
import { useNavigation } from '@react-navigation/native';
import { LikedIcon, ExternalLink } from '../assets/icons/icons.js';
import readAllItems from "../Core/allItemsDatabse"
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Core/Config';
import { onAuthStateChanged } from "firebase/auth";
import Loading from '../components/loading.js';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';

const Item = ({ name, diningHall, link, time, itemLiked, area }) => {

    const [result, setResult] = useState(null);

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(link);
        setResult(result);
    };

    if (time === "late_night") {
        time = "late night";
    }

    return (
        <TouchableOpacity
            onPress={() => {
                _handlePressButtonAsync();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
        >
            <View style={styles.item}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subHeading}>at <Text style={styles.important}>{area}</Text> at <Text style={styles.important}>{diningHall}</Text> for <Text style={styles.important}>{time}</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={{ marginLeft: 10, }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
                        <ExternalLink />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )


};

const LikedItemsComponent = () => {
    const [menuMap, setMenuMap] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const routes = useRoute();
    const navigation = useNavigation();

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
        const unsubscribe = navigation.addListener('focus', () => {
            readAllItems().then((result) => {
                setMenuMap(result);
            }).catch((error) => console.log('error', error));
    
            const subscriber = onAuthStateChanged(auth, authStateChanged);
            return subscriber; // unsubscribe on unmount
        });
        
        return unsubscribe;
    }, []);

    if (initializing || userDoc === null) return <Loading />;

    if (menuMap == null || userDoc == null) {
        return <Loading />;
    }

    let likedItemsList = [];
    let likedItemsItems = [];

    let count = 0;


    for (let [key, value] of menuMap) {
        for (let [key1, value1] of value) {
            for (let [key2, value2] of value1) {
                for (let item in value2["food"]) {
                    if (userDoc.likedItems.includes(item)) {
                        likedItemsList.push({ diningHall: key, time: key1, area: key2, itemName: item, link: value2["food"][item][0] });
                        likedItemsItems.push(
                            <Item name={item} diningHall={key} area={key2} link={value2["food"][item][0]} time={key1} itemLiked={false} />
                        )
                    }
                    count++;
                }
            }
        }
    }

    console.log(likedItemsList);



    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Your liked items</Text>
                    <LikedIcon />
                </View>
                {likedItemsItems}
            </ScrollView>
        </SafeAreaView>
    )
}

function LikedItems() {
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            {
                <Gradient style={styles.gradientPosition} color1="#D24040" color2="#F5ABAB" />
            }
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer, { flex: 1 }]}></BlurView>
            <LikedItemsComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        width: '100%',
        zIndex: -1,
    },
    gradientPosition: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -2,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontFamily: "publica-sans-m",
        lineHeight: 30,
        fontSize: 28,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    iconRow: {
        flexDirection: "row",
    },
    icon: {
        paddingLeft: 15,
    },
    list: {
        overflow: "visible"
    },
    item: {
		marginBottom: 15,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
		shadowColor: 'rgba(100,100,110, 0.18)', // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 29, //IOS
		backgroundColor: "white",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "space-between",
	},
	title: {
		fontSize: 20,
		marginBottom: 3,
		fontFamily: "publica-sans-m"
	},
	subHeading: {
		fontSize: 16,
		fontFamily: "publica-sans-l",
	},
	important: {
		fontFamily: "publica-sans-s",
	},
})

export default LikedItems