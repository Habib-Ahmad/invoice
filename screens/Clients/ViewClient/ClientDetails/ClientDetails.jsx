import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const ClientDetails = () => {
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
  });

  const GetClient = async () => {
    const viewClientName = await AsyncStorage.getItem('viewClientName');

    const clientsObject = await AsyncStorage.getItem('clients');
    const clients = JSON.parse(clientsObject);

    let viewClient;

    clients.map((item) => item.name === viewClientName && (viewClient = item));

    setData(viewClient);
  };

  useEffect(() => {
    GetClient();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <Text style={styles.itemText1}>Mobile</Text>
        <Text style={styles.itemText2}>{data.mobile}</Text>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.itemText1}>E-mail</Text>
        <Text style={styles.itemText2}>{data.email}</Text>
      </View>
    </View>
  );
};

export default ClientDetails;
