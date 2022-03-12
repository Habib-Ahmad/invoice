import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const Clients = ({ navigation }) => {
  const [clients, setClients] = useState([]);

  const GetClientList = async () => {
    const clientList = await AsyncStorage.getItem('clients');
    clientList && setClients(JSON.parse(clientList));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetClientList();
    });
    return unsubscribe;
  }, [navigation]);

  const ViewClient = async (name) => {
    await AsyncStorage.setItem('viewClientName', name);
    navigation.navigate('ViewClient');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Clients</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.clients}>
          {clients &&
            clients.map((item, idx) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={idx}
                style={styles.client}
                onPress={() => ViewClient(item.name)}
              >
                <View style={styles.logoWrapper}>
                  <Text style={styles.logo}>
                    {item.name && item.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.detailsWrapper}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddClient')}
        style={styles.newInvoiceBtn}
      >
        <Icon style={styles.newInvoiceBtnIcon} name="plus" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default Clients;
