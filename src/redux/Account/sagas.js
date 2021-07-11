import {Alert} from 'react-native';
import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  forgetPasswordAccountAPI,
  hasEmailAccountAPI,
  LoginApi,
  registerAccountAPI,
  updateAvatarAccountAPI,
  updateInfoAccountAPI,
} from './../../api/ApiAccount';
import {
  setAccountToStorage,
  setTokenToStorage,
} from './../../common/asyncStorage';
import {
  forgetPasswordAccountActionSuccess,
  LoginAccountActionSuccess,
  registerAccountActionSuccess,
  updateAvatarActionSuccess,
  updateInfoAccountActionSuccess,
} from './actions';
import {
  ACCOUNT_FORGET_PASSWORD,
  ACCOUNT_HAS_EMAIL,
  ACCOUNT_LOGIN,
  ACCOUNT_REGISTER,
  ACCOUNT_UPDATE_AVATAR,
  ACCOUNT_UPDATE_INFO,
} from './constants';

function* WorkLoginAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(LoginApi, action.payload.data);
    // console.log('DATA: ', response);
    if (response.error === false) {
      yield put(LoginAccountActionSuccess(response.payload.userInfo));
      yield setTokenToStorage(response.payload.userToken);
      yield callbacksOnSuccess(response.payload.userInfo);
    } else {
      Alert.alert('Có lỗi !', response.message);
    }
  } catch (error) {
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
    if (response.payload.exists === true) {
      yield callbacksOnSuccess(response.payload);
    } else {
      yield callbacksOnSuccess(response.payload);
    }
  } catch (error) {
    yield callbacksOnFail(-1);
  }
}

function* WatcherHasEmailAccount() {
  yield takeLatest(ACCOUNT_HAS_EMAIL, WorkHasEmailAccount);
}

function* WorkRegisterAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(registerAccountAPI, action.payload.data);
    if (response.error === false && response.status === 201) {
      yield put(registerAccountActionSuccess(response.payload.userInfo));
      yield setAccountToStorage(response.payload.userInfo);
      yield setTokenToStorage(response.payload.userToken);
      yield callbacksOnSuccess();
    } else {
      Alert.alert('Có lỗi !', response.message);
    }
  } catch (error) {
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
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(updateAvatarAccountAPI, action.payload.data);
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
      const {status} = error.response;

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
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(updateInfoAccountAPI, action.payload.data);
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
      const {status} = error.response;
      yield callbacksOnFail(status);
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
  }
}

function* WatcherUpdateInfoAccount() {
  yield takeLatest(ACCOUNT_UPDATE_INFO, WorkUpdateInfoAccount);
}

function* WorkForgetPassAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(forgetPasswordAccountAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield put(forgetPasswordAccountActionSuccess(response.payload));
      yield setAccountToStorage(response.payload);
      yield callbacksOnSuccess();
    } else {
      yield callbacksOnFail();
      Alert.alert('Thông báo !', 'Cập nhật thất bại');
    }
  } catch (error) {
    if (error.response) {
      const {status} = error.response;
      yield callbacksOnFail(status);
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
  }
}

function* WatcherForgetPassAccount() {
  yield takeLatest(ACCOUNT_FORGET_PASSWORD, WorkForgetPassAccount);
}

export default function* AccountSagas() {
  yield fork(WatchLoginAccount);
  yield fork(WatcherRegisterAccount);
  yield fork(WatcherHasEmailAccount);
  yield fork(WatcherUpdateAvatar);
  yield fork(WatcherUpdateInfoAccount);
  yield fork(WatcherForgetPassAccount);
}
