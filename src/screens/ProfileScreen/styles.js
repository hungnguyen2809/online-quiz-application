import {StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../common/dimensionScreen';

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
  loadingAvt: {position: 'absolute', top: 40 - 10, left: 40 - 10},
  imageBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
  },
  loadingBg: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 3 / 2 - 20,
    left: SCREEN_WIDTH / 2 - 20,
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
  textEmptry: {
    color: Colors.PEACE,
    opacity: 1,
    fontStyle: 'italic',
    marginHorizontal: 10,
    fontSize: 15,
  },
  circle: {
    width: 300,
    height: 300,
    backgroundColor: Colors.HAMMAN_BULE,
    borderRadius: 300 / 2,
    position: 'absolute',
    right: -50,
    top: SCREEN_HEIGHT / 2 - 300 / 2,
    opacity: 0.2,
  },
  menuOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.PEACE,
  },
  warpReviewAvt: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  imageReview: {
    width: '100%',
    height: '50%',
    borderRadius: 6,
  },
  wrapBtnReviewAvt: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export {styles};
