import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemExam: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    margin: 10,
    backgroundColor: '#dfe4ea',
    borderRadius: 5,
    shadowColor: '#dcdcdc',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    elevation: 5,
  },
  wrapLabel: {
    flex: 1,
    justifyContent: 'center',
  },
  titleExam: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  desExam: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  imageLabel: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});

export {styles};
