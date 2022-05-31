import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';


const GradientText = ({ colors, ...rest }) => {
    return (
        <MaskedView maskElement={<Text {...rest} />}>
            <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 3 }}>
                <Text {...rest} style={[rest.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;