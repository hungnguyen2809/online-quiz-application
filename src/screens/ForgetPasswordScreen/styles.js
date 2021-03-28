import {StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wapperInput: {
    marginTop: 20,
    marginHorizontal: '5%',
  },
  wapperButton: {
    marginTop: 25,
    backgroundColor: '#0097e6',
    padding: 13,
    marginHorizontal: '6%',
    borderRadius: 10,
  },
  wapperButtonSubmit: {
    marginTop: 25,
    backgroundColor: Colors.UFO_GREEN,
    padding: 13,
    marginHorizontal: '6%',
    borderRadius: 10,
  },
  titleButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export {styles};
