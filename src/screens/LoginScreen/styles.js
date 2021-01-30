import {StyleSheet} from 'react-native';
// import {fonts} from './../../common/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#01a3a4',
    fontSize: 25,
    fontWeight: '500',
    textTransform: 'uppercase',
    shadowColor: '#487eb0',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    // fontFamily: fonts.OpenSans,
  },
  top: {
    flex: 2.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 2,
    marginHorizontal: '6%',
  },
  bottom: {
    flex: 5,
    marginHorizontal: '5%',
  },
  btnLogin: {
    backgroundColor: '#ee5253',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textLogin: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  forgetPassword: {
    textAlign: 'center',
    margin: 10,
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#1B9CFC',
  },
  textForgert: {
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#1B9CFC',
  },
  textRegister: {
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#3867d6',
  },
});

export {styles};
