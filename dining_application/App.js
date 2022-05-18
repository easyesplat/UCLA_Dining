// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import logo from './assets/logo.png';
// import * as Sharing from 'expo-sharing'; 
// import * as ImagePicker from 'expo-image-picker';

// export default function App() {
//   const [selectedImage, setSelectedImage] = React.useState(null);

//   let openImagePickerAsync = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync();

//     if (pickerResult.cancelled === true) {
//       return;
//     }

//     setSelectedImage({ localUri: pickerResult.uri });
//   }; 

//   let openShareDialogAsync = async () => {
//     if (Platform.OS === 'web') {
//       alert(`Uh oh, sharing isn't available on your platform`);
//       return;
//     }

//     await Sharing.shareAsync(selectedImage.localUri);
//   }; 

//   if (selectedImage !== null) {
//     return (
//       <View style={styles.container}>
//         <Image
//           source={{ uri: selectedImage.localUri }}
//           style={styles.thumbnail}
//         />
//         <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
//           <Text style={styles.buttonText}>Share this photo</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={logo} style={styles.logo} /> 
//       <Text style={styles.instructions}>
//         To share a photo from your phone with a friend, just press the button below!
//       </Text>
//       <TouchableOpacity
//         onPress={openImagePickerAsync}
//         style={styles.button}>
//         <Text style={styles.buttonText}>Pick a photo</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 305, 
//     height: 159,
//     marginBottom: 10,
//   },
//   instructions: {
//     color: '#888',
//     fontSize: 18, 
//   },
//   button: {
//     backgroundColor: "blue",
//     padding: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//   }, 
//   thumbnail: {
//     width: 300,
//     height: 300,
//     resizeMode: "contain"
//   }
// });


// In App.js in a new project

//import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar, BackHandler} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import StackNavigator from "./StackNavigator"
import { NavigationContainer } from "@react-navigation/native"

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content"/>
            <StackNavigator/>
        </NavigationContainer>
    );
}


export default App;
