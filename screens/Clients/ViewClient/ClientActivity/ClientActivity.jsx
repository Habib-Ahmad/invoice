import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const ClientActivity = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    invoices: [],
  });

  const GetActivity = async () => {
    const viewClientName = await AsyncStorage.getItem('viewClientName');

    const clientsObject = await AsyncStorage.getItem('clients');
    const clients = JSON.parse(clientsObject);

    let viewClient;

    clients.map((item) => item.name === viewClientName && (viewClient = item));

    setData(viewClient);
  };

  const ViewInvoice = async (id) => {
    await AsyncStorage.setItem('viewInvoiceId', id);
    navigation.navigate('ViewInvoice');
  };

  useEffect(() => {
    GetActivity();
  }, []);

  return (
    <ScrollView>
      <View style={styles.invoices}>
        {data.invoices.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.invoice}
            onPress={() => {
              ViewInvoice(item.id);
            }}
          >
            <View>
              <FontAwesome name="file-pdf-o" size={25} color="red" />
            </View>
            <View>
              <Text style={styles.invoiceTitle}>{item.title}</Text>
              <Text style={styles.invoiceDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ClientActivity;
