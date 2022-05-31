// function FoodTruckCard(props) {
//     return (
//         <TouchableOpacity style={styles.button} >
//             <ImageBackground style={{ flex: 1,}} resizeMode="cover" 
//             source={require('./assets/babysburgers.jpeg')}>
//             </ImageBackground>

//             <Block style={{ flexDirection: "column", alignItems: "flex-end"}}>
//                 <View style={{flexDirection: "row", alignItems: "center", width: "100%", margin: 0}}>
//                     <TruckInfo style={{marginLeft: 5}} truckName={props.name}/>
//                     <Text style={{fontFamily: "publica-sans-s", fontSize: 15, flex: 1, flexWrap: 'wrap'}}>   
//                     { /*truckName*/"Baby's Burgers"} <ChevronRight/> </Text>   
//                 </View>
//             </Block>
//         </TouchableOpacity>
//     ); 


import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, ImageBackground} from 'react-native';
import { useFonts } from 'expo-font';
import Block from "./block";
import AssetExample from './components/AssetExample';
import ChevronRight from "./assets/icons/chevron-right";

const DATA = [
    {
        id: 1,
        name: "Baby's Burgers", 
        link: "http://www.babysbadassburgers.com",
        imageUri: require('./assets/babysburgers.jpeg'), 
    },
    {
        id: 2,
        name: "Bison Burgers", 
        link: "https://www.facebook.com/bunzgourmetburgers/",
        imageUri: require('./assets/bison.jpeg'), 
    },
    {
        id: 3,
        name: "The Bollywood Kitchen", 
        link: "https://www.thebollywoodkitchen.com",
        imageUri: require('./assets/bollywood.jpeg'), 
    },
    {
        id: 4,
        name: "Bunz Gourmet Burgers", 
        link: "https://www.facebook.com/bunzgourmetburgers/",
        imageUri: require('./assets/bunz.jpeg'), 
    },
    {
        id: 5,
        name: "Creamy Boys", 
        link: "https://creamyboysicecream.com",
        imageUri: require('./assets/creamyboys.jpeg'), 
    },
    {
        id: 6,
        name: "The Deli Doctor", 
        link: "https://www.delidoctor.com",
        imageUri: require('./assets/delidoctor.jpeg'), 
    },
    {
        id: 7,
        name: "Dina's Dumplings", 
        link: "https://www.dinasdumpling.com/menu-2",
        imageUri: require('./assets/dinas.jpeg'), 
    },
    {
        id: 8,
        name: "Flaming Grain", 
        link: "https://www.bestfoodtrucks.com/truck/flaming-grain/menu",
        imageUri: require('./assets/flaminggrain.jpeg'), 
    },
    {
      id: 9,
      name: "Habibi Shack",
      link: "https://www.bestfoodtrucks.com/truck/habibi-shack/menu",
      imageUri: require('./assets/habibi.jpeg'),
    },
    {
      id: 10,
      name: "Kalamaki Greek Street Food",
      link: "https://www.kalamakigreekla.com",
      imageUri: require('./assets/kalamaki.jpeg'),
    },
    {
      id: 11,
      name: "Kogi",
      link: "https://kogibbq.com",
      imageUri: require('./assets/kogi.jpeg'),
    },
    {
      id: 12,
      name: "Manna From Heaven",
      link: "https://www.mannafromheavencali.com",
      imageUri: require('./assets/manna.jpeg'),
    },
    {
      id: 13,
      name: "Mikhuna", 
      link: "https://roaminghunger.com/mikhuna/",
      imageUri: require('./assets/mikhuna.jpeg'),
    },
    {
      id: 14,
      name: "Original Herbivore",
      link: "https://roaminghunger.com/original-herbivore-ca/",
      imageUri: require('./assets/origherbtruck.jpeg'),
    },
    {
      id: 15,
      name: "Pacifico Charbroiled Fish",
      link: "https://www.bestfoodtrucks.com/truck/pacifico-charbroiled-fish/menu",
      imageUri: require('./assets/pacifico.jpeg'),
    },
    {
      id: 16,
      name: "Paradise Cookies and Ice Cream",
      link: "https://www.paradisela.com",
      imageUri: require('./assets/paradise.jpeg'),
    },
    {
      id: 17,
      name: "Philly Jay's Steaks",
      link: "https://www.phillyjayssteaks.com",
      imageUri: require('./assets/philly.jpeg'),
    },
    {
      id: 18,
      name: "Pinch of Flavor",
      link: "https://roaminghunger.com/pinch-of-flavor/",
      imageUri: require('./assets/pinchflavor.jpeg'),
    },
    {
      id: 19,
      name: "Potuine Brothers",
      link: "https://poutinebrothers.com",
      imageUri: require('./assets/poutine.jpeg'),
    },
    {
      id: 20,
      name: "StopBye Café",
      link: "https://www.stopbyecafe.com",
      imageUri: require('./assets/stopbye.jpeg'),
    },
    {
      id: 21,
      name: "8E8 Thai Street Food",
      link: "https://roaminghunger.com/8e8-thai-street-food/",
      imageUri: require('./assets/thai8E8.jpeg'),
    },
    {
      id: 22,
      name: "Tokyo Style",
      link: "https://www.bestfoodtrucks.com/truck/tokyo-style-food-truck-and-catering/menu",
      imageUri: require('./assets/tokyostyle.jpeg'),
    },
    {
      id: 23,
      name: "Uncle Al's BBQ",
      link: "https://www.rubeatrepeat.com",
      imageUri: require('./assets/uncleals.jpeg'),
    },
    {
      id: 24,
      name: "Venice Caffe and Gelato",
      link: "https://www.bestfoodtrucks.com/truck/venice-caffe-and-gelato/menu",
      imageUri: require('./assets/venice.jpeg'),
    },
    {
      id: 25,
      name: "Cafe Vietnam",
      link: "https://www.cafevietnamtruck.com",
      imageUri: require('./assets/vietnam.jpeg'),
    },
    {
      id: 26,
      name: "Wafl",
      link: "https://roaminghunger.com/wafl/",
      imageUri: require('./assets/wafl.jpeg'),
    },
    {
      id: 27,
      name: "Yalla",
      link: "https://yallatruck.com",
      imageUri: require('./assets/yalla.jpeg'),
    },
    {
      id: 28,
      name: "Yuna's Bob",
      link: "https://www.bestfoodtrucks.com/truck/yuna-s-bob/menu",
      imageUri: require('./assets/yunasbob.jpeg'),
    },
    {
      id: 29,
      name: "Perro",
      link: "https://www.tacoperro.com",
      imagueUri: require('./assets/perro.jpeg'),
    }
];

function FoodTruckCard(props) {
    return (
        <TouchableOpacity style={styles.button}>
            <ImageBackground style={{ height: '100%' }} resizeMode="cover" 
            source={require('./assets/perro.jpeg')}>
            </ImageBackground>
            
            <View style={styles.NameStyles}>
                 <Text style={styles.textWrapper}> {"Perro"} <ChevronRight/> 
                </Text>   
            </View>
        </TouchableOpacity>
    ); 

}

//<Image style={StyleSheet.absoluteFill} source={require('dining_application/assets/foodTruckImages/278744442_1963121643860184_5426346389554097002_n.jpeg')} />
//name={item.name} waitTime={item.waitTime} imageUri={item.imageUri}

const styles = StyleSheet.create({
    button: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        borderRadius: 18, 
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
    NameStyles: {
 
    borderRadius: 5,
    // Set border width.
    borderWidth: 5,
    // Setting up Text Font Color.
    color: '#000',
    // Setting Up Background Color of Text component.
    backgroundColor : '#CDDC39',
    // Adding padding on Text component.
    padding : 2,
    fontSize: 30,
    textAlign: 'flex-end',
    margin: 109
  },
    textWrapper: {
        font: "publica",
        fontSize: 30,
        padding: 10,
        maxWidth: 300,
    },
})

export default FoodTruckCard;