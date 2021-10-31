import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const InvoiceScreen = ({ navigation }) => {
	let number = 1234567890
    return (
        <View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('NewInvoice')} style={styles.newInvoiceBtn}>
				<Icon style={styles.newInvoiceBtnIcon} name='plus' size={40} />
			</TouchableOpacity>
		</View>
    )
}

export default InvoiceScreen


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	newInvoiceBtn: {
		width: 60,
		height: 60,
		borderRadius: 60,
		position: 'absolute',
		bottom: 50,
		right: 50,
		backgroundColor: '#009387',
		// padding: 10
	},
	newInvoiceBtnIcon: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// width: '100%',
		// height: '100%',
		color: '#fff',
		// margin: 8,
		// bottom: '100%',
		// right: '50%',
		// backgroundColor: 'green',
		// position: 'absolute'
	}
})
