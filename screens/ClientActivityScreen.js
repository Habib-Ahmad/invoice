import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ClientActivityScreen = () => {
	const [data, setData] = useState({
		name: '',
		mobile: '',
		email: '',
		invoices: [],
	})

	const GetActivity = async () => {
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
		GetActivity()
	}, [])

	const styles = StyleSheet.create({
		container: {
			flex: 1,
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
	})

	return (
		<View>
			<Text>Activity</Text>
			{console.log(data.invoices)}
			<View style={styles.invoices}>
				{data.invoices.length > 0 &&
					data.invoices.map((item, idx) => (
						<TouchableOpacity
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
		</View>
	)
}

export default ClientActivityScreen
