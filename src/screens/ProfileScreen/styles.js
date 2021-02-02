import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CITY_LIGHTS,
  },
  content: {},
  backgroundImage: {
    height: isIOS ? 160 : 120,
    paddingTop: isIOS ? 45 : 5,
  },
  wapperinfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingBottom: 6,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    borderColor: Colors.CLEAR_CHILL,
    borderWidth: 2,
  },
  titleName: {
    fontSize: 20,
    color: Colors.WHITE,
    marginLeft: 15,
  },
  wapperEdit: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  btnSave: {
    backgroundColor: Colors.UFO_GREEN,
    marginHorizontal: '10%',
    marginVertical: '6%',
    padding: isIOS ? 15 : 12,
    borderRadius: 10,
  },
  titleSave: {fontSize: 18, textAlign: 'center', color: '#fff'},
});

export {styles};
