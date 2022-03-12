import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const InvoiceScreen = ({ navigation }) => {
  const [invoice, setInvoice] = useState([
    {
      id: '',
      title: '',
      path: '',
      client: {},
      items: [],
      date: '',
    },
  ]);

  const GetInvoices = async () => {
    const invoiceListObject = await AsyncStorage.getItem('invoices');
    const invoiceList = JSON.parse(invoiceListObject);
    invoiceList && invoiceList.length > 0
      ? setInvoice(invoiceList)
      : setInvoice(invoice);
  };

  const ViewInvoice = async (id) => {
    await AsyncStorage.setItem('viewInvoiceId', id);
    navigation.navigate('ViewInvoice');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetInvoices();
    });
    return unsubscribe;
  }, [navigation]);

  // const Clear = async () => {
  //   await AsyncStorage.removeItem('invoices');
  //   await AsyncStorage.removeItem('clients');
  //   await AsyncStorage.removeItem('ItemDatabase');
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Invoices</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.invoices}>
          {invoice[0].id
            ? invoice.reverse().map((item, idx) => (
                <TouchableOpacity
                  activeOpacity={0.8}
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
              ))
            : null}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewInvoice')}
        style={styles.newInvoiceBtn}
      >
        <AntDesign style={styles.newInvoiceBtnIcon} name="plus" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default InvoiceScreen;
