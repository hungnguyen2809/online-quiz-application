import {isEmpty} from 'lodash';
import {Alert} from 'react-native';
import {call, fork, takeLatest} from 'redux-saga/effects';
import {getQuestionsByQSAPI} from './../../api/ApiQuestion';
import {QUESTIONS_GET_BY_QUESTIONSET} from './constants';

function* WorkGetListQuestions(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getQuestionsByQSAPI, action.payload.data);

    if (
      response.status === 200 &&
      response.error === false &&
      !isEmpty(response.payload)
    ) {
      // yield put(getQuestionsByQSActionDone(response.payload));
      yield callbacksOnSuccess(response.payload);
    } else {
      yield callbacksOnFail();
    }
  } catch (error) {
    yield callbacksOnFail();
    Alert.alert('Thông báo', 'Đã có lỗi xảy ra, Vui lòng thử lại sau');
  }
}

function* WatcherGetListQuestions() {
  yield takeLatest(QUESTIONS_GET_BY_QUESTIONSET, WorkGetListQuestions);
}

export default function* QuestionSagas() {
  yield fork(WatcherGetListQuestions);
}
