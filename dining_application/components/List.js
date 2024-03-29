import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	Image, 
	Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ExternalLink, SmallHeart } from "../assets/icons/icons";
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';


// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, diningHall, link, time, itemLiked, area }) => {

	const [result, setResult] = useState(null);

	const _handlePressButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync(link);
		setResult(result);
	};

	if (time === "late_night") {
		time = "late night";
	}

	return (
		<TouchableOpacity
			onPress={() => {
				_handlePressButtonAsync();
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
			}}
		>
			<View style={styles.item}>
				<View style={{ maxWidth: 200 }}>
					<Text style={styles.title}>{name}</Text>
					<Text style={styles.subHeading}>at <Text style={styles.important}>{area}</Text> at <Text style={styles.important}>{diningHall}</Text> for <Text style={styles.important}>{time}</Text></Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: "center" }}>
					{
						itemLiked &&
						<View style={styles.likedItem}>
							<SmallHeart liked={true} />
							<Text style={{ color: "#D24040", fontFamily: "publica-sans-m", paddingLeft: 5, lineHeight: 14, fontSize: 12 }}>Liked Item</Text>
						</View>
					}
					<View style={{ marginLeft: 10, }} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
						<ExternalLink />
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)


};

// the filter
const List = (props) => {
	let listData = [];
	const splitText = props.searchPhrase.split(" ");
	let phrase = props.searchPhrase.toUpperCase().trim().replace(/\s/g, "");

	for (let x in props.data) {
		let item = props.data[x];
		let condensedString = (item.itemName.toUpperCase() + item.diningHall.toUpperCase() + item.area.toUpperCase() + item.time.toUpperCase()).trim().replace(/\s/g, "");
		let all = true;
		for (let i in splitText) {
			//ignorable words
			if (splitText[i] === "for" || splitText[i] === "at") {
				continue; 
			}
			if (!condensedString.includes(splitText[i].toUpperCase().trim().replace(/\s/g, ""))) {
				all = false; 
				break; 
			}
		}
		if (all) {
			listData.push(props.data[x]);
			continue;
		}
		if (item.itemName.toUpperCase().includes(phrase)) {
			listData.push(props.data[x]);
			continue; 
		}
		if (item.diningHall.toUpperCase().includes(phrase)) {
			listData.push(props.data[x]);
			continue; 
		}
		if (item.area.toUpperCase().includes(phrase)) {
			listData.push(props.data[x]);
			continue; 
		}
		if (item.time.toUpperCase().includes(phrase)) {
			listData.push(props.data[x]);
			continue; 
		}
		if (condensedString.includes(phrase)) {
			listData.push(props.data[x]);
			continue; 
		}
	}


	if (props.searchPhrase === "") {
		return <Text style={{ fontFamily: "publica-sans-l", width: "100%", textAlign: 'center', paddingTop: 30, fontSize: 16, color: "grey"}}>Type something to start searching{"\n"}Try "Pizza for lunch at Epicuria"</Text>
	}

	if (listData.length === 0) {
		return (
			<View style={{marginTop: 30}}>
				<Image style={{ width: 100, height: 100, alignSelf: "center" }} source={require("../assets/animojis/supriseBear.png")} />
				<Text style={{ fontFamily: "publica-sans-l", width: "100%", textAlign: 'center', fontSize: 16, color: "grey"}}>Oh no! Looks like nothing matched your search</Text>
			</View>
		);
	}

	const renderItem = ({ item }) => {
		return <Item name={item.itemName} diningHall={item.diningHall} area={item.area} link={item.link} time={item.time} itemLiked={item.liked} />;
	};

	return (
		<SafeAreaView style={styles.list__container}>
			<View
				onStartShouldSetResponder={() => {
					props.setClicked(false);
				}}
			>
				<View>
					<FlatList
						data={listData}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						style={{ marginHorizontal: -20, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 200 }}
						showsVerticalScrollIndicator={false}
						onScrollEndDrag={() => Keyboard.dismiss()}
						contentContainerStyle={{ paddingBottom: 40 }}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default List;

const styles = StyleSheet.create({
	list__container: {
		height: "91%",
		width: "100%",
	},
	item: {
		marginBottom: 15,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
		shadowColor: 'rgba(100,100,110, 0.12)', // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 10, //IOS
		backgroundColor: "white",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "space-between",
	},
	title: {
		fontSize: 20,
		marginBottom: 3,
		fontFamily: "publica-sans-m"
	},
	subHeading: {
		fontSize: 16,
		fontFamily: "publica-sans-l",
	},
	important: {
		fontFamily: "publica-sans-s",
	},
	likedItem: {
		padding: 6,
		paddingHorizontal: 10,
		backgroundColor: "#F5ABAB",
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
