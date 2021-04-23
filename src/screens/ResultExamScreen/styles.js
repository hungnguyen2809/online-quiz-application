import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../common/dimensionScreen';
import {Colors} from './../../common/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe4ea',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 6,
  },
  title: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '600',
    margin: 16,
  },
  btnSubmit: {
    marginTop: 25,
    backgroundColor: Colors.HAMMAN_BULE,
    marginHorizontal: SCREEN_WIDTH / 6,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnTextSubmit: {
    fontSize: 17,
    lineHeight: 24,
    color: '#fff',
  },
  wrapPercent: {
    marginVertical: 10,
    alignItems: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    marginRight: 6,
  },
  textPercent: {
    fontWeight: '600',
    lineHeight: 24,
    fontSize: 15,
  },
});

export {styles};
