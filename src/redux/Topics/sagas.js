import {isEmpty} from 'lodash';
import {Alert} from 'react-native';
import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {getAllTopicsAPI} from './../../api/ApiTopic';
import {getAllTopicsActionDone} from './actions';
import {TOPIC_GET_ALL_TOPICS} from './constants';

function* WorkGetAllTopics(action) {
  const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getAllTopicsAPI);
    // console.log('DATA: ', response);
    if (
      response.status === 200 &&
      response.error === false &&
      !isEmpty(response.payload)
    ) {
      yield put(getAllTopicsActionDone(response.payload));
      yield callbacksOnSuccess();
    }
  } catch (error) {
    if (error.response) {
      const {status} = error.response;
      yield callbacksOnFail(status);
    } else {
      yield callbacksOnFail();
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
  }
}

function* WatcherGetAllTopics() {
  yield takeLatest(TOPIC_GET_ALL_TOPICS, WorkGetAllTopics);
}

export default function* TopicsSaga() {
  yield fork(WatcherGetAllTopics);
}
