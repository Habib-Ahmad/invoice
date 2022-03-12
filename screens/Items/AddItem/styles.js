import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../../components/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    zIndex: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: Colors.text,
  },
  inputHeader: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    paddingBottom: 5,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#000',
    fontSize: 18,
  },
  signIn: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#075E54',
    borderWidth: 1,
    marginHorizontal: 20,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
  },
  select: {
    height: 80,
    marginTop: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  selectText: {
    fontSize: 16,
    color: '#075E54',
    textDecorationLine: 'underline',
  },
});
