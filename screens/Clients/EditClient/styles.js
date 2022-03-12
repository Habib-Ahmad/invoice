import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../../components/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.background,
    position: 'relative',
  },
  scrollView: {
    // flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    zIndex: 5,
  },
  headerText: {
    fontSize: 22,
    color: Colors.text,
  },
  inputHeader: {
    color: '#05375a',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 30,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
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
    color: '#05375a',
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
});
