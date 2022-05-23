import * as React from 'react';
import { Text, StatusBar } from 'react-native';
import { StackNavigator } from "./StackNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from 'expo-font';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


function App() {
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
        'sf-pro-m': require('dining_application/assets/fonts/SF-Pro-Text-Medium.otf'),
        'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
        'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content"/>
            {
                <StackNavigator/>
            }
        </NavigationContainer>
    );
}


export default App;
