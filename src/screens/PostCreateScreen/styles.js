import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapInputDes: {
    padding: 10,
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    minHeight: 150,
    maxHeight: 120,
    padding: 5,
    borderRadius: 6,
  },
  btnChooseImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 6,
    marginTop: 10,
    width: 100,
    height: 100,
  },
  btnTrashImage: {
    position: 'absolute',
    backgroundColor: 'gray',
    borderRadius: 3,
    left: 95,
    top: -5,
  },
});

export {styles};
