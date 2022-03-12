import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Root/SplashScreen';
import SignInScreen from '../Root/SignInScreen';
import SignUpScreen from '../Root/SignUpScreen';
import ForgotPassword from '../Root/ForgotPassword';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
