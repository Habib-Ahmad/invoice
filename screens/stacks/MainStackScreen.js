import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import Home from '../Home/Home';

import Clients from '../Clients/Clients';
import AddClient from '../Clients/AddClient/AddClient';
import ViewClient from '../Clients/ViewClient/ViewClient';
import EditClient from '../Clients/EditClient/EditClient';

import Invoice from '../Invoice/Invoice';
import NewInvoice from '../Invoice/NewInvoice/NewInvoice';
import EditInvoice from '../Invoice/EditInvoice/EditInvoice';
import ViewInvoice from '../Invoice/ViewInvoice/ViewInvoice';

import Items from '../Items/Items';
import AddItem from '../Items/AddItem/AddItem';
import EditItem from '../Items/EditItem/EditItem';

import ClientsScreen2 from '../ClientsScreen2';
import ClientsScreen3 from '../ClientsScreen3';
import AddClientScreen2 from '../AddClientScreen2';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  const { colors } = useTheme();
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      activeColor={theme.dark ? colors.text : colors.text2}
      barStyle={{
        backgroundColor: colors.background2,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={Clients}
        options={{
          tabBarLabel: 'Clients',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={Invoice}
        options={{
          tabBarLabel: 'Invoices',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-document-text" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function MainStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="ViewClient"
        component={ViewClient}
        options={{
          title: 'Client',
        }}
      />
      <Stack.Screen
        name="Clients2"
        component={ClientsScreen2}
        options={{
          title: 'Clients',
        }}
      />
      <Stack.Screen
        name="Clients3"
        component={ClientsScreen3}
        options={{
          title: 'Clients',
        }}
      />
      <Stack.Screen
        name="AddClient2"
        component={AddClientScreen2}
        options={{
          title: 'Add Client',
        }}
      />
      <Stack.Screen
        name="AddClient"
        component={AddClient}
        options={{
          title: 'Add Client',
        }}
      />
      <Stack.Screen
        name="EditClient"
        component={EditClient}
        options={{
          title: 'Edit Client',
        }}
      />
      <Stack.Screen
        name="NewInvoice"
        component={NewInvoice}
        options={{
          title: 'New Invoice',
        }}
      />
      <Stack.Screen
        name="ViewInvoice"
        component={ViewInvoice}
        options={{
          title: 'Preview',
        }}
      />
      <Stack.Screen
        name="EditInvoice"
        component={EditInvoice}
        options={{
          title: 'New Invoice',
        }}
      />
      <Stack.Screen
        name="Items"
        component={Items}
        options={{
          title: 'Items',
        }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          title: 'Add Item',
        }}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={{
          title: 'Edit Item',
        }}
      />
    </Stack.Navigator>
  );
}
