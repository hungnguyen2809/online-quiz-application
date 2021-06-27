import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#8395a7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textMes: {
    lineHeight: 20,
  },
  btnClose: {
    position: 'absolute',
    right: -22,
    top: -3,
  },
  iconClose: {
    width: 22,
    height: 22,
  },
});

export default styles;
