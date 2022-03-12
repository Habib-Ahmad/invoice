import { StyleSheet, StatusBar, Platform } from 'react-native';
import Colors from '../../components/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.background,
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
  invoiceDate: {
    fontSize: 12,
    marginLeft: 20,
    color: '#636363',
  },
  newInvoiceBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newInvoiceBtnIcon: {
    color: '#fff',
  },
});
