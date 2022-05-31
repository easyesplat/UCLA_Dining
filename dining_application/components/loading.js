import { View, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';


export default function Loading() {
    const animation = useRef(null);
    return (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgb(240, 242, 245)", alignItems: 'center', justifyContent: 'center' }]}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 60,
                    height: 60,
                }}
                speed={0.5}
                source={require('../assets/loading.json')}
            />
        </View>
    );
}