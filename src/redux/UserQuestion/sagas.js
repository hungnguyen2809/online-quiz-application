import {takeLatest, put, call, fork} from 'redux-saga/effects';
import {USER_QUESTION_GETLIST_INFO_EXAM} from './constants';
import {getListInfoExamByUserTopicActionDone} from './actions';
import {getListInfoExamByUserTopicAPI} from './../../api/ApiUserQuestion';
import _ from 'lodash';
import {Alert} from 'react-native';
import {
  deleteAccountToStorage,
  deleteTokenToStorage,
} from '../../common/asyncStorage';
import {switchScreenLogin} from '../../screens/MethodScreen';

function* WorkGetListInfoExam(action) {
  // const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(
      getListInfoExamByUserTopicAPI,
      action.payload.data,
    );
    if (
      response.status === 200 &&
      response.error === false &&
      !_.isEmpty(response.payload)
    ) {
      yield put(getListInfoExamByUserTopicActionDone(response.payload));
    } else {
      Alert.alert('Thông báo', response.message);
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

function* WatcherGetListInfoExam() {
  yield takeLatest(USER_QUESTION_GETLIST_INFO_EXAM, WorkGetListInfoExam);
}

export default function* UserQuestionSagas() {
  yield fork(WatcherGetListInfoExam);
}
