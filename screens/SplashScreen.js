import React from 'react'
import {
	View,
	Text,
	Button,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'

const SplashScreen = ({ navigation }) => {
	const { colors } = useTheme()

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Animatable.Image
					animation='bounceIn'
					duration={1500}
					source={require('../assets/logo.png')}
					style={styles.logo}
					resizeMode='stretch'
				/>
			</View>
			<Animatable.View
				style={[styles.footer, { backgroundColor: colors.background }]}
				animation='fadeInUpBig'
				duration={1500}
			>
				<Text style={[styles.title, { color: colors.text }]}>
					Stay Connected with everyone!
				</Text>
				<Text style={[styles.text, { color: colors.text }]}>
					Sign In
				</Text>
				<View style={styles.button}>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignInScreen')}
					>
						<LinearGradient
							colors={['#08d4c4', '#01ab9d']}
							style={styles.signIn}
						>
							<Text style={styles.textSign}>Get Started</Text>
							<MaterialIcons
								name='navigate-next'
								color='#fff'
								size={20}
							/>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	)
}

export default SplashScreen

const { height } = Dimensions.get('screen')
const logo_height = height * 0.28

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#075E54'
	},
	header: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		flex: 1,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingVertical: 50,
		paddingHorizontal: 30
	},
	logo: {
		width: logo_height,
		height: logo_height
	},
	title: {
		// color: '#05375a',
		fontSize: 30,
		fontWeight: 'bold'
	},
	text: {
		// color: 'grey',
		marginTop: 5
	},
	button: {
		alignItems: 'flex-end',
		marginTop: 30
	},
	signIn: {
		width: 150,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		flexDirection: 'row'
	},
	textSign: {
		color: 'white',
		fontWeight: 'bold'
	}
})
