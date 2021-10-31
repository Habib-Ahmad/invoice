import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const ClientsScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Clients Screen</Text>
			<Button
				title='Click Here'
				onPress={() => alert('Button Clicked!')}
			/>
		</View>
	)
}

export default ClientsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
