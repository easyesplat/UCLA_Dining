import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DiningHall from './screens/DiningHall';
import AllDiningHalls from './screens/AllDiningHalls';

const Stack = createNativeStackNavigator(); 

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Dining Halls" component={DiningHall} options={{headerShown: false}} />
                <Stack.Screen name="All Dining Halls" component={AllDiningHalls} options={{headerShown: true}} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator;