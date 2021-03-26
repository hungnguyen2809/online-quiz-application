import {takeLatest, put, fork, call} from 'redux-saga/effects';
import {
  LoginApi,
  hasEmailAccountAPI,
  registerAccountAPI,
} from './../../api/ApiAccount';
import {ACCOUNT_LOGIN, ACCOUNT_REGISTER, ACCOUNT_HAS_EMAIL} from './constants';
import {
  LoginAccountActionSuccess,
  registerAccountActionSuccess,
} from './actions';
import {Alert} from 'react-native';
import {setAccountToStorage} from './../../common/asyncStorage';

function* WorkLoginAccount(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(LoginApi, action.payload.data);
    // console.log('DATA: ', response);
    if (response.error === false) {
      yield put(LoginAccountActionSuccess(response.payload));
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

export default function* AccountSagas() {
  yield fork(WatchLoginAccount);
  yield fork(WatcherRegisterAccount);
  yield fork(WatcherHasEmailAccount);
}
