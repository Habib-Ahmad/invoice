import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
