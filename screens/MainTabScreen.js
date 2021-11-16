import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from './HomeScreen'
import InvoiceScreen from './InvoiceScreen'
import ClientsScreen from './ClientsScreen'
import ClientsScreen2 from './ClientsScreen2'
import NewInvoiceScreen from './NewInvoiceScreen'
import AddClientScreen from './AddClientScreen'
import AddClientScreen2 from './AddClientScreen2'
import AddItemScreen from './AddItemScreen'
import EditItemScreen from './EditItemScreen'
import { useTheme } from '@react-navigation/native'

const HomeStack = createNativeStackNavigator()
const ClientsStack = createNativeStackNavigator()
const InvoiceStack = createNativeStackNavigator()

const Tab = createMaterialBottomTabNavigator()

const HomeStackScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const theme = useTheme()

	return (
		<HomeStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.dark
						? colors.background2
						: colors.background
				},
				headerTintColor: colors.text,
				headerTintStyle: { fontWeight: 'bold' }
			}}
		>
			<HomeStack.Screen
				name='Home'
				component={HomeScreen}
				options={{
					title: 'Home',
					headerLeft: () => (
						<Icon.Button
							name='ios-menu'
							size={25}
							color={colors.text}
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.openDrawer()}
						/>
					)
				}}
			/>
		</HomeStack.Navigator>
	)
}

const ClientsStackScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const theme = useTheme()

	return (
		<ClientsStack.Navigator
			initialRouteName='Clients'
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.dark
						? colors.background2
						: colors.background
				},
				headerTintColor: '#000',
				headerTintStyle: { fontWeight: 'bold' }
			}}
		>
			<ClientsStack.Screen
				name='Clients'
				component={ClientsScreen}
				options={{
					title: 'Clients',
					headerLeft: () => (
						<Icon.Button
							name='ios-menu'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.openDrawer()}
						/>
					)
				}}
			/>
			<InvoiceStack.Screen
				name='AddClient'
				component={AddClientScreen}
				options={{
					title: 'Add Client',
					headerLeft: () => (
						<Icon.Button
							name='close'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.navigate('Clients')}
						/>
					)
				}}
			/>
		</ClientsStack.Navigator>
	)
}

const InvoiceStackScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const theme = useTheme()

	return (
		<InvoiceStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.dark
						? colors.background2
						: colors.background
				},
				headerTintColor: '#000',
				headerTintStyle: { fontWeight: 'bold' }
			}}
		>
			<InvoiceStack.Screen
				name='Invoice'
				component={InvoiceScreen}
				options={{
					title: 'Invoices',
					headerLeft: () => (
						<Icon.Button
							name='ios-menu'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.openDrawer()}
						/>
					)
				}}
			/>
			<InvoiceStack.Screen
				name='NewInvoice'
				component={NewInvoiceScreen}
				options={{
					title: 'New Invoice',
					headerLeft: () => (
						<Icon.Button
							name='close'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.navigate('Invoice')}
						/>
					)
				}}
			/>
			<InvoiceStack.Screen
				name='Clients2'
				component={ClientsScreen2}
				options={{
					title: 'Clients',
					headerLeft: () => (
						<Icon.Button
							name='close'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.navigate('NewInvoice')}
						/>
					)
				}}
			/>
			<InvoiceStack.Screen
				name='AddClient2'
				component={AddClientScreen2}
				options={{
					title: 'Add Client',
					headerLeft: () => (
						<Icon.Button
							name='close'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.navigate('Clients2')}
						/>
					)
				}}
			/>
			<InvoiceStack.Screen
				name='AddItem'
				component={AddItemScreen}
				options={{
					title: 'Add Item',
					headerLeft: () => (
						<Icon.Button
							name='close'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.navigate('NewInvoice')}
						/>
					)
				}}
			/>
			<InvoiceStack.Screen
				name='EditItem'
				component={EditItemScreen}
				options={{
					title: 'Edit Item',
					headerLeft: () => (
						<Icon.Button
							name='close'
							size={25}
							color='#000'
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={() => navigation.navigate('NewInvoice')}
						/>
					)
				}}
			/>
		</InvoiceStack.Navigator>
	)
}

export default function MainTabScreen() {
	const { colors } = useTheme()
	const theme = useTheme()

	return (
		<Tab.Navigator
			initialRouteName='HomeStack'
			activeColor={theme.dark ? colors.text : colors.text2}
			barStyle={{
				backgroundColor: theme.dark
					? colors.background2
					: colors.background
			}}
		>
			<Tab.Screen
				name='HomeStack'
				component={HomeStackScreen}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<Icon name='ios-home' color={color} size={26} />
					)
				}}
			/>
			<Tab.Screen
				name='ClientsStack'
				component={ClientsStackScreen}
				options={{
					tabBarLabel: 'Clients',
					tabBarIcon: ({ color }) => (
						<Icon name='ios-person' color={color} size={26} />
					)
				}}
			/>
			<Tab.Screen
				name='InvoiceStack'
				component={InvoiceStackScreen}
				options={{
					tabBarLabel: 'Invoices',
					tabBarIcon: ({ color }) => (
						<Icon
							name='ios-document-text'
							color={color}
							size={26}
						/>
					)
				}}
			/>
		</Tab.Navigator>
	)
}
