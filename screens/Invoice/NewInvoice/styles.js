import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../../components/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.background,
    position: 'relative',
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
  titleInput: {
    fontSize: 16,
    width: '100%',
  },
  clientWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  client: {
    flexDirection: 'row',
  },
  logoWrapper: {
    backgroundColor: 'pink',
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  logo: {
    fontSize: 20,
  },
  detailsWrapper: {},
  name: {
    fontSize: 16,
  },
  email: {
    color: '#5c5c5c',
    fontSize: 12,
  },
  actionHeader: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  action: {
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  actionIcon: {
    color: '#075E54',
    marginRight: 20,
  },
  actionText: {
    color: '#075E54',
  },
  listItem: {
    backgroundColor: '#fff',
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#c9c9c9',
  },
  listItemName: {
    color: '#000',
  },
  listItemDesc: {
    color: '#6e6e6e',
    marginBottom: 8,
  },
  listItemNumbersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemNumbers: {
    color: '#6e6e6e',
  },
  inputWrapper: {
    width: '30%',
  },
  input: {
    color: '#05375a',
    fontSize: 15,
    borderWidth: 0.2,
    alignItems: 'center',
    padding: 3,
  },
  subTotalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  subTotalText1: {
    color: '#6e6e6e',
  },
  discountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  nextButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  nextButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginHorizontal: 20,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: -30,
  },
});
