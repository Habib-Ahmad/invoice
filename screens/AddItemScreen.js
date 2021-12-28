import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	StatusBar,
	Platform
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddItemScreen = ({ navigation }) => {
	const [route, setRoute] = useState('')

	const [validation, setValidation] = useState({
		isValidName: true,
		isValidRate: true,
		isValidQuantity: true
	})

	const [data, setData] = useState({
		name: '',
		description: '',
		rate: '',
		quantity: ''
	})

	const { colors } = useTheme()
	const theme = useTheme()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getItemDetails()
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const getPreviousScreen = async () => {
			const routeName = await AsyncStorage.getItem('previousScreen')
			setRoute(JSON.parse(routeName))
		}
		getPreviousScreen()
	}, [])

	const getItemDetails = async () => {
		const itemDetailsObject = await AsyncStorage.getItem('itemDetails')
		if (itemDetailsObject) {
			const itemDetails = JSON.parse(itemDetailsObject)
			setData({
				...data,
				name: itemDetails.name,
				description: itemDetails.description,
				rate: itemDetails.rate
			})
		}
	}

	const onChangeText = (val, id) => {
		setData({
			...data,
			[id]: val
		})
	}

	const handleAddItem = async () => {
		if (
			data.name.length > 0 &&
			data.rate.length > 0 &&
			data.quantity.length > 0
		) {
			setValidation({
				...validation,
				isValidName: true,
				isValidRate: true,
				isValidQuantity: true
			})

			let itemList = []
			if (route === 'NewInvoice') {
				const newInvoiceItems = await AsyncStorage.getItem(
					'newInvoiceItems'
				)

				if (JSON.parse(newInvoiceItems) == null) {
					await AsyncStorage.setItem(
						'newInvoiceItems',
						JSON.stringify(itemList)
					)
				} else {
					itemList = JSON.parse(newInvoiceItems)
				}

				itemList.push(data)
				await AsyncStorage.setItem(
					'newInvoiceItems',
					JSON.stringify(itemList)
				)
			} else if (route === 'EditInvoice') {
				console.log('for edit invoice')
				const editInvoiceItems = await AsyncStorage.getItem(
					'editInvoiceItems'
				)

				if (JSON.parse(editInvoiceItems) == null) {
					await AsyncStorage.setItem(
						'editInvoiceItems',
						JSON.stringify(itemList)
					)
				} else {
					itemList = JSON.parse(editInvoiceItems)
				}

				itemList.push(data)
				await AsyncStorage.setItem(
					'editInvoiceItems',
					JSON.stringify(itemList)
				)
			}
			await AsyncStorage.removeItem('itemDetails')
			navigation.goBack()
		} else {
			let nameStatus = validation.isValidName
			let rateStatus = validation.isValidRate
			let quantityStatus = validation.isValidQuantity

			if (data.name.length < 1) {
				nameStatus = false
			}
			if (data.rate.length < 1) {
				rateStatus = false
			}
			if (data.quantity.length < 1) {
				quantityStatus = false
			}
			setValidation({
				...validation,
				isValidName: nameStatus,
				isValidRate: rateStatus,
				isValidQuantity: quantityStatus
			})
		}
	}

	const handleValidation = (val, id) => {
		if (val.trim().length > 0) {
			setValidation({
				...validation,
				[id]: true
			})
		}
	}

	useEffect(() => {
		setValidation({
			...validation,
			isValidName: true,
			isValidRate: true,
			isValidQuantity: true
		})
	}, [])

	const goBack = async () => {
		await AsyncStorage.removeItem('itemDetails')
		navigation.goBack()
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: colors.background
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: colors.background2,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
			zIndex: 5
		},
		headerLeft: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		headerText: {
			fontSize: 22,
			color: colors.text
		},
		inputHeader: {
			color: '#000',
			fontSize: 16,
			marginLeft: 10,
			marginTop: 30
		},
		inputWrapper: {
			flexDirection: 'row',
			borderBottomWidth: 1,
			borderBottomColor: '#d6d6d6',
			paddingBottom: 5,
			marginHorizontal: 10
		},
		input: {
			flex: 1,
			paddingLeft: 10,
			color: '#000',
			fontSize: 18
		},
		signIn: {
			marginTop: 30,
			height: 50,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			borderColor: '#075E54',
			borderWidth: 1,
			marginHorizontal: 20
		},
		errorMsg: {
			color: '#FF0000',
			fontSize: 14,
			marginLeft: 20,
			marginBottom: 5
		},
		select: {
			height: 80,
			marginTop: 20,
			justifyContent: 'center',
			paddingHorizontal: 20
		},
		selectText: {
			fontSize: 16,
			color: '#075E54',
			textDecorationLine: 'underline'
		}
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => goBack()}
					>
						<Icon
							style={{ marginRight: 15 }}
							name='close'
							color='#075E54'
							size={25}
						/>
					</TouchableOpacity>

					<Text style={styles.headerText}>Add Item</Text>
				</View>

				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => handleAddItem()}
				>
					<Icon name='checkmark' color='#075E54' size={25} />
				</TouchableOpacity>
			</View>
			{data.name ? (
				<Animatable.Text
					animation='fadeIn'
					duration={500}
					style={styles.inputHeader}
				>
					Item name
				</Animatable.Text>
			) : (
				<View style={{ marginTop: 50 }}></View>
			)}
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder='Item name'
					value={data.name}
					onChangeText={(val) => onChangeText(val, 'name')}
					onEndEditing={(e) =>
						handleValidation(e.nativeEvent.text, 'isValidName')
					}
				/>
			</View>
			{validation.isValidName || (
				<Text style={styles.errorMsg}>Item name cannot be empty</Text>
			)}

			{data.description ? (
				<Animatable.Text
					animation='fadeIn'
					duration={500}
					style={styles.inputHeader}
				>
					Item description
				</Animatable.Text>
			) : (
				<View style={{ marginTop: 50 }}></View>
			)}
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder='Item description'
					value={data.description}
					onChangeText={(val) => onChangeText(val, 'description')}
				/>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<View style={{ width: '50%' }}>
					{data.rate ? (
						<Animatable.Text
							animation='fadeIn'
							duration={500}
							style={styles.inputHeader}
						>
							Rate
						</Animatable.Text>
					) : (
						<View style={{ marginTop: 50 }}></View>
					)}
					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder='Rate'
							onChangeText={(val) => onChangeText(val, 'rate')}
							value={data.rate}
							keyboardType='numeric'
							onEndEditing={(e) =>
								handleValidation(
									e.nativeEvent.text,
									'isValidRate'
								)
							}
						/>
					</View>
					{validation.isValidRate || (
						<Text style={styles.errorMsg}>
							Rate cannot be empty
						</Text>
					)}
				</View>

				<View style={{ width: '50%' }}>
					{data.quantity ? (
						<Animatable.Text
							animation='fadeIn'
							duration={500}
							style={styles.inputHeader}
						>
							Quantity
						</Animatable.Text>
					) : (
						<View style={{ marginTop: 50 }}></View>
					)}
					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.input}
							placeholder='Quantity'
							onChangeText={(val) =>
								onChangeText(val, 'quantity')
							}
							value={data.quantity}
							keyboardType='numeric'
							onEndEditing={(e) =>
								handleValidation(
									e.nativeEvent.text,
									'isValidQuantity'
								)
							}
						/>
					</View>
					{validation.isValidQuantity || (
						<Text style={styles.errorMsg}>
							Quantity cannot be empty
						</Text>
					)}
				</View>
			</View>

			<TouchableOpacity
				style={styles.select}
				onPress={() => navigation.navigate('Items')}
			>
				<Text style={styles.selectText}>Select from list</Text>
			</TouchableOpacity>
		</View>
	)
}

export default AddItemScreen
