import React, { useState, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	StatusBar,
	Platform,
	ScrollView,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ClientsScreen = ({ navigation }) => {
	const [clients, setClients] = useState([])

	const { colors } = useTheme()
	const theme = useTheme()

	const GetClientList = async () => {
		const clientList = await AsyncStorage.getItem('clients')
		clientList && setClients(JSON.parse(clientList))
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			GetClientList()
		})
		return unsubscribe
	}, [navigation])

	const ViewClient = async (name) => {
		await AsyncStorage.setItem('viewClientName', name)
		navigation.navigate('ViewClient')
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
			justifyContent: 'space-between',
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
		clients: {
			paddingTop: 40,
		},
		client: {
			flexDirection: 'row',
			backgroundColor: '#fff',
			height: 70,
			marginBottom: 30,
			alignItems: 'center',
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
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
			fontSize: 14,
		},
		email: {
			color: '#636363',
			fontSize: 12,
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
			zIndex: 10,
		},
		newInvoiceBtnIcon: {
			color: '#fff',
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Clients</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.clients}>
					{clients &&
						clients.map((item, idx) => (
							<TouchableOpacity
								activeOpacity={0.8}
								key={idx}
								style={styles.client}
								onPress={() => ViewClient(item.name)}
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
				onPress={() => navigation.navigate('AddClient')}
				style={styles.newInvoiceBtn}
			>
				<Icon style={styles.newInvoiceBtnIcon} name='plus' size={40} />
			</TouchableOpacity>
		</View>
	)
}

export default ClientsScreen
