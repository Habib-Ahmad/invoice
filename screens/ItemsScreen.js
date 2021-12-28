import React, { useEffect, useState, useCallback } from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Platform,
	TouchableOpacity,
	Alert,
	ScrollView,
	RefreshControl
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import database from '@react-native-firebase/database'

const ItemsScreen = ({ navigation }) => {
	const [items, setItems] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [changes, setChanges] = useState(false)

	const { colors } = useTheme()
	const theme = useTheme()

	useEffect(() => {
		const GetData = async () => {
			const itemListObject = await AsyncStorage.getItem('ItemDatabase')

			if (itemListObject) {
				setItems(JSON.parse(itemListObject))
			} else {
				database()
					.ref('/items')
					.once('value')
					.then((snapshot) => {
						if (snapshot.val()) {
							AsyncStorage.setItem(
								'ItemDatabase',
								JSON.stringify(Object.values(snapshot.val()))
							)
							setItems(Object.values(snapshot.val()))
						}else {
                            setItems(null)
                        }
					})
			}
		}
		GetData()
	}, [])

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		database()
			.ref('/items')
			.once('value')
			.then((snapshot) => {
				if (snapshot.val()) {
					AsyncStorage.setItem(
						'ItemDatabase',
						JSON.stringify(Object.values(snapshot.val()))
					)
					setItems(Object.values(snapshot.val()))
				}else {
                    setItems(null)
                }
			})
			.then(() => setRefreshing(false))
	}, [])

	const setItemDetails = async (item) => {
		await AsyncStorage.setItem('itemDetails', JSON.stringify(item))
		navigation.navigate('AddItem')
	}

	const deleteItem = async (id) => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this item?',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: async () => {
						await database()
							.ref(`/items/${id}`)
							.remove()
							.then(() => onRefresh())
					}
				}
			]
		)
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: colors.background
		},
		header: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.background2,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
			zIndex: 5
		},
		headerText: {
			fontSize: 22,
			color: colors.text
		},
		items: {
			paddingTop: 40
		},
		item: {
			flexDirection: 'row',
			backgroundColor: '#fff',
			height: 90,
			marginBottom: 30,
			justifyContent: 'space-between',
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9'
		},
		detailsWrapper: {
			flexDirection: 'row'
		},
		itemIcon: {
			marginRight: 20,
			marginTop: 10
		},
		details: {
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			height: '100%'
		},
		desc: {
			color: '#636363',
			fontSize: 12
		}
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => navigation.goBack()}
				>
					<Icon
						style={{ marginRight: 15 }}
						name='close'
						color='#075E54'
						size={25}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Items</Text>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollView}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{changes && <Text>Changes detected, pull down to refresh</Text>}

				<View style={styles.items}>
					{items &&
						items.map((item, idx) => (
							<TouchableOpacity
								onPress={() => setItemDetails(item)}
								style={styles.item}
								key={item.id}
							>
								<View style={styles.detailsWrapper}>
									<Icon
										style={styles.itemIcon}
										name='md-basket-outline'
										size={30}
										color='#000'
									/>

									<View style={styles.details}>
										<Text>{item.name}</Text>
										<Text style={styles.desc}>
											{item.description}
										</Text>
										<Text style={styles.price}>
											₦
											{item.rate.replace(
												/\B(?=(\d{3})+(?!\d))/g,
												','
											)}
										</Text>
									</View>
								</View>

								<TouchableOpacity
									onPress={() => deleteItem(item.id)}
								>
									<Icon
										name='close-outline'
										size={30}
										color='#000'
									/>
								</TouchableOpacity>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
		</View>
	)
}

export default ItemsScreen
