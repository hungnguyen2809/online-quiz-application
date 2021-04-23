import {takeLatest, put, call, fork} from 'redux-saga/effects';
import {
  USER_QUESTION_CREATE,
  USER_QUESTION_GETLIST_INFO_EXAM,
  USER_QUESTION_GETLIST_PERCENT_TOPIC,
  USER_QUESTION_GETLIST_RATE_USER,
  USER_QUESTION_UPDATE,
} from './constants';
import {
  getListInfoExamByUserTopicActionDone,
  getListPercentTopicActionDone,
  getListRateUserActionDone,
} from './actions';
import {
  getListInfoExamByUserTopicAPI,
  getListRateUserAPI,
  getListPercentTopicAPI,
  createUserQuestionAPI,
  updateUserQuestionAPI,
} from './../../api/ApiUserQuestion';
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

function* WorkGetListRateUser(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getListRateUserAPI);
    if (response.error === false && response.status === 200) {
      yield put(getListRateUserActionDone(response.payload));
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
      Alert.alert(response.message);
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

function* WatcherGetListRateUser() {
  yield takeLatest(USER_QUESTION_GETLIST_RATE_USER, WorkGetListRateUser);
}

function* WorkGetListPercentTopic(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getListPercentTopicAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield put(getListPercentTopicActionDone(response.payload));
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
      Alert.alert(response.message);
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

function* WatcherGetListPercentTopic() {
  yield takeLatest(
    USER_QUESTION_GETLIST_PERCENT_TOPIC,
    WorkGetListPercentTopic,
  );
}

function* WorkCreateUserQuestion(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(createUserQuestionAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
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

function* WatcherCreateUserQuestion() {
  yield takeLatest(USER_QUESTION_CREATE, WorkCreateUserQuestion);
}

function* WorkUpdateUserQuestion(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(updateUserQuestionAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
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

function* WatcherUpdateUserQuestion() {
  yield takeLatest(USER_QUESTION_UPDATE, WorkUpdateUserQuestion);
}

export default function* UserQuestionSagas() {
  yield fork(WatcherGetListInfoExam);
  yield fork(WatcherGetListRateUser);
  yield fork(WatcherGetListPercentTopic);
  yield fork(WatcherCreateUserQuestion);
  yield fork(WatcherUpdateUserQuestion);
}
