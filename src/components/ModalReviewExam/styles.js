import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../common/Colors';
const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    maxHeight: '90%',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  wrapTitle: {
    paddingVertical: 10,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  wrapContent: {
    flex: 1,
  },
  wrapFooter: {
    paddingVertical: 10,
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textBtnFooter: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  btnExit: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.AMOUR,
    marginHorizontal: 10,
    paddingVertical: 7,
  },
  textExit: {
    color: Colors.AMOUR,
  },
  btnSubmit: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.REEF_ENCOUNTER,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
  textSubmit: {
    color: Colors.WHITE,
  },
  // Item Ques
  containerItemQues: {
    margin: 16,
    paddingBottom: 10,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WIZARD_GREY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberQues: {
    fontSize: 16,
    lineHeight: 25,
    width: 35,
  },
  wrapQuesAnswer: {
    marginHorizontal: 20,
    backgroundColor: Colors.PEACE,
    paddingHorizontal: isIOS ? 9 : 10,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAnswer: {
    color: Colors.WHITE,
    fontWeight: '600',
  },
});

export {styles};
