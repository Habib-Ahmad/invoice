import React from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import StackView from './StackView';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { useAuthContext } from './context/context';

const AppView = () => {
  const { loginState, isDarkTheme } = useAuthContext();

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#f0f0f0',
      text: '#333333',
      background2: '#fff',
      text2: '#009387',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
      background2: '#075E54',
      text2: '#075E54',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  if (loginState.isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#075E54" />
      </View>
    );

  return (
    <PaperProvider style={styles.container} theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor="#fff"
        translucent
      />
      <NavigationContainer theme={theme}>
        <StackView />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
