import React, { useContext, useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import PDFParams from '../components/PDFParams'

const NewInvoiceScreen = ({ navigation }) => {
	const [items, setItems] = useState([])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			GetItemList()
		})
		return unsubscribe
	}, [navigation])

	const GetItemList = async () => {
		const itemList = await AsyncStorage.getItem('newInvoiceItems')
		setItems(JSON.parse(itemList))
	}

	const handleNext = async () => {
		setItems([])
		await AsyncStorage.removeItem('newInvoiceItems')
	}

	const EditItem = async (name) => {
		await AsyncStorage.setItem('editItemName', name)
		navigation.navigate('EditItem')
	}

	const CreatePDF = async () => {
		let sum = 0
		items.map((item) => {
			sum += item.rate * item.quantity
		})

		const params = PDFParams(items, sum)

		let options = {
			html: params[0],
			fileName: params[1],
			directory: params[2]
		}

		let file = await RNHTMLtoPDF.convert(options)
		alert(file.filePath)
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.header, { marginTop: 30 }]}>Bill to</Text>
			<TouchableOpacity
				style={styles.action}
				onPress={() => navigation.navigate('AddClient')}
			>
				<Icon
					style={styles.actionIcon}
					name='ios-person-outline'
					size={25}
				/>
				<Text style={styles.actionText}>Add Client</Text>
			</TouchableOpacity>

			<Text style={[styles.header, { marginTop: 30 }]}>Items</Text>
			{items &&
				items.map((item, idx) => (
					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.listItem}
						key={idx}
						onPress={() => EditItem(item.name)}
					>
						<Text style={styles.listItemName}>{item.name}</Text>
						{item.description == '' ? (
							<View style={{ marginTop: 5 }}></View>
						) : (
							<Text style={styles.listItemDesc}>
								{item.description}
							</Text>
						)}
						<View style={styles.listItemNumbersWrapper}>
							<Text style={styles.listItemNumbers}>
								₦{item.rate} x {item.quantity}{' '}
							</Text>
							<Text style={styles.listItemNumbers}>
								₦{item.rate * item.quantity}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			<TouchableOpacity
				style={[styles.action, { marginTop: 10 }]}
				onPress={() => navigation.navigate('AddItem')}
			>
				<Icon style={styles.actionIcon} name='add' size={25} />
				<Text style={styles.actionText}>Add Item</Text>
			</TouchableOpacity>

			<TouchableOpacity activeOpacity={0.7} onPress={() => CreatePDF()}>
				<LinearGradient
					colors={['#08d4c4', '#01ab9d']}
					style={styles.nextButton}
				>
					<Text style={[styles.textSign, { color: '#fff' }]}>
						Generate PDF
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	)
}

export default NewInvoiceScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0'
	},
	header: {
		paddingLeft: 20,
		marginBottom: 10
	},
	action: {
		backgroundColor: '#fff',
		height: 50,
		paddingHorizontal: 20,
		alignItems: 'center',
		flexDirection: 'row'
	},
	actionIcon: {
		color: '#075E54',
		marginRight: 20
	},
	actionText: {
		color: '#075E54'
	},
	listItem: {
		backgroundColor: '#fff',
		height: 100,
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: '#c9c9c9'
	},
	listItemName: {
		color: '#000'
	},
	listItemDesc: {
		color: '#6e6e6e',
		marginBottom: 8
	},
	listItemNumbersWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	listItemNumbers: {
		color: '#6e6e6e'
	},
	nextButton: {
		marginTop: 30,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#009387',
		borderWidth: 1,
		marginHorizontal: 20
	}
})
