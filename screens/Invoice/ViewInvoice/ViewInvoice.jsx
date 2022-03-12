import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import { styles } from './styles';

const ViewInvoice = ({ navigation }) => {
  const [data, setData] = useState({
    id: '',
    title: '',
    title2: '',
    client: {},
    items: [],
    path: '',
    date: '',
  });

  const GetInvoice = async () => {
    const id = await AsyncStorage.getItem('viewInvoiceId');
    const invoiceListObject = await AsyncStorage.getItem('invoices');
    const invoiceList = JSON.parse(invoiceListObject);

    invoiceList.map((item) => {
      if (item.id === id) {
        console.log(item);
        setData(item);
      }
    });
  };

  useEffect(() => {
    GetInvoice();
  }, []);

  const source = {
    uri: `file://${data.path}`,
  };

  const EditInvoice = async (id) => {
    await AsyncStorage.setItem('editInvoiceId', id);
    navigation.navigate('EditInvoice');
  };

  const DeleteInvoice = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this invoice?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            // delete from client
            let clientListObject = await AsyncStorage.getItem('clients');
            let clientList = JSON.parse(clientListObject);
            let indexC;

            clientList.map((item) => {
              if (Object.keys(data.client).length > 0) {
                if (item.name === data.client.name) {
                  item.invoices.map((invoice) => {
                    if (invoice.id === data.id) {
                      indexC = item.invoices.indexOf(invoice);
                      item.invoices.splice(indexC, 1);
                    }
                  });
                }
              }
            });
            await AsyncStorage.setItem('clients', JSON.stringify(clientList));

            // delete from invoices
            let invoiceListObject = await AsyncStorage.getItem('invoices');
            let invoiceList = JSON.parse(invoiceListObject);
            let indexI;

            invoiceList.map((item) => {
              if (item.id === data.id) {
                indexI = invoiceList.indexOf(item);
                invoiceList.splice(indexI, 1);
              }
            });
            await AsyncStorage.setItem('invoices', JSON.stringify(invoiceList));

            // delete from phone
            RNFS.unlink(data.path)
              .then(() => {
                console.log('FILE DELETED', data.path);
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch((err) => {
                console.log(err.message);
              });

            navigation.navigate('Invoice');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Invoice')}
        >
          <Icon
            style={{ marginRight: 15 }}
            name="close-outline"
            color="#075E54"
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Preview</Text>
      </View>
      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => EditInvoice(data.id)}
        >
          <AntDesign name="edit" color="#075E54" size={25} />
          <Text>Use as template</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => DeleteInvoice(data.id)}
        >
          <AntDesign name="deleteuser" color="red" size={25} />
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      {data.path !== '' && (
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            console.log(`File path: ${filePath}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page} of ${numberOfPages}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

export default ViewInvoice;
