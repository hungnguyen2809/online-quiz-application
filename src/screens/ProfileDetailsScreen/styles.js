import {StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';
import {isIphoneX} from 'react-native-iphone-x-helper';

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
  textSubmit: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.WHITE,
  },
});

export {styles};
