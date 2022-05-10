import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import Menubutton from 'dining_application/components/menubutton.js';
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'
import Refresh from '../assets/icons/refresh';
import Gear from '../assets/icons/gear';
import BellNotification from '../assets/icons/bell_notification';
import { useFonts } from 'expo-font';

const DATA = [
    {
        id: 1,
        name: "Epicuria", 
        waitTime: 4, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 2,
        name: "Bruin Plate", 
        waitTime: 6, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 3,
        name: "De Neve", 
        waitTime: 6, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 4,
        name: "Rendezvous", 
        waitTime: 18, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 5,
        name: "Bruin Cafe", 
        waitTime: 22, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 6,
        name: "The Feast", 
        waitTime: 34, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 7,
        name: "Bruin Bowl", 
        waitTime: 35, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
    {
        id: 8,
        name: "The Study", 
        waitTime: 45, 
        imageUri: require('dining_application/assets/epicimage.jpeg'), 
    },
];

function DiningHalls() {
    const renderMenuButton = ({item}) => (
        <Menubutton name={item.name} waitTime={item.waitTime} imageUri={item.imageUri}/>
    ); 

    return (
        <FlatList
            data={DATA}
            renderItem={renderMenuButton}
            keyExtractor={item => item.id}
            numColumns={2}
            style={styles.list}
        />
    ); 
}



function HomeScreenContent({navigation}) {
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    let hours = new Date().getHours(); 

    let greeting = "Morning";
    if (hours > 11 && hours < 18) {
        greeting = "Afternoon"; 
    } else if (hours > 17 && hours < 21) {
        greeting = "Evening"; 
    } else if (hours > 20 || hours < 4) {
        greeting = "Night"; 
    }

    let mealPeriod = "dinner";
    //Add Meal time changer



    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Good {greeting},{'\n'}Kalyan</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Refresh/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Gear/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icon, {position: "relative", bottom: 5}]}>
                            <BellNotification/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{fontFamily: "sf-pro-sb", fontSize: 18, marginBottom: 10,}}>Dining Halls open for {mealPeriod}</Text>
                <DiningHalls/>
            </ScrollView>
        </SafeAreaView>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View>
            <Gradient style={styles.gradientPosition}></Gradient>
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <HomeScreenContent></HomeScreenContent>
        </View>
    );
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
        fontFamily: "sf-pro-b", 
        fontSize: 36,
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
});

export default HomeScreen