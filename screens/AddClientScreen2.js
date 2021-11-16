import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	StatusBar,
	Platform,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddClientScreen2 = ({ navigation }) => {
	const [validation, setValidation] = useState({
		isValidName: true,
		isExistingName: false,
		isValidMobile: true,
		isValidEmail: true,
	})

	const [data, setData] = useState({
		name: '',
		mobile: '',
		email: '',
	})

	const { colors } = useTheme()
	const theme = useTheme()

	const onChangeText = (val, id) => {
		setData({
			...data,
			[id]: val,
		})
	}

	const HandleSave = async () => {
		const clientListObject = await AsyncStorage.getItem('clients')
		const clientList = JSON.parse(clientListObject)
		let clientNameList = []
		let exisitingName = false

		clientList && clientList.map((item) => clientNameList.push(item.name))
		if (clientNameList.indexOf(data.name) !== -1) {
			exisitingName = true
		} else {
			exisitingName = false
		}

		if (
			data.name.length > 0 &&
			data.mobile.length > 0 &&
			data.email.length > 0 &&
			exisitingName === false
		) {
			setValidation({
				...validation,
				isValidName: true,
				isExistingName: false,
				isValidMobile: true,
				isValidEmail: true,
			})

			let clientList = []
			const clients = await AsyncStorage.getItem('clients')

			if (JSON.parse(clients) == null) {
				await AsyncStorage.setItem(
					'clients',
					JSON.stringify(clientList)
				)
			} else {
				clientList = JSON.parse(clients)
			}

			clientList.push(data)
			await AsyncStorage.setItem('clients', JSON.stringify(clientList))
			navigation.navigate('Clients2')
		} else {
			let nameStatus = validation.isValidName
			let existingNameStatus = validation.isExistingName
			let mobileStatus = validation.isValidMobile
			let emailStatus = validation.isValidEmail

			if (data.name.length < 1) {
				nameStatus = false
			}
			if (exisitingName === true) {
				existingNameStatus = true
			}
			if (data.mobile.length < 1) {
				mobileStatus = false
			}
			if (data.email.length < 1) {
				emailStatus = false
			}
			setValidation({
				...validation,
				isValidName: nameStatus,
				isExistingName: existingNameStatus,
				isValidMobile: mobileStatus,
				isValidEmail: emailStatus,
			})
		}
	}

	const handleValidation = (val, id) => {
		if (val.trim().length > 0) {
			setValidation({
				...validation,
				[id]: true,
			})
		}
	}

	useEffect(() => {
		setValidation({
			...validation,
			isValidName: true,
			isExistingName: false,
			isValidMobile: true,
			isValidEmail: true,
		})
	}, [])

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
		inputHeader: {
			color: '#05375a',
			fontSize: 16,
			marginLeft: 10,
			marginTop: 30,
			// marginTop: Platform.OS === 'ios' ? 0 : -12,
		},
		inputWrapper: {
			flexDirection: 'row',
			borderBottomWidth: 1,
			borderBottomColor: '#d6d6d6',
			paddingBottom: 5,
			marginHorizontal: 10,
		},
		input: {
			flex: 1,
			paddingLeft: 10,
			color: '#05375a',
			fontSize: 18,
		},
		signIn: {
			marginTop: 30,
			height: 50,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 10,
			borderColor: '#075E54',
			borderWidth: 1,
			marginHorizontal: 20,
		},
		errorMsg: {
			color: '#FF0000',
			fontSize: 14,
			marginLeft: 20,
			marginBottom: 5,
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => navigation.navigate('Clients2')}
				>
					<Icon
						style={{ marginRight: 15 }}
						name='close-outline'
						color='#075E54'
						size={25}
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Add Client</Text>
			</View>
			{data.name ? (
				<Animatable.Text
					animation='fadeIn'
					duration={500}
					style={styles.inputHeader}
				>
					Client name
				</Animatable.Text>
			) : (
				<View style={{ marginTop: 50 }}></View>
			)}
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder='Client name'
					value={data.name}
					onChangeText={(val) => onChangeText(val, 'name')}
					onEndEditing={(e) =>
						handleValidation(e.nativeEvent.text, 'isValidName')
					}
				/>
			</View>
			{validation.isValidName || (
				<Text style={styles.errorMsg}>Client name cannot be empty</Text>
			)}
			{validation.isExistingName && (
				<Text style={styles.errorMsg}>Client already exists!</Text>
			)}

			{data.mobile ? (
				<Animatable.Text
					animation='fadeIn'
					duration={500}
					style={styles.inputHeader}
				>
					Mobile
				</Animatable.Text>
			) : (
				<View style={{ marginTop: 50 }}></View>
			)}
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder='Mobile'
					value={data.mobile}
					onChangeText={(val) => onChangeText(val, 'mobile')}
				/>
			</View>

			{data.email ? (
				<Animatable.Text
					animation='fadeIn'
					duration={500}
					style={styles.inputHeader}
				>
					E-mail
				</Animatable.Text>
			) : (
				<View style={{ marginTop: 50 }}></View>
			)}
			<View style={styles.inputWrapper}>
				<TextInput
					autoCapitalize='none'
					style={styles.input}
					placeholder='Email'
					value={data.email}
					onChangeText={(val) => onChangeText(val, 'email')}
				/>
			</View>

			<TouchableOpacity activeOpacity={0.7} onPress={() => HandleSave()}>
				<LinearGradient
					colors={['#08d4c4', '#01ab9d']}
					style={styles.signIn}
				>
					<Text style={[styles.textSign, { color: '#fff' }]}>
						Save
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	)
}

export default AddClientScreen2
