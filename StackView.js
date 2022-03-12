import React from 'react';
import MainStackScreen from './screens/stacks/MainStackScreen';
import RootStackScreen from './screens/stacks/RootStackScreen';
import { useAuthContext } from './context/context';

const StackView = () => {
  const { loginState } = useAuthContext();

  if (loginState.userToken === null) return <RootStackScreen />;

  return <MainStackScreen />;
};

export default StackView;
