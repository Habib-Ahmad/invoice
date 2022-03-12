import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../../context/context';
import { styles } from './styles';

const Home = () => {
  const { signOut } = useAuthContext();

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

export default Home;
