import React, { useState, useContext } from 'react'
import {
	View,
	Text,
	Button,
	StyleSheet,
	Platform,
	TextInput,
	TouchableOpacity,
	StatusBar,
	Alert
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../components/context'
import { useTheme } from '@react-navigation/native'
import Users from '../model/users'

const SignInScreen = ({ navigation }) => {
	const [data, setData] = useState({
		userName: '',
		password: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true
	})

	const { signIn } = useContext(AuthContext)
	const { colors } = useTheme()

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				userName: val,
				check_textInputChange: true,
				isValidUser: true
			})
		} else {
			setData({
				...data,
				userName: val,
				check_textInputChange: false,
				isValidUser: false
			})
		}
	}

	const handlePasswordChange = (val) => {
		if (val.trim().length >= 8) {
			setData({
				...data,
				password: val,
				isValidPassword: true
			})
		} else {
			setData({
				...data,
				isValidPassword: false
			})
		}
	}

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry
		})
	}

	const handleValidUser = (val) => {
		if (val.trim().length >= 4) {
			console.log('true')
			setData({
				...data,
				isValidUser: true
			})
		} else {
			setData({
				...data,
				isValidUser: false
			})
		}
	}

	const handleLogin = (username, pwd) => {
		const foundUser = Users.filter((item) => {
			return username == item.userName && pwd == item.password
		})

		console.log(foundUser)

		if (data.userName.length == 0 || data.password.length == 0) {
			Alert.alert(
				'Wrong Input!',
				'The username or password cannot be empty',
				[{ text: 'Okay' }]
			)
			return
		}

		if (foundUser.length == 0) {
			Alert.alert(
				'Invalid user!',
				'The username or password is incorrect',
				[{ text: 'Okay' }]
			)
			return
		}

		signIn(foundUser)
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
					Username
				</Text>
				<View style={styles.action}>
					<FontAwesome name='user-o' color={colors.text} size={20} />
					<TextInput
						placeholder='Your Username'
						placeholderTextColor='#666666'
						style={[styles.textInput, { color: colors.text }]}
						autoCapitalize='none'
						onChangeText={(val) => textInputChange(val)}
						onEndEditing={(e) =>
							handleValidUser(e.nativeEvent.text)
						}
					/>
					{/* {data.check_textInputChange ? ( */}
					{data.isValidUser && (
						<Animatable.View animation='bounceIn'>
							<Feather
								name='check-circle'
								color='green'
								size={20}
							/>
						</Animatable.View>
					)}
				</View>
				{data.isValidUser || (
					<Animatable.View animation='bounceInLeft' duration={500}>
						<Text style={styles.errorMsg}>
							Username must be at least 4 characters long
						</Text>
					</Animatable.View>
				)}

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
						style={[styles.textInput, { color: colors.text }]}
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
				{data.isValidPassword || (
					<Animatable.View animation='bounceInLeft' duration={500}>
						<Text style={styles.errorMsg}>
							Password must be at least 6 characters long
						</Text>
					</Animatable.View>
				)}

				<TouchableOpacity>
					<Text style={{ color: '#075E54', marginTop: 15 }}>
						Forgot password?
					</Text>
				</TouchableOpacity>

				<View style={styles.button}>
					<TouchableOpacity
						style={styles.signIn}
						onPress={() =>
							handleLogin(data.userName, data.password)
						}
					>
						<LinearGradient
							colors={['#08d4c4', '#01ab9d']}
							style={styles.signIn}
						>
							<Text style={[styles.textSign, { color: '#fff' }]}>
								Sign In
							</Text>
						</LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('SignUpScreen')}
						style={[styles.signIn, { marginTop: 15 }]}
					>
						<Text style={[styles.textSign, { color: '#075E54' }]}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	)
}

export default SignInScreen

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
		borderWidth: 1
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold'
	}
})
