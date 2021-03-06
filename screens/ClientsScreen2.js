import React, { useState, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	StatusBar,
	Platform,
	ScrollView
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ClientsScreen2 = ({ navigation }) => {
	const [clients, setClients] = useState([])
	const [route, setRoute] = useState('')

	const { colors } = useTheme()
	const theme = useTheme()

	const GetClientList = async () => {
		const clientList = await AsyncStorage.getItem('clients')
		clientList && setClients(JSON.parse(clientList))
		const routeName = await AsyncStorage.getItem('previousScreen')
		setRoute(JSON.parse(routeName))
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			GetClientList()
		})
		return unsubscribe
	}, [navigation])

	const AddClient = async (client) => {
		if (route === 'NewInvoice') {
			await AsyncStorage.setItem(
				'newInvoiceClient',
				JSON.stringify(client)
			)
			navigation.navigate('NewInvoice')
		} else if (route === 'EditInvoice') {
			await AsyncStorage.setItem(
				'editInvoiceClient',
				JSON.stringify(client)
			)
			navigation.goBack()
		}
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
		clients: {
			paddingTop: 40
		},
		client: {
			flexDirection: 'row',
			backgroundColor: '#fff',
			height: 70,
			marginBottom: 30,
			alignItems: 'center',
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9'
		},
		logoWrapper: {
			backgroundColor: 'pink',
			width: 40,
			height: 40,
			borderRadius: 40,
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: 20
		},
		logo: {
			fontSize: 20
		},
		detailsWrapper: {},
		name: {
			fontSize: 14
		},
		email: {
			color: '#636363',
			fontSize: 12
		},
		newInvoiceBtn: {
			width: 60,
			height: 60,
			borderRadius: 60,
			position: 'absolute',
			right: 50,
			bottom: 50,
			backgroundColor: '#009387',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 10
		},
		newInvoiceBtnIcon: {
			color: '#fff'
		}
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.9}
					// onPress={() => navigation.navigate('NewInvoice')}
					onPress={() => navigation.goBack()}
				>
					<IonIcon
						style={{ marginRight: 15 }}
						name='close-outline'
						color='#075E54'
						size={25}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Clients</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.clients}>
					{clients &&
						clients.map((item, idx) => (
							<TouchableOpacity
								key={idx}
								style={styles.client}
								onPress={() => AddClient(item)}
							>
								<View style={styles.logoWrapper}>
									<Text style={styles.logo}>
										{item.name && item.name.charAt(0)}
									</Text>
								</View>
								<View style={styles.detailsWrapper}>
									<Text style={styles.name}>{item.name}</Text>
									<Text style={styles.email}>
										{item.email}
									</Text>
								</View>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => navigation.navigate('AddClient2')}
				style={styles.newInvoiceBtn}
			>
				<Icon style={styles.newInvoiceBtnIcon} name='plus' size={40} />
			</TouchableOpacity>
		</View>
	)
}

export default ClientsScreen2
