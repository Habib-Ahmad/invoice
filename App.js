import React, { useState, useEffect, useMemo, useReducer } from 'react'
import {
	StyleSheet,
	View,
	ActivityIndicator,
	StatusBar,
	Alert
} from 'react-native'
import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
	DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import {
	Provider as PaperProvider,
	DefaultTheme as PaperDefaultTheme,
	DarkTheme as PaperDarkTheme
} from 'react-native-paper'
import RootStackScreen from './screens/RootStackScreen'
import MainStackScreen from './screens/MainStackScreen'
import { AuthContext } from './components/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

export default function App() {
	const [isDarkTheme, setIsDarkTheme] = useState(false)

	const initialLoginState = {
		isLoading: true,
		userName: null,
		userToken: null
	}

	const CustomDefaultTheme = {
		...NavigationDefaultTheme,
		...PaperDefaultTheme,
		colors: {
			...NavigationDefaultTheme.colors,
			...PaperDefaultTheme.colors,
			background: '#f0f0f0',
			text: '#333333',
			background2: '#fff',
			text2: '#009387'
		}
	}

	const CustomDarkTheme = {
		...NavigationDarkTheme,
		...PaperDarkTheme,
		colors: {
			...NavigationDarkTheme.colors,
			...PaperDarkTheme.colors,
			background: '#333333',
			text: '#ffffff',
			background2: '#075E54',
			text2: '#075E54'
		}
	}

	const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					userToken: action.token,
					isLoading: false
				}
			case 'LOGIN':
				return {
					...prevState,
					userName: action.id,
					userToken: action.token,
					isLoading: false
				}
			case 'LOGOUT':
				return {
					...prevState,
					userName: null,
					userToken: null,
					isLoading: false
				}
			case 'REGISTER':
				return {
					...prevState,
					userName: action.id,
					userToken: action.token,
					isLoading: false
				}
		}
	}

	const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

	const authContext = useMemo(
		() => ({
			signIn: async (email, password) => {
				auth()
					.signInWithEmailAndPassword(email, password)
					.then(async (userCredentials) => {
						dispatch({
							type: 'LOGIN',
							id: userCredentials.user.uid,
							token: userCredentials.user.uid
						})
						await AsyncStorage.setItem(
							'userToken',
							userCredentials.user.uid
						)
					})
					.catch((error) => {
						if (error.code === 'auth/invalid-email') {
							Alert.alert('Sign in error', 'Invalid E-mail', [
								{ text: 'Okay' }
							])
						}

						if (error.code === 'auth/user-disabled') {
							Alert.alert(
								'Sign in error',
								'This user has been disabled',
								[{ text: 'Okay' }]
							)
						}

						if (error.code === 'auth/user-not-found') {
							Alert.alert('Sign in error', 'User not found', [
								{ text: 'Okay' }
							])
						}

						if (error.code === 'auth/wrong-password') {
							Alert.alert('Sign in error', 'Incorrect password', [
								{ text: 'Okay' }
							])
						}

						if (error.code === 'auth/too-many-requests') {
							Alert.alert(
								'Sign in error',
								'Login requests blocked due to too many icorrect password attempts, try agai later',
								[{ text: 'Okay' }]
							)
						}
						console.log('signIn error:', error.message)
					})
			},
			signOut: async () => {
				auth()
					.signOut()
					.then(async () => {
						console.log('User signed out!')
						dispatch({ type: 'LOGOUT' })
						await AsyncStorage.removeItem('userToken')
					})
			},
			signUp: (email, password) => {
				auth()
					.createUserWithEmailAndPassword(email, password)
					.then(async (userCredentials) => {
						console.log('User account created & signed in!')
						dispatch({
							type: 'REGISTER',
							id: userCredentials.user.uid,
							token: userCredentials.user.uid
						})
						await AsyncStorage.setItem(
							'userToken',
							userCredentials.user.uid
						)
					})
					.catch((error) => {
						if (error.code === 'auth/email-already-in-use') {
							console.log('That email address is already in use!')
							Alert.alert(
								'Sign up error',
								'E-mail address already in use',
								[{ text: 'Okay' }]
							)
						}

						if (error.code === 'auth/invalid-email') {
							Alert.alert('Sign up error', 'Invalid E-mail', [
								{ text: 'Okay' }
							])
						}

						if (error.code === 'auth/operation-not-allowed') {
							Alert.alert(
								'Sign up error',
								'Operation not allowed',
								[{ text: 'Okay' }]
							)
						}

						if (error.code === 'auth/weak-password') {
							Alert.alert(
								'Sign up error',
								'Password is too weak',
								[{ text: 'Okay' }]
							)
						}

						console.log('signUp error:', error.message)
					})
			},
			toggleTheme: () => {
				setIsDarkTheme((isDarkTheme) => !isDarkTheme)
			}
		}),
		[]
	)

	useEffect(() => {
		setTimeout(async () => {
			let userToken
			userToken = null
			try {
				userToken = await AsyncStorage.getItem('userToken')
			} catch (error) {
				console.log(error.message)
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
		}, 1000)
	}, [])

	if (loginState.isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size='large' color='#075E54' />
			</View>
		)
	}

	return (
		<PaperProvider style={styles.container} theme={theme}>
			<AuthContext.Provider value={authContext}>
				<StatusBar
					barStyle={theme.dark ? 'light-content' : 'dark-content'}
					backgroundColor='#fff'
					translucent
				/>
				<NavigationContainer theme={theme}>
					{loginState.userToken != null ? (
						<MainStackScreen />
					) : (
						<RootStackScreen />
					)}
				</NavigationContainer>
			</AuthContext.Provider>
		</PaperProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
