import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import * as Font from 'expo-font';

// function to load the font(s)
const fetchFonts = () => {
    return Font.loadAsync({
        'sf-pro': require('dining_application/assets/fonts/AppleMyungjo.ttf')
    });
};

export default function font(){
  // keep the value of fontsLoaded in state
    const [ fontsLoaded, setFontsLoaded ] = useState(false);


    if (!fontsLoaded) {
        return (
        <AppLoading
            startAsync={fetchFonts}
            onError={console.warn}
            onFinish={() => setFontsLoaded(true)}
        />
        );
    }
}
