import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../components/Colors';

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
    justifyContent: 'space-between',
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
  clients: {
    paddingTop: 40,
  },
  client: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
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
    fontSize: 14,
  },
  email: {
    color: '#636363',
    fontSize: 12,
  },
  newInvoiceBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    right: 50,
    bottom: 50,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  newInvoiceBtnIcon: {
    color: '#fff',
  },
});
