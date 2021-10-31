import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const AddClientScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Add Client</Text>
		</View>
	)
}

export default AddClientScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0'
	},
})
