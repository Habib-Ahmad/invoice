import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const EditClient = ({ navigation }) => {
  const [validation, setValidation] = useState({
    isValidName: true,
    isExistingName: false,
    isValidMobile: true,
    isValidEmail: true,
  });

  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    invoices: [],
  });

  const GetClient = async () => {
    const editClientName = await AsyncStorage.getItem('editClientName');

    const clientsObject = await AsyncStorage.getItem('clients');
    const clients = JSON.parse(clientsObject);

    let editClient;

    clients.map((item) => item.name === editClientName && (editClient = item));

    setData({
      ...data,
      name: editClient.name,
      mobile: editClient.mobile,
      email: editClient.email,
      invoices: editClient.invoices,
    });
  };

  useEffect(() => {
    GetClient();
  }, []);

  const onChangeText = (val, id) => {
    if (id === 'email') {
      setData({
        ...data,
        [id]: val.toLowerCase(),
      });
    } else {
      setData({
        ...data,
        [id]: val,
      });
    }
  };

  const HandleSave = async () => {
    const clientListObject = await AsyncStorage.getItem('clients');
    const clientList = JSON.parse(clientListObject);
    const editClientName = await AsyncStorage.getItem('editClientName');

    let clientNameList = [];
    let exisitingName = false;

    clientList && clientList.map((item) => clientNameList.push(item.name));

    if (editClientName === data.name) {
      exisitingName = false;
    } else if (clientNameList.indexOf(data.name) !== -1) {
      exisitingName = true;
    } else {
      exisitingName = false;
    }

    if (
      data.name.length > 0 &&
      data.mobile.length > 0 &&
      data.email.length > 0 &&
      exisitingName === false
    ) {
      setValidation({
        ...validation,
        isValidName: true,
        isExistingName: false,
        isValidMobile: true,
        isValidEmail: true,
      });

      let clientList = [];
      const clients = await AsyncStorage.getItem('clients');
      const editClientName = await AsyncStorage.getItem('editClientName');

      let index;

      clientList = JSON.parse(clients);
      clientList.map(
        (item) =>
          item.name === editClientName && (index = clientList.indexOf(item)),
      );
      clientList.splice(index, 1, data);

      await AsyncStorage.setItem('clients', JSON.stringify(clientList));
      navigation.navigate('ViewClient');
    } else {
      let nameStatus = validation.isValidName;
      let existingNameStatus = validation.isExistingName;
      let mobileStatus = validation.isValidMobile;
      let emailStatus = validation.isValidEmail;

      if (data.name.length < 1) {
        nameStatus = false;
      }
      if (exisitingName === true) {
        existingNameStatus = true;
      }
      if (data.mobile.length < 1) {
        mobileStatus = false;
      }
      if (data.email.length < 1) {
        emailStatus = false;
      }
      setValidation({
        ...validation,
        isValidName: nameStatus,
        isExistingName: existingNameStatus,
        isValidMobile: mobileStatus,
        isValidEmail: emailStatus,
      });
    }
  };

  const handleValidation = (val, id) => {
    if (val.trim().length > 0) {
      setValidation({
        ...validation,
        [id]: true,
      });
    }
  };

  useEffect(() => {
    setValidation({
      ...validation,
      isValidName: true,
      isValidMobile: true,
      isValidEmail: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ViewClient')}
        >
          <AntDesign
            style={{ marginRight: 15 }}
            name="arrowleft"
            color="#075E54"
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Client</Text>
      </View>
      {data.name ? (
        <Animatable.Text
          animation="fadeIn"
          duration={500}
          style={styles.inputHeader}
        >
          Client name
        </Animatable.Text>
      ) : (
        <View style={{ marginTop: 50 }}></View>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Client name"
          value={data.name}
          onChangeText={(val) => onChangeText(val, 'name')}
          onEndEditing={(e) =>
            handleValidation(e.nativeEvent.text, 'isValidName')
          }
        />
      </View>
      {validation.isValidName || (
        <Text style={styles.errorMsg}>Client name cannot be empty</Text>
      )}
      {validation.isExistingName && (
        <Text style={styles.errorMsg}>Client already exists!</Text>
      )}

      {data.mobile ? (
        <Animatable.Text
          animation="fadeIn"
          duration={500}
          style={styles.inputHeader}
        >
          Mobile
        </Animatable.Text>
      ) : (
        <View style={{ marginTop: 50 }}></View>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={data.mobile}
          onChangeText={(val) => onChangeText(val, 'mobile')}
        />
      </View>

      {data.email ? (
        <Animatable.Text
          animation="fadeIn"
          duration={500}
          style={styles.inputHeader}
        >
          E-mail
        </Animatable.Text>
      ) : (
        <View style={{ marginTop: 50 }}></View>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={data.email}
          onChangeText={(val) => onChangeText(val, 'email')}
        />
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={() => HandleSave()}>
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
          <Text style={[styles.textSign, { color: '#fff' }]}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default EditClient;
