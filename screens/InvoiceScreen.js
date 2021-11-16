import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	StatusBar,
	Platform,
	ScrollView,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

const InvoiceScreen = ({ navigation }) => {
	const [invoice, setInvoice] = useState([
		{
			title: '',
			path: '',
			client: {},
			items: [],
			date: '',
		},
	])

	const GetInvoices = async () => {
		const invoiceListObject = await AsyncStorage.getItem('invoices')
		const invoiceList = JSON.parse(invoiceListObject)
		invoiceList && setInvoice(invoiceList)
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			GetInvoices()
		})
		return unsubscribe
	}, [navigation])

	const Clear = async () => {
		await AsyncStorage.removeItem('invoices')
		await AsyncStorage.removeItem('clients')
	}

	const { colors } = useTheme()
	const theme = useTheme()

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: colors.background,
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
		invoices: {
			paddingTop: 40,
		},
		invoice: {
			flexDirection: 'row',
			backgroundColor: '#fff',
			height: 70,
			marginBottom: 30,
			alignItems: 'center',
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
		},
		invoiceTitle: {
			marginLeft: 20,
			fontSize: 16,
		},
		invoiceDate: {
			fontSize: 12,
			marginLeft: 20,
			color: '#636363',
		},
		newInvoiceBtn: {
			width: 60,
			height: 60,
			borderRadius: 60,
			position: 'absolute',
			bottom: 50,
			right: 50,
			backgroundColor: '#009387',
			alignItems: 'center',
			justifyContent: 'center',
		},
		newInvoiceBtnIcon: {
			color: '#fff',
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Invoices</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.invoices}>
					{invoice[0].title != '' &&
						invoice.reverse().map((item, idx) => (
							<TouchableOpacity
								activeOpacity={0.8}
								key={idx}
								style={styles.invoice}
								onPress={() => {
									console.log(item)
								}}
							>
								<View>
									<FontAwesome
										name='file-pdf-o'
										size={25}
										color='red'
									/>
								</View>
								<View>
									<Text style={styles.invoiceTitle}>
										{item.title}
									</Text>
									<Text style={styles.invoiceDate}>
										{item.date}
									</Text>
								</View>
							</TouchableOpacity>
						))}
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => navigation.navigate('NewInvoice')}
				// onPress={() => Clear()}
				style={styles.newInvoiceBtn}
			>
				<AntDesign
					style={styles.newInvoiceBtnIcon}
					name='plus'
					size={40}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default InvoiceScreen
