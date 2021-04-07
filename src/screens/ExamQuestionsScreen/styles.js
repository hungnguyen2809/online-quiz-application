import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#dfe4ea',
  },
  wapperFooter: {
    paddingVertical: 5,
    marginBottom: isIphoneX() ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export {styles};
