import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DiningHall from './screens/DiningHall';
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './TabNavigator';
import WelcomeScreen from './screens/WelcomeScreen'
import SignupScreen from './screens/SignupScreen';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Log in" component={LoginScreen} />
            <Stack.Screen name="Sign up" component={SignupScreen} />
            <Stack.Screen name="HomeScreen" component={TabNavigator} />
        </Stack.Navigator>
    )
}



const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Group>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                    animationEnabled: false,
                }} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Dining Halls" component={DiningHall} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

export { HomeStackNavigator, StackNavigator }; 
