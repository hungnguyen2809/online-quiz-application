import {StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {SCREEN_HEIGHT} from '../../common/dimensionScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CITY_LIGHTS,
    paddingBottom: isIphoneX() ? 25 : 0,
  },
  content: {
    flex: 1,
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.CLEAR_CHILL,
  },
  wrapItem: {
    flex: 1,
    marginHorizontal: '6%',
    marginTop: 35,
  },
  wrapItemEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 6,
  },
  wrapItemDate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    padding: 5,
    height: 46,
    color: '#414141',
  },
  textError: {
    color: 'red',
    margin: 5,
    fontSize: 15,
  },
  footer: {
    marginHorizontal: '6%',
    marginVertical: 20,
  },
  btnSubmit: {
    backgroundColor: Colors.UFO_GREEN,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnCancel: {
    backgroundColor: Colors.RED_ORANGE,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  textSubmit: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.WHITE,
  },
  circle300: {
    width: 300,
    height: 300,
    backgroundColor: Colors.PURE_APPLE,
    borderRadius: 300 / 2,
    position: 'absolute',
    right: -50,
    top: SCREEN_HEIGHT / 3,
    opacity: 0.2,
  },
  circle100: {
    width: 100,
    height: 100,
    backgroundColor: Colors.DARK_MOUNTAIN,
    borderRadius: 100 / 2,
    position: 'absolute',
    left: -50,
    top: 100,
    opacity: 0.2,
  },
  circle50: {
    width: 50,
    height: 50,
    backgroundColor: Colors.RADIANT_YELLOW,
    borderRadius: 50 / 2,
    position: 'absolute',
    left: 50,
    top: 100,
    opacity: 0.2,
  },
});

export {styles};
