import {isEmpty} from 'lodash';
import {Alert} from 'react-native';
import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {getQestionSetAPI} from './../../api/ApiQuestionSet';
import {questionSetGetDataActionDone} from './actions';
import {QUESTION_SET_GET_DATA} from './constants';

function* WorkGetQuestionSet(action) {
  try {
    const response = yield call(getQestionSetAPI, action.payload.data);
    // console.log('DATA: ', response);
    if (
      response.status === 200 &&
      response.error === false &&
      !isEmpty(response.payload)
    ) {
      yield put(questionSetGetDataActionDone(response.payload));
    } else {
      Alert.alert('Thông báo', response.message);
    }
  } catch (error) {
    Alert.alert('Thông báo', 'Đã có lỗi xảy ra, Vui lòng thử lại sau');
  }
}

function* WatcherGetQuestionSet() {
  yield takeLatest(QUESTION_SET_GET_DATA, WorkGetQuestionSet);
}

export default function* QuestionSetSaga() {
  yield fork(WatcherGetQuestionSet);
}
