import React from 'react'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Platform,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import PDFParams from '../components/PDFParams'
import logo from '../assets/switchBox_watermark.jpeg'
import Icon from 'react-native-vector-icons/Ionicons'
import Pdf from 'react-native-pdf'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({ navigation }) => {
	const source = { uri: 'file:///storage/emulated/0/Documents/invoice.pdf' }

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

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: colors.background
		},
		container2: {
			flex: 1,
			justifyContent: 'flex-start',
			alignItems: 'center',
			marginTop: 25
		},
		pdf: {
			flex: 1,
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: colors.background2,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#c9c9c9',
			zIndex: 5
		},
		headerText: {
			fontSize: 22,
			color: colors.text
		},
		icons: {
			flexDirection: 'row',
			alignItems: 'center'
		}
	})

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Home</Text>
				<View style={styles.icons}>
					<TouchableOpacity>
						<Icon
							style={{ marginRight: 30 }}
							name='ios-notifications'
							color='#009387'
							size={22}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon name='person-circle' color='#009387' size={25} />
					</TouchableOpacity>
				</View>
			</View>

			{/* <View style={styles.container2}>
				<Pdf
					source={source}
					onLoadComplete={(numberOfPages, filePath) => {
						console.log(`Number of pages: ${numberOfPages}`)
					}}
					onPageChanged={(page, numberOfPages) => {
						console.log(`Current page: ${page}`)
					}}
					onError={(error) => {
						console.log(error)
					}}
					onPressLink={(uri) => {
						console.log(`Link pressed: ${uri}`)
					}}
					style={styles.pdf}
				/>
			</View> */}

			{/* <TouchableHighlight onPress={CreatePDF}>
				<Text>Create PDF</Text>
			</TouchableHighlight> */}
		</SafeAreaView>
	)
}

export default HomeScreen
