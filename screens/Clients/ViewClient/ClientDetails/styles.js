import { StyleSheet } from 'react-native';
import Colors from '../../../../components/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  itemWrapper: {
    backgroundColor: Colors.background2,
    height: 70,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    justifyContent: 'center',
  },
  itemText1: {
    color: '#636363',
  },
  itemText2: {},
});
