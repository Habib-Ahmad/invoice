import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ClientDetailsScreen = () => {
	const [data, setData] = useState({
		name: '',
		mobile: '',
		email: ''
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
	})

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background
		},
		itemWrapper: {
			backgroundColor: colors.background2,
			height: 70,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#d6d6d6',
			justifyContent: 'center'
		},
		itemText1: {
			color: '#636363'
		},
		itemText2: {}
	})

	return (
		<View style={styles.container}>
			<View style={styles.itemWrapper}>
				<Text style={styles.itemText1}>Mobile</Text>
				<Text style={styles.itemText2}>{data.mobile}</Text>
			</View>
			<View style={styles.itemWrapper}>
				<Text style={styles.itemText1}>E-mail</Text>
				<Text style={styles.itemText2}>{data.email}</Text>
			</View>
		</View>
	)
}

export default ClientDetailsScreen
