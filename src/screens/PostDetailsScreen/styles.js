import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '../../common/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: isIphoneX() ? 25 : 0,
    marginTop: getStatusBarHeight(),
  },
  wrapHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    paddingBottom: 10,
  },
  btnBack: {
    marginHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.CLEAR_CHILL,
  },
  loadingAvt: {position: 'absolute', top: 13, left: 13},
  content: {
    flex: 1,
    marginTop: 30,
  },
  wrapContent: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'red',
  },
  textContent: {
    lineHeight: 24,
    fontSize: 15,
  },
  wrapFooter: {
    // backgroundColor: 'red',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdc',
    borderRadius: 10,
    minHeight: 60,
    maxHeight: 60,
  },
  wrapBtnFooter: {
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#dcdcdc',
    marginVertical: 15,
  },
  btnTrashImage: {
    position: 'absolute',
    backgroundColor: 'gray',
    borderRadius: 2,
    left: 65,
    top: -5,
  },
});

export {styles};
