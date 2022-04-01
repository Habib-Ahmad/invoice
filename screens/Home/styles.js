import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import Colors from '../../components/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.background,
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  headerText: {
    fontSize: 22,
    color: Colors.text,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoices: {
    paddingTop: 40,
  },
  invoice: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  invoiceTitle: {
    marginLeft: 20,
    fontSize: 16,
  },
  wrapper: {
    padding: 20,
    marginTop: 200,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  invoiceDate: {
    fontSize: 12,
    marginLeft: 20,
    color: '#636363',
  },
  buttonWrapper: {
    paddingHorizontal: 80,
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginHorizontal: 20,
  },
});
