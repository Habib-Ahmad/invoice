import React from 'react';
import MainStackScreen from './screens/MainStackScreen';
import RootStackScreen from './screens/RootStackScreen';
import { useAuthContext } from './context/context';

const StackView = () => {
  const { loginState } = useAuthContext();

  if (loginState.userToken === null) return <RootStackScreen />;

  return <MainStackScreen />;
};

export default StackView;
