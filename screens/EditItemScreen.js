import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditItemScreen = ({ navigation }) => {
	const [items, setItems] = useState([])
	// const [editItem, setEditItem] = useState({})

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

	const GetEditItem = async () => {
		const editItemName = await AsyncStorage.getItem('editItemName')

		const itemsObject = await AsyncStorage.getItem('newInvoiceItems')
		const items = JSON.parse(itemsObject)

		let editItem

		items.map((item) => item.name === editItemName && (editItem = item))

		setData({
			...data,
			name: editItem.name,
			description: editItem.description,
			rate: editItem.rate,
			quantity: editItem.quantity
		})
	}

	useEffect(() => {
		GetEditItem()
	}, [])

	const onChangeText = (val, id) => {
		setData({
			...data,
			[id]: val
		})
	}

	const handleEditItem = async () => {
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
			const newInvoiceItems = await AsyncStorage.getItem(
				'newInvoiceItems'
			)
			const editItemName = await AsyncStorage.getItem('editItemName')
			let index

			itemList = JSON.parse(newInvoiceItems)
			itemList.map(
				(item) =>
					item.name === editItemName &&
					(index = itemList.indexOf(item))
			)
			itemList.splice(index, 1, data)

			await AsyncStorage.setItem(
				'newInvoiceItems',
				JSON.stringify(itemList)
			)
			navigation.navigate('NewInvoice')
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
			console.log(validation)
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

	const handleDeleteItem = async () => {
		let itemList = []
		const newInvoiceItems = await AsyncStorage.getItem('newInvoiceItems')
		const editItemName = await AsyncStorage.getItem('editItemName')
		let index

		itemList = JSON.parse(newInvoiceItems)
		itemList.map(
			(item) =>
				item.name === editItemName && (index = itemList.indexOf(item))
		)
		itemList.splice(index, 1)

		await AsyncStorage.setItem('newInvoiceItems', JSON.stringify(itemList))
		navigation.navigate('NewInvoice')
	}

	useEffect(() => {
		setValidation({
			...validation,
			isValidName: true,
			isValidRate: true,
			isValidQuantity: true
		})
	}, [])

	return (
		<View style={styles.container}>
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
				activeOpacity={0.7}
				onPress={() => handleEditItem()}
			>
				<LinearGradient
					colors={['#08d4c4', '#01ab9d']}
					style={styles.signIn}
				>
					<Text style={[styles.textSign, { color: '#fff' }]}>
						Save Changes
					</Text>
				</LinearGradient>
			</TouchableOpacity>

			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => handleDeleteItem()}
			>
				<LinearGradient
					colors={['#08d4c4', '#01ab9d']}
					style={styles.signIn}
				>
					<Text style={[styles.textSign, { color: '#fff' }]}>
						Delete
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	)
}

export default EditItemScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0'
	},
	inputHeader: {
		color: '#05375a',
		fontSize: 16,
		marginLeft: 10,
		marginTop: 30
		// marginTop: Platform.OS === 'ios' ? 0 : -12,
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
		color: '#05375a',
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
	}
})
