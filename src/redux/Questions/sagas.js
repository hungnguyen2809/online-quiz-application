import {call, put, fork, takeLatest} from 'redux-saga/effects';
import {QUESTIONS_GET_BY_QUESTIONSET} from './constants';
import {getQuestionsByQSActionDone} from './actions';
import {getQuestionsByQSAPI} from './../../api/ApiQuestion';
import _ from 'lodash';
import {Alert} from 'react-native';
import {
  deleteAccountToStorage,
  deleteTokenToStorage,
} from '../../common/asyncStorage';
import {switchScreenLogin} from './../../screens/MethodScreen';

function* WorkGetListQuestions(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getQuestionsByQSAPI, action.payload.data);

    if (
      response.status === 200 &&
      response.error === false &&
      !_.isEmpty(response.payload)
    ) {
      // yield put(getQuestionsByQSActionDone(response.payload));
      yield callbacksOnSuccess(response.payload);
    } else {
      yield callbacksOnFail();
    }
  } catch (error) {
    yield callbacksOnFail();
    if (error.response) {
      const {data} = error.response;
      if (_.get(data, 'token_invalid') === true) {
        Alert.alert('Thông báo', 'Phiên đăng nhập hết hạn !', [
          {
            text: 'OK',
            style: 'destructive',
            onPress: async () => {
              await deleteAccountToStorage();
              await deleteTokenToStorage();
              await switchScreenLogin();
            },
          },
        ]);
      }
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra, Vui lòng thử lại sau');
    }
  }
}

function* WatcherGetListQuestions() {
  yield takeLatest(QUESTIONS_GET_BY_QUESTIONSET, WorkGetListQuestions);
}

export default function* QuestionSagas() {
  yield fork(WatcherGetListQuestions);
}
