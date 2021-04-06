import {fork, call, put, takeLatest} from 'redux-saga/effects';
import {QUESTION_SET_GET_DATA} from './constants';
import {questionSetGetDataActionDone} from './actions';
import {getQestionSetAPI} from './../../api/ApiQuestionSet';
import _ from 'lodash';
import {Alert} from 'react-native';
import {
  deleteAccountToStorage,
  deleteTokenToStorage,
} from '../../common/asyncStorage';
import {switchScreenLogin} from '../../screens/MethodScreen';

function* WorkGetQuestionSet(action) {
  // const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getQestionSetAPI, action.payload.data);
    // console.log('DATA: ', response);
    if (
      response.status === 200 &&
      response.error === false &&
      !_.isEmpty(response.payload)
    ) {
      yield put(questionSetGetDataActionDone(response.payload));
    }
  } catch (error) {
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

function* WatcherGetQuestionSet() {
  yield takeLatest(QUESTION_SET_GET_DATA, WorkGetQuestionSet);
}

export default function* QuestionSetSaga() {
  yield fork(WatcherGetQuestionSet);
}
