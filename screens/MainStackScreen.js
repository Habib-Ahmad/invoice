import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import InvoiceScreen from './InvoiceScreen';
import ClientsScreen from './ClientsScreen';
import ClientsScreen2 from './ClientsScreen2';
import ClientsScreen3 from './ClientsScreen3';
import NewInvoiceScreen from './NewInvoiceScreen';
import ViewInvoiceScreen from './ViewInvoiceScreen';
import EditInvoiceScreen from './EditInvoiceScreen';
import AddClientScreen from './AddClientScreen';
import AddClientScreen2 from './AddClientScreen2';
import EditClientScreen from './EditClientScreen';
import ViewClientScreen from './ViewClientScreen';
import ItemsScreen from './ItemsScreen';
import AddItemScreen from './AddItemScreen';
import EditItemScreen from './EditItemScreen';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = ({ navigation }) => {
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
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientsScreen}
        options={{
          tabBarLabel: 'Clients',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={InvoiceScreen}
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

export default function MainStackScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();

  return (
    <Stack.Navigator
      // screenOptions={{
      // 	headerStyle: {
      // 		backgroundColor: theme.dark
      // 			? colors.background2
      // 			: colors.background
      // 	},
      // 	headerTintColor: '#000',
      // 	headerTintStyle: { fontWeight: 'bold' }
      // }}

      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="ViewClient"
        component={ViewClientScreen}
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
        component={AddClientScreen}
        options={{
          title: 'Add Client',
        }}
      />
      <Stack.Screen
        name="EditClient"
        component={EditClientScreen}
        options={{
          title: 'Edit Client',
        }}
      />
      <Stack.Screen
        name="NewInvoice"
        component={NewInvoiceScreen}
        options={{
          title: 'New Invoice',
        }}
      />
      <Stack.Screen
        name="ViewInvoice"
        component={ViewInvoiceScreen}
        options={{
          title: 'Preview',
        }}
      />
      <Stack.Screen
        name="EditInvoice"
        component={EditInvoiceScreen}
        options={{
          title: 'New Invoice',
        }}
      />
      <Stack.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          title: 'Items',
        }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{
          title: 'Add Item',
        }}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItemScreen}
        options={{
          title: 'Edit Item',
        }}
      />
    </Stack.Navigator>
  );
}
