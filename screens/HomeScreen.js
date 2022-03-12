import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../context/context';

const HomeScreen = () => {
  const { colors } = useTheme();

  const { signOut } = useAuthContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: colors.background,
    },
    container2: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
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
      zIndex: 5,
    },
    headerText: {
      fontSize: 22,
      color: colors.text,
    },
    icons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => signOut()}>
            <Icon name="logout" color="#009387" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
