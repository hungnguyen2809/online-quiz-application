import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../common/dimensionScreen';
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CITY_LIGHTS,
  },
  wrapAvatar: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 3 - 40,
    left: SCREEN_WIDTH / 2 - 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  imageBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
  },
  btnChangeAvatar: {
    position: 'absolute',
    right: 0,
    bottom: -5,
    backgroundColor: Colors.HINT_OF_PENSIVE,
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.CLEAR_CHILL,
  },
  content: {
    flex: 1,
    marginTop: 80,
    padding: 16,
  },
  wrapInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderRadius: 6,
    minHeight: 50,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 6,
  },
  titleInfor: {
    fontSize: 17,
    marginHorizontal: 10,
  },
  wrapFooter: {
    marginHorizontal: '6%',
    marginVertical: '6%',
  },
  btnLogout: {
    height: 50,
    backgroundColor: Colors.WATERMELON,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  titleLogout: {
    color: Colors.WHITE,
    fontSize: 17,
    fontWeight: '500',
  },
});

export {styles};
