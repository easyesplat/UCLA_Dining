import * as React from 'react';
import { Text, StatusBar } from 'react-native';
import { StackNavigator } from "./StackNavigator"
import { NavigationContainer } from "@react-navigation/native"

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


function App() {
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
