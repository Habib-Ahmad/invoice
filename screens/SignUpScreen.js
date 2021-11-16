import React, { useState } from 'react'
import {
	View,
	Text,
	Button,
	StyleSheet,
	Platform,
	TextInput,
	TouchableOpacity,
	StatusBar
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from '@react-navigation/native'

const SignUpScreen = ({ navigation }) => {
	const [data, setData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		check_textInputChange: false,
		secureTextEntry: true,
		confirm_secureTextEntry: true
	})

	const { colors } = useTheme()

	const textInputChange = (val) => {
		if (val.length != 0) {
			setData({
				...data,
				email: val,
				check_textInputChange: true
			})
		} else {
			setData({
				...data,
				email: val,
				check_textInputChange: false
			})
		}
	}

	const handlePasswordChange = (val) => {
		setData({
			...data,
			password: val
		})
	}

	const handleConfirmPasswordChange = (val) => {
		setData({
			...data,
			confirmPassword: val
		})
	}

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry
		})
	}

	const updateConfirmSecureTextEntry = () => {
		setData({
			...data,
			confirm_secureTextEntry: !data.confirm_secureTextEntry
		})
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#075E54' barStyle='light-content' />
			<View style={styles.header}>
				<Text style={styles.textHeader}>Welcome!</Text>
			</View>
			<Animatable.View
				animation='fadeInUpBig'
				style={[styles.footer, { backgroundColor: colors.background }]}
			>
				<Text style={[styles.textFooter, { color: colors.text }]}>
					Email
				</Text>
				<View style={styles.action}>
					<FontAwesome name='user-o' color={colors.text} size={20} />
					<TextInput
						placeholder='Your Email'
						placeholderTextColor='#666666'
						style={[styles.textInput, { color: colors.text }]}
						autoCapitalize='none'
						onChangeText={(val) => textInputChange(val)}
					/>
					{data.check_textInputChange ? (
						<Animatable.View animation='bounceIn'>
							<Feather
								name='check-circle'
								color='green'
								size={20}
							/>
						</Animatable.View>
					) : null}
				</View>

				<Text
					style={[
						styles.textFooter,
						{ color: colors.text, marginTop: 35 }
					]}
				>
					Password
				</Text>
				<View style={styles.action}>
					<Feather name='lock' color={colors.text} size={20} />
					<TextInput
						placeholder='Password'
						placeholderTextColor='#666666'
						secureTextEntry={data.secureTextEntry}
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={(val) => handlePasswordChange(val)}
					/>
					<TouchableOpacity onPress={updateSecureTextEntry}>
						{data.secureTextEntry ? (
							<Feather name='eye-off' color='grey' size={20} />
						) : (
							<Feather name='eye' color='grey' size={20} />
						)}
					</TouchableOpacity>
				</View>

				<Text
					style={[
						styles.textFooter,
						{ color: colors.text, marginTop: 35 }
					]}
				>
					Confirm Password
				</Text>
				<View style={styles.action}>
					<Feather name='lock' color={colors.text} size={20} />
					<TextInput
						placeholder='Confirm Password'
						placeholderTextColor='#666666'
						secureTextEntry={data.confirm_secureTextEntry}
						style={styles.textInput}
						autoCapitalize='none'
						onChangeText={(val) => handleConfirmPasswordChange(val)}
					/>
					<TouchableOpacity onPress={updateConfirmSecureTextEntry}>
						{data.confirm_secureTextEntry ? (
							<Feather name='eye-off' color='grey' size={20} />
						) : (
							<Feather name='eye' color='grey' size={20} />
						)}
					</TouchableOpacity>
				</View>

				<View style={styles.button}>
					<LinearGradient
						colors={['#08d4c4', '#01ab9d']}
						style={styles.signIn}
					>
						<Text style={[styles.textSign, { color: '#fff' }]}>
							Sign Up
						</Text>
					</LinearGradient>

					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.signIn}
					>
						<Text style={[styles.textSign, { color: '#075E54' }]}>
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	)
}

export default SignUpScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#075E54'
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 50
	},
	footer: {
		flex: 3,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	textHeader: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30
	},
	textFooter: {
		color: '#05375a',
		fontSize: 18
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a'
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14
	},
	button: {
		alignItems: 'center',
		marginTop: 50
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#075E54',
		borderWidth: 1,
		marginTop: 15
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold'
	}
})