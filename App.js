import React, { useState, useEffect, useMemo, useReducer } from 'react'
import {
	StyleSheet,
	View,
	ActivityIndicator,
	Platform,
	StatusBar,
	SafeAreaView
} from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'
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
import DrawerContent from './screens/DrawerContent'
import MainTabScreen from './screens/MainTabScreen'
import MainStackScreen from './screens/MainStackScreen'
import SupportScreen from './screens/SupportScreen'
import SettingsScreen from './screens/SettingsScreen'
import BookmarkScreen from './screens/BookmarkScreen'

import { AuthContext } from './components/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Drawer = createDrawerNavigator()

export default function App() {
	const [itemList, setItemList] = useState([])
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
			signIn: async (foundUser) => {
				const userToken = String(foundUser[0].userToken)
				const userName = foundUser[0].userName

				try {
					await AsyncStorage.setItem('userToken', userToken)
				} catch (error) {
					console.log(error.message)
				}
				dispatch({ type: 'LOGIN', id: userName, token: userToken })
			},
			signOut: async () => {
				try {
					await AsyncStorage.removeItem('userToken')
				} catch (error) {
					console.log(error.message)
				}
				dispatch({ type: 'LOGOUT' })
			},
			signUp: () => {
				setUserToken('asdf')
				setIsLoading(false)
			},
			toggleTheme: () => {
				setIsDarkTheme((isDarkTheme) => !isDarkTheme)
			},
			itemList,
			setItemList
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
						// <Drawer.Navigator
						// 	drawerContent={(props) => (
						// 		<DrawerContent {...props} />
						// 	)}
						// 	initialRouteName='Home'
						// 	screenOptions={{ headerShown: false }}
						// >
						// 	<Drawer.Screen
						// 		name='Home'
						// 		component={MainStackScreen}
						// 	/>
						// </Drawer.Navigator>
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
		justifyContent: 'center',
	}
})
