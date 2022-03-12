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
  actionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.background2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
  },
  action: {
    alignItems: 'center',
    width: 50,
  },
});
