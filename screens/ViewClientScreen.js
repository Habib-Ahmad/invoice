import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Platform,
	TouchableOpacity,
	Alert
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ClientActivityScreen from './ClientActivityScreen'
import ClientDetailsScreen from './ClientDetailsScreen'
import RNFS from 'react-native-fs'

const Tab = createMaterialTopTabNavigator()

const ClientTabs = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Invoices' component={ClientActivityScreen} />
			<Tab.Screen name='Details' component={ClientDetailsScreen} />
		</Tab.Navigator>
	)
}

const ViewClientScreen = ({ navigation }) => {
	const [data, setData] = useState({
		name: '',
		mobile: '',
		email: '',
		invoices: []
	})

	const { colors } = useTheme()
	const theme = useTheme()

	const GetClient = async () => {
		const viewClientName = await AsyncStorage.getItem('viewClientName')

		const clientsObject = await AsyncStorage.getItem('clients')
		const clients = JSON.parse(clientsObject)

		let viewClient

		clients.map(
			(item) => item.name === viewClientName && (viewClient = item)
		)

		setData(viewClient)
	}

	useEffect(() => {
		GetClient()
	}, [])

	const EditClient = async (name) => {
		await AsyncStorage.setItem('editClientName', name)
		navigation.navigate('EditClient')
	}

	const DeleteClient = async (name) => {
		Alert.alert(
			'Confirm Delete',
			'Are you sure you want to delete this client?',
			[
				{
					text: 'Cancel'
				},
				{
					text: 'OK',
					onPress: async () => {
						// delete client invoices
						let idArray = []
						const invoiceListObject = await AsyncStorage.getItem(
							'invoices'
						)
						if (invoiceListObject !== null) {
							const invoiceList = JSON.parse(invoiceListObject)
							data.invoices.map((invoice) => {
								idArray.push(invoice.id)
							})
							const newInvoiceList = invoiceList.filter(
								(invoice) => !idArray.includes(invoice.id)
							)

							await AsyncStorage.setItem(
								'invoices',
								JSON.stringify(newInvoiceList)
							)

							// delete client invoices from phone
							const anotherInvoiceList = invoiceList.filter(
								(invoice) => idArray.includes(invoice.id)
							)
							anotherInvoiceList.map((invoice) => {
								RNFS.unlink(invoice.path)
									.then(() => {
										console.log(
											'FILE DELETED',
											invoice.path
										)
									})
									// `unlink` will throw an error, if the item to unlink does not exist
									.catch((err) => {
										console.log(err.message)
									})
							})
						}

						// delete client
						let clientList = []
						let index

						const clientListObject = await AsyncStorage.getItem(
							'clients'
						)
						clientList = JSON.parse(clientListObject)
						clientList.map(
							(item) =>
								item.name === name &&
								(index = clientList.indexOf(item))
						)
						clientList.splice(index, 1)

						await AsyncStorage.setItem(
							'clients',
							JSON.stringify(clientList)
						)
						navigation.navigate('Clients')
					}
				}
			]
		)
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: colors.background,
			position: 'relative'
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
			zIndex: 5
		},
		headerText: {
			fontSize: 22,
			color: colors.text
		},
		actionsWrapper: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
			backgroundColor: colors.background2,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9'
		},
		action: {
			alignItems: 'center',
			width: 50
		}
	})
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => navigation.navigate('Clients')}
				>
					<AntDesign
						style={{ marginRight: 15 }}
						name='arrowleft'
						color='#075E54'
						size={25}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>{data.name}</Text>
			</View>
			<View style={styles.actionsWrapper}>
				<TouchableOpacity
					style={styles.action}
					onPress={() => EditClient(data.name)}
				>
					<AntDesign name='edit' color='#075E54' size={25} />
					<Text>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.action}
					onPress={() => DeleteClient(data.name)}
				>
					<AntDesign name='deleteuser' color='red' size={25} />
					<Text>Delete</Text>
				</TouchableOpacity>
			</View>
			<ClientTabs />
		</View>
	)
}

export default ViewClientScreen
