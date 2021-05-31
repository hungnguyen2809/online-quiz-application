import {StyleSheet} from 'react-native';
import {Colors} from '../../common/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CITY_LIGHTS,
  },
  wrapHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  btnNewQuestion: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
    marginVertical: 10,
    padding: 3,
    borderRadius: 30,
    backgroundColor: Colors.WHITE,
  },
  textQuestion: {
    marginLeft: 10,
    fontSize: 15,
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
  btnFilter: {
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 10,
  },
  wrapContent: {
    flex: 1,
  },
});

export {styles};
