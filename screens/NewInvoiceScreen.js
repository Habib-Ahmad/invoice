import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	Platform,
	ScrollView,
	TextInput,
	Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@react-navigation/native'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import PDFParams from '../components/PDFParams'

const NewInvoiceScreen = ({ navigation }) => {
	const [subTotal, setSubTotal] = useState(0)
	const [total, setTotal] = useState(0)
	const [discount, setDiscount] = useState(0)
	const [discountTotal, setDiscountTotal] = useState(0)

	const [invoice, setInvoice] = useState({
		title: 'Invoice Title',
		path: '',
		client: {},
		items: [],
		date: '',
	})

	const [isValidClient, setIsValidClient] = useState(true)

	const { colors } = useTheme()
	const theme = useTheme()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			GetStuff()
		})
		return unsubscribe
	}, [navigation])

	const GetStuff = async () => {
		// Name
		let title = ''

		const invoiceTitle = await AsyncStorage.getItem('newInvoiceTitle')
		if (invoiceTitle === null) {
			await AsyncStorage.setItem('newInvoiceTitle', title)
			title = 'Invoice Title'
		} else {
			title = invoiceTitle
		}

		// Items
		let itemList = []

		const itemListObject = await AsyncStorage.getItem('newInvoiceItems')
		const itemListt = JSON.parse(itemListObject)
		if (itemListt === null) {
			await AsyncStorage.setItem(
				'newInvoiceItems',
				JSON.stringify(itemList)
			)
		} else {
			itemList = itemListt
		}

		// Client
		let addedClient = {}

		const addedClientObject = await AsyncStorage.getItem('newInvoiceClient')
		const addedClientt = JSON.parse(addedClientObject)
		if (addedClientt === null) {
			await AsyncStorage.setItem(
				'newInvoiceClient',
				JSON.stringify(addedClient)
			)
		} else {
			if (addedClientt.invoices) {
				addedClient = addedClientt
			} else {
				delete addedClientt.invoices
				addedClient = addedClientt
			}
			setIsValidClient(true)
		}

		let total = 0

		itemList && itemList.map((item) => (total += item.rate * item.quantity))
		setInvoice({
			...invoice,
			title: title,
			items: itemList,
			client: addedClient,
		})
		setSubTotal(total)
	}

	const Close = () => {
		Alert.alert('Discard changes?', 'All changes will be lost', [
			{
				text: 'Cancel',
			},
			{
				text: 'Discard Changes',
				onPress: async () => {
					await AsyncStorage.removeItem('newInvoiceTitle')
					await AsyncStorage.removeItem('newInvoiceClient')
					await AsyncStorage.removeItem('newInvoiceItems')
					navigation.navigate('Invoice')
				},
			},
		])
	}

	const RemoveClient = async () => {
		await AsyncStorage.removeItem('newInvoiceClient')
		setInvoice({ ...invoice, client: {} })
	}

	const EditItem = async (name) => {
		await AsyncStorage.setItem('editItemName', name)
		navigation.navigate('EditItem')
	}

	const HandleTitleChange = async (val) => {
		setInvoice({ ...invoice, title: val })
		await AsyncStorage.setItem('newInvoiceTitle', val)
	}

	const onChangeDiscount = (val) => {
		setDiscount(val)

		let s = subTotal

		let newTotal = s * (val / 100)

		setDiscountTotal(Math.round(newTotal))
	}

	useEffect(() => {
		setTotal(subTotal - discountTotal)
	}, [subTotal, discountTotal])

	const OnEndEditing = (val) => {
		if (val > !0) {
			setDiscount(0)
		}
	}

	const AddDiscount = () => {
		setDiscount(10)

		let s = subTotal

		let newTotal = s * (10 / 100)

		setDiscountTotal(Math.round(newTotal))
	}

	const capSentence = (text) => {
		let wordsArray = text.toLowerCase().split(' ')

		let capsArray = wordsArray.map((word) => {
			return word.replace(word[0], word[0].toUpperCase())
		})

		return capsArray.join(' ')
	}

	const SetInvoiceStorage = async (fp) => {
		let invoiceList = []

		let invoiceListObject = await AsyncStorage.getItem('invoices')

		if (invoiceListObject === null) {
			await AsyncStorage.setItem('invoices', JSON.stringify(invoiceList))
		} else {
			invoiceList = JSON.parse(invoiceListObject)
		}

		let invoiceCopy = { ...invoice }
		invoiceCopy.path = fp

		const date = new Date()
		const [month, day, year] = [
			date.getMonth(),
			date.getDate(),
			date.getFullYear(),
		]

		invoiceCopy.date = `${year}-${month}-${day}`

		invoiceList.push(invoiceCopy)

		await AsyncStorage.setItem('invoices', JSON.stringify(invoiceList))

		// Add invoice to client
		let client
		let index
		const clientListObject = await AsyncStorage.getItem('clients')
		const clientList = JSON.parse(clientListObject)

		clientList.map((item) => {
			if (item.name === invoiceCopy.client.name) {
				index = clientList.indexOf(item)
				if (item.invoices) {
					item.invoices.push(invoiceCopy)
					// delete item.invoices
				} else {
					item.invoices = [invoiceCopy]
					// delete item.invoices
				}
				client = item
			}
		})

		clientList.splice(index, 1, client)
		console.log('clientList: ', clientList[0].invoices)
		await AsyncStorage.setItem('clients', JSON.stringify(clientList))

		Alert.alert(
			'PDF created!',
			'It has been saved in your document folder',
			[
				{
					text: 'Ok',
				},
			]
		)

		await AsyncStorage.removeItem('newInvoiceTitle')
		await AsyncStorage.removeItem('newInvoiceClient')
		await AsyncStorage.removeItem('newInvoiceItems')
		navigation.navigate('Invoice')
	}

	const CreatePDF = async () => {
		if (Object.keys(invoice.client).length < 1) {
			setIsValidClient(false)
		} else {
			let sum = 0

			if (invoice.items !== null) {
				invoice.items.map((item) => {
					sum += item.rate * item.quantity
				})
			}

			let name = capSentence(invoice.title)

			const params = PDFParams(
				invoice.items,
				sum,
				name.replace(/\s+/g, '')
			)

			let options = {
				html: params[0],
				fileName: params[1],
				directory: params[2],
			}

			await RNHTMLtoPDF.convert(options).then((value) => {
				setInvoice(
					{ ...invoice, path: value.filePath },
					SetInvoiceStorage(value.filePath)
				)
			})
		}
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: colors.background,
			position: 'relative',
		},
		scrollView: {
			// flex: 1
		},
		header: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.background2,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
			zIndex: 5,
		},
		headerText: {
			fontSize: 22,
			color: colors.text,
		},
		titleInput: {
			fontSize: 16,
			width: '100%',
			// borderBottomWidth: 0.3,
			// padding: 5
		},
		clientWrapper: {
			flexDirection: 'row',
			backgroundColor: '#fff',
			height: 70,
			marginBottom: 30,
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
		},
		client: {
			flexDirection: 'row',
		},
		logoWrapper: {
			backgroundColor: 'pink',
			width: 40,
			height: 40,
			borderRadius: 40,
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: 20,
		},
		logo: {
			fontSize: 20,
		},
		detailsWrapper: {},
		name: {
			fontSize: 16,
		},
		email: {
			color: '#5c5c5c',
			fontSize: 12,
		},
		actionHeader: {
			paddingLeft: 20,
			marginBottom: 10,
		},
		action: {
			backgroundColor: '#fff',
			height: 50,
			paddingHorizontal: 20,
			alignItems: 'center',
			flexDirection: 'row',
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
		},
		actionIcon: {
			color: '#075E54',
			marginRight: 20,
		},
		actionText: {
			color: '#075E54',
		},
		listItem: {
			backgroundColor: '#fff',
			height: 100,
			paddingHorizontal: 20,
			paddingVertical: 10,
			justifyContent: 'center',
			borderBottomWidth: 0.5,
			borderBottomColor: '#c9c9c9',
		},
		listItemName: {
			color: '#000',
		},
		listItemDesc: {
			color: '#6e6e6e',
			marginBottom: 8,
		},
		listItemNumbersWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		listItemNumbers: {
			color: '#6e6e6e',
		},
		inputWrapper: {
			width: '30%',
		},
		input: {
			color: '#05375a',
			fontSize: 15,
			borderWidth: 0.2,
			alignItems: 'center',
			padding: 3,
		},
		subTotalWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: '#fff',
			marginTop: 30,
			height: 60,
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
		},
		subTotalText1: {
			color: '#6e6e6e',
		},
		discountWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: '#fff',
			height: 80,
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
		},
		nextButtonWrapper: {
			position: 'absolute',
			bottom: 30,
			width: '100%',
			height: 50,
			backgroundColor: 'transparent',
			justifyContent: 'center',
		},
		nextButton: {
			height: 50,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			borderColor: '#009387',
			borderWidth: 1,
			marginHorizontal: 20,
		},
		errorMsg: {
			color: '#FF0000',
			fontSize: 14,
			marginLeft: 20,
			marginBottom: 5,
			marginTop: -30,
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.9} onPress={Close}>
					<Icon
						style={{ marginRight: 15 }}
						name='close-outline'
						color='#075E54'
						size={25}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>New Invoice</Text>
			</View>

			<ScrollView>
				<Text style={[styles.actionHeader, { marginTop: 30 }]}>
					Invoice title
				</Text>
				<View style={styles.action}>
					<TextInput
						style={styles.titleInput}
						onChangeText={(val) => HandleTitleChange(val)}
						onEndEditing={(e) => OnEndEditing(e.nativeEvent.text)}
						value={invoice.title}
					/>
				</View>

				<Text style={[styles.actionHeader, { marginTop: 30 }]}>
					Bill to
				</Text>
				{Object.keys(invoice.client).length > 0 && (
					<View style={styles.clientWrapper}>
						<View style={styles.client}>
							<View style={styles.logoWrapper}>
								<Text style={styles.logo}>
									{invoice.client.name &&
										invoice.client.name.charAt(0)}
								</Text>
							</View>
							<View style={styles.detailsWrapper}>
								<Text style={styles.name}>
									{invoice.client.name}
								</Text>
								<Text style={styles.email}>
									{invoice.client.email}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => RemoveClient()}
						>
							<Icon name='close-outline' size={20} />
						</TouchableOpacity>
					</View>
				)}
				{Object.keys(invoice.client).length < 1 && (
					<TouchableOpacity
						style={[styles.action, { marginBottom: 30 }]}
						onPress={() => navigation.navigate('Clients2')}
					>
						<Icon
							style={styles.actionIcon}
							name='ios-person-outline'
							size={25}
						/>
						<Text style={styles.actionText}>Add Client</Text>
					</TouchableOpacity>
				)}

				{isValidClient || (
					<Text style={styles.errorMsg}>Please select a client</Text>
				)}

				<Text style={styles.actionHeader}>Items</Text>
				{invoice.items &&
					invoice.items.map((item, idx) => (
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
									₦
									{item.rate
										.toString()
										.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											','
										)}{' '}
									x{' '}
									{item.quantity
										.toString()
										.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											','
										)}{' '}
								</Text>
								<Text style={styles.listItemNumbers}>
									₦
									{(item.rate * item.quantity)
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</Text>
							</View>
						</TouchableOpacity>
					))}

				<TouchableOpacity
					style={styles.action}
					onPress={() => navigation.navigate('AddItem')}
				>
					<Icon style={styles.actionIcon} name='add' size={25} />
					<Text style={styles.actionText}>Add Item</Text>
				</TouchableOpacity>

				<View style={styles.subTotalWrapper}>
					<Text style={styles.subTotalText1}>Subtotal</Text>
					<Text style={styles.subTotal}>
						₦
						{subTotal
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</Text>
				</View>

				{discount ? (
					<View style={[styles.discountWrapper]}>
						<View>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<TextInput
									style={styles.input}
									keyboardType='numeric'
									onChangeText={(val) =>
										onChangeDiscount(val)
									}
									onEndEditing={(e) =>
										OnEndEditing(e.nativeEvent.text)
									}
									value={discount.toString()}
								/>
								<Text style={{ marginLeft: 5, fontSize: 18 }}>
									%
								</Text>
							</View>
							<Text>Discount</Text>
						</View>
						<Text>
							₦
							{discountTotal
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</Text>
					</View>
				) : (
					<TouchableOpacity
						style={styles.action}
						onPress={() => AddDiscount()}
					>
						<Icon style={styles.actionIcon} name='add' size={25} />
						<Text style={styles.actionText}>Add discount</Text>
					</TouchableOpacity>
				)}

				<View
					style={[
						styles.subTotalWrapper,
						{ marginTop: 0, marginBottom: 100 },
					]}
				>
					<Text style={styles.subTotalText1}>Total</Text>
					<Text style={styles.subTotal}>
						₦
						{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</Text>
				</View>
			</ScrollView>

			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => CreatePDF()}
				style={styles.nextButtonWrapper}
			>
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
