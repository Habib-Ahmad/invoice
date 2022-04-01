import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../../context/context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({ navigation }) => {
  const { signOut } = useAuthContext();

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetInvoices();
    });
    return unsubscribe;
  }, [navigation]);

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

      {invoice[0].id === '' ? (
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            You don&apos;t have any invoices, lets create your first invoice!
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Invoice')}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.button}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Create Invoice
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default Home;
