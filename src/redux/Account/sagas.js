import {takeLatest, put, fork, call} from 'redux-saga/effects';
import {
  LoginApi,
  hasEmailAccountAPI,
  registerAccountAPI,
  updateAvatarAccountAPI,
  updateInfoAccountAPI,
} from './../../api/ApiAccount';
import {
  ACCOUNT_LOGIN,
  ACCOUNT_REGISTER,
  ACCOUNT_HAS_EMAIL,
  ACCOUNT_UPDATE_AVATAR,
  ACCOUNT_UPDATE_INFO,
} from './constants';
import {
  LoginAccountActionSuccess,
  registerAccountActionSuccess,
  updateAvatarActionSuccess,
  updateInfoAccountActionSuccess,
} from './actions';
import _ from 'lodash';
import {Alert} from 'react-native';
import {
  setAccountToStorage,
  deleteAccountToStorage,
  setTokenToStorage,
  deleteTokenToStorage,
} from './../../common/asyncStorage';
import {switchScreenLogin} from './../../screens/MethodScreen';

function* WorkLoginAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(LoginApi, action.payload.data);
    // console.log('DATA: ', response);
    if (response.error === false) {
      yield put(LoginAccountActionSuccess(response.payload));
      yield setTokenToStorage(response.payload.token);
      yield callbacksOnSuccess(response.payload);
    } else {
      Alert.alert('Có lỗi !', response.message);
    }
  } catch (error) {
    // console.log('Error: ', error.response);
    if (error.response) {
      const {status} = error.response;
      yield callbacksOnFail(status);
    } else {
      yield callbacksOnFail(-1);
    }
  }
}

function* WatchLoginAccount() {
  yield takeLatest(ACCOUNT_LOGIN, WorkLoginAccount);
}

function* WorkHasEmailAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(hasEmailAccountAPI, action.payload.data);
    // console.log('DATA: ', response);
    if (response.error === false && response.status === 200) {
      yield callbacksOnSuccess();
    } else {
      Alert.alert('Có lỗi !', response.message);
    }
  } catch (error) {
    // console.log('Error: ', error.response);
    if (error.response) {
      const {status} = error.response;
      yield callbacksOnFail(status);
    } else {
      yield callbacksOnFail(-1);
    }
  }
}

function* WatcherHasEmailAccount() {
  yield takeLatest(ACCOUNT_HAS_EMAIL, WorkHasEmailAccount);
}

function* WorkRegisterAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(registerAccountAPI, action.payload.data);
    // console.log('DATA: ', response);
    if (response.error === false && response.status === 201) {
      yield put(registerAccountActionSuccess(response.payload));
      yield setAccountToStorage(response.payload);
      yield setTokenToStorage(response.payload.token);
      yield callbacksOnSuccess();
    } else {
      Alert.alert('Có lỗi !', response.message);
    }
  } catch (error) {
    // console.log('Error: ', error.response);
    if (error.response) {
      const {status} = error.response;
      yield callbacksOnFail(status);
    } else {
      yield callbacksOnFail(-1);
    }
  }
}

function* WatcherRegisterAccount() {
  yield takeLatest(ACCOUNT_REGISTER, WorkRegisterAccount);
}

function* WorkUpdateAvatar(action) {
  // console.log('ACTION: ', action);
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(updateAvatarAccountAPI, action.payload.data);
    // console.log(response);
    if (response.error === false && response.status === 200) {
      yield put(updateAvatarActionSuccess(response.payload));
      yield setAccountToStorage(response.payload);
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
      Alert.alert('Thông báo !', 'Cập nhật thất bại');
    }
  } catch (error) {
    if (error.response) {
      const {status, data} = error.response;
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
      yield callbacksOnFail(status);
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra, Vui lòng thử lại sau');
    }
  }
}

function* WatcherUpdateAvatar() {
  yield takeLatest(ACCOUNT_UPDATE_AVATAR, WorkUpdateAvatar);
}

function* WorkUpdateInfoAccount(action) {
  // console.log('ACTION: ', action);
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(updateInfoAccountAPI, action.payload.data);
    // console.log(response);
    if (response.error === false && response.status === 200) {
      yield put(updateInfoAccountActionSuccess(response.payload));
      yield setAccountToStorage(response.payload);
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
      Alert.alert('Thông báo !', 'Cập nhật thất bại');
    }
  } catch (error) {
    if (error.response) {
      const {status, data} = error.response;
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
      yield callbacksOnFail(status);
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
  }
}

function* WatcherUpdateInfoAccount() {
  yield takeLatest(ACCOUNT_UPDATE_INFO, WorkUpdateInfoAccount);
}

export default function* AccountSagas() {
  yield fork(WatchLoginAccount);
  yield fork(WatcherRegisterAccount);
  yield fork(WatcherHasEmailAccount);
  yield fork(WatcherUpdateAvatar);
  yield fork(WatcherUpdateInfoAccount);
}
