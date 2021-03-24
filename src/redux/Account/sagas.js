import {takeLatest, put, fork, call} from 'redux-saga/effects';
import {LoginApi} from './../../constants/api/ApiAccount';
import {ACCOUNT_LOGIN} from './constants';
import {LoginAccountActionSuccess} from './actions';
import {Alert} from 'react-native';

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

export default function* AccountSagas() {
  yield fork(WatchLoginAccount);
}
