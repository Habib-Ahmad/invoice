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
  items: {
    paddingTop: 40,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 90,
    marginBottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  detailsWrapper: {
    flexDirection: 'row',
  },
  itemIcon: {
    marginRight: 20,
    marginTop: 10,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  desc: {
    color: '#636363',
    fontSize: 12,
  },
});
