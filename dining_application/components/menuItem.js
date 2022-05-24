import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heart, Info } from '../assets/icons/icons'
import Block from './block'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../Core/Config';
import AppLoading from 'expo-app-loading'

const MenuItem = ( {liked, itemName, uid} ) => {
    const[itemLiked, setItemLiked] = useState(liked); 

    if(itemLiked == null) {
        return <AppLoading/>; 
    }

    const handleClick = () => {
        if(itemLiked) {
            setItemLiked(false); 
            updateDoc(doc(db, "users", uid), {
                likedItems: arrayRemove(itemName), 
            }).then(() => {
                // alert("Removed Item");
            }).catch((e) => console.log(e));
        } else {
            setItemLiked(true); 
            updateDoc(doc(db, "users", uid), {
                likedItems: arrayUnion(itemName), 
            }).then(() => {
                // alert("Updated your liked items"); 
            }).catch((e) => console.log(e));
        }
    }

    return (
        <View style={styles.item}>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
                <Text style={styles.itemText}>{itemName}</Text>
                <TouchableOpacity style={{paddingLeft: 8,}}>
                    <Info/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleClick()}>
                <Heart liked={itemLiked}/>
            </TouchableOpacity>
        </View>
    )
}

const MenuHeader = (props) => {
    return (
        <View>
            <Text style={styles.header}>{props.header}</Text>
        </View>
    )
}

const MenuBlock = ({ children }) => {
    return (
        <View style={styles.block}>
            { children }
        </View>
    )
}

export { MenuItem, MenuHeader, MenuBlock }

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        lineHeight: 36,
        marginBottom: 5, 
        fontFamily: "publica-sans-s",
    },
    item: {
        marginBottom: 10, 
        padding: 10, 
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    itemText: {
        fontSize: 15,
        lineHeight: 20,
        fontFamily: "publica-sans-l",
        maxWidth: 240, 
    },
    block: {
        paddingHorizontal: 15,
        paddingTop: 10,
        borderRadius: 15, 
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 20, 
    }
})