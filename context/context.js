import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginReducer, initialLoginState } from './reducer';

const AuthContext = createContext();

const AppWrapper = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      } catch (error) {
        console.log(error.message);
      }
    }, 1000);
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            dispatch({
              type: 'LOGIN',
              id: userCredentials.user.uid,
              token: userCredentials.user.uid,
            });
            await AsyncStorage.setItem('userToken', userCredentials.user.uid);
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Sign in error', 'Invalid E-mail', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/user-disabled') {
              Alert.alert('Sign in error', 'This user has been disabled', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/user-not-found') {
              Alert.alert('Sign in error', 'User not found', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/wrong-password') {
              Alert.alert('Sign in error', 'Incorrect password', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/too-many-requests') {
              Alert.alert(
                'Sign in error',
                'Login requests blocked due to too many icorrect password attempts, try agai later',
                [{ text: 'Okay' }],
              );
            }
            console.log('signIn error:', error.message);
          });
      },
      signOut: async () => {
        auth()
          .signOut()
          .then(async () => {
            console.log('User signed out!');
            dispatch({ type: 'LOGOUT' });
            await AsyncStorage.removeItem('userToken');
          });
      },
      signUp: (email, password) => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            console.log('User account created & signed in!');
            dispatch({
              type: 'REGISTER',
              id: userCredentials.user.uid,
              token: userCredentials.user.uid,
            });
            await AsyncStorage.setItem('userToken', userCredentials.user.uid);
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
              Alert.alert('Sign up error', 'E-mail address already in use', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/invalid-email') {
              Alert.alert('Sign up error', 'Invalid E-mail', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/operation-not-allowed') {
              Alert.alert('Sign up error', 'Operation not allowed', [
                { text: 'Okay' },
              ]);
            }

            if (error.code === 'auth/weak-password') {
              Alert.alert('Sign up error', 'Password is too weak', [
                { text: 'Okay' },
              ]);
            }

            console.log('signUp error:', error.message);
          });
      },
      loginState: loginState,
      isDarkTheme: isDarkTheme,
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [loginState, dispatch, isDarkTheme],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AppWrapper;

export const useAuthContext = () => useContext(AuthContext);
