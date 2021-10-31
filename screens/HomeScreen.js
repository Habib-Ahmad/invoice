import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Button,
	StatusBar,
	TouchableHighlight,
	Image
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import PDFParams from '../components/PDFParams'
import logo from '../assets/switchBox_watermark.jpeg'

const HomeScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const theme = useTheme()

	const CreatePDF = async () => {
		const params = PDFParams(logo)

		let options = {
			html: params[0],
			fileName: params[1],
			directory: params[2]
		}

		let file = await RNHTMLtoPDF.convert(options)
		alert(file.filePath)
	}

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle={theme.dark ? 'light-content' : 'dark-content'}
				backgroundColor='#00000008'
				translucent
			/>
			<TouchableHighlight onPress={CreatePDF}>
				<Text>Create PDF</Text>
			</TouchableHighlight>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
