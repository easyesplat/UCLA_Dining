import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import { useFonts } from 'expo-font';
import ChevronRight from "dining_application/assets/icons/chevron-right.js";

const [loaded] = useFonts({
    'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
    'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    'sf-pro-m': require('dining_application/assets/fonts/SF-Pro-Text-Medium.otf'),
    'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
    'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
});

function FoodTruckCard(props) {
  return (
    <View>
      <ImageBackground
        style={styles.foodTruckImage}
        resizeMode="cover"
        source={require('./assets/perro.jpeg')}>

      <TouchableOpacity>
        <Button
          uppercase= {false}
          title = {<Text style={styles.buttonText} onPress={() => Linking.openURL('http://google.com')}> 
          Perro <ChevronRight/> 
          </Text>}
          color = '#00000'
          >
        </Button>
      </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            backgroundColor: '#FFE475',
            padding: 5,
            borderRadius: 8 
          }}>
          <Text
            style={{
              font: 'publica-sans-s',
              fontSize: 12,
              flexWrap: 'wrap'}}>
            Sproul
          </Text>
        </View>

      </ImageBackground>
    </View>
  );
}
  
  const styles = StyleSheet.create({
      foodTruckImage : {
            //height: '100%',
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
      buttonText : {
        position: 'absolute',
        top: 130,
        left: 10,
        backgroundColor: 'white',
        padding: 5,
        paddingTop: 6,
        borderRadius: 8,
        color: 'black',
        font: 'publica-sans-m',
        fontSize: 15,
        lineHeight: 15, 
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row'
  }
  })

export default FoodTruckCard;