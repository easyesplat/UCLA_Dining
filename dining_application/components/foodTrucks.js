import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, ImageBackground} from 'react-native';
import { useFonts } from 'expo-font';
import Menubutton from './menubutton';

const DATA = [
    {
        id: 1,
        name: "Epicuria", 
        waitTime: 4, 
        imageUri: require('dining_application/assets/diningHallImages/epicimage.jpeg'), 
    },
    {
        id: 2,
        name: "Bruin Plate", 
        waitTime: 6, 
        imageUri: require('dining_application/assets/diningHallImages/bplateimage.jpg'), 
    },
    {
        id: 3,
        name: "De Neve", 
        waitTime: 6, 
        imageUri: require('dining_application/assets/diningHallImages/deneve.jpg'), 
    },
    {
        id: 4,
        name: "Rendezvous", 
        waitTime: 18, 
        imageUri: require('dining_application/assets/diningHallImages/rende.jpg'), 
    },
    {
        id: 5,
        name: "Bruin Cafe", 
        waitTime: 22, 
        imageUri: require('dining_application/assets/diningHallImages/bcafe.jpg'), 
    },
    {
        id: 6,
        name: "The Feast", 
        waitTime: 34, 
        imageUri: require('dining_application/assets/diningHallImages/feast.jpg'), 
    },
    {
        id: 7,
        name: "Bruin Bowl", 
        waitTime: 21, 
        imageUri: require('dining_application/assets/diningHallImages/bowl.jpg'), 
    },
    {
        id: 8,
        name: "The Study", 
        waitTime: 45, 
        imageUri: require('dining_application/assets/diningHallImages/study.jpg'), 
    },
];

function FoodTruckCard(props) {
    return (
        <TouchableOpacity style={styles.button}>
            <ImageBackground style={{ flex: 1,}} resizeMode="cover" source={require('dining_application/assets/foodTruckImages/origherb.jpeg')}>
                <Text style={{height: 200}}>Hello</Text>
            </ImageBackground>
        </TouchableOpacity>
    ); 
}

//<Image style={StyleSheet.absoluteFill} source={require('dining_application/assets/foodTruckImages/278744442_1963121643860184_5426346389554097002_n.jpeg')} />
//name={item.name} waitTime={item.waitTime} imageUri={item.imageUri}
function FoodTrucks() {
    const renderMenuButton = ({item}) => (
        <FoodTruckCard/>
    ); 

    return (
        <View>
            <Text style={{fontFamily: "sf-pro-sb", fontSize: 18, marginTop: 20}}>Discover more with Food Trucks</Text>
            <FlatList
                horizontal
                data={DATA}
                renderItem={renderMenuButton}
                keyExtractor={item => item.id}
                style={{overflow: "visible", marginTop: 10}}
            />
        </View>
    ); 
}

const styles = StyleSheet.create({
    button: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        borderRadius: 10, 
        width: 280,
        height: 170,
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        //paddingRight: 5, 
        marginBottom: 10, 
        marginRight: 10, 
        overflow: "hidden"
    },
    backgroundImage: {
        width: 50, 
        height: 50, 
        borderBottomLeftRadius: 10, 
        borderTopLeftRadius: 10, 
    }, 
    textWrapper: {
        padding: 10,
        maxWidth: 300,
    }
})

export default FoodTrucks;