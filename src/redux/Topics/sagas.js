import {takeLatest, call, put, fork} from 'redux-saga/effects';
import {getAllTopicsAPI} from './../../api/ApiTopic';
import {TOPIC_GET_ALL_TOPICS} from './constants';
import {getAllTopicsActionDone} from './actions';
import _ from 'lodash';
import {Alert} from 'react-native';
import {
  deleteAccountToStorage,
  deleteTokenToStorage,
} from '../../common/asyncStorage';
import {switchScreenLogin} from '../../screens/MethodScreen';

function* WorkGetAllTopics(action) {
  // const {callbacksOnSuccess, callbacksOnFail} = action.callbacks;
  try {
    const response = yield call(getAllTopicsAPI);
    // console.log('DATA: ', response);
    if (
      response.status === 200 &&
      response.error === false &&
      !_.isEmpty(response.payload)
    ) {
      yield put(getAllTopicsActionDone(response.payload));
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

function* WatcherGetAllTopics() {
  yield takeLatest(TOPIC_GET_ALL_TOPICS, WorkGetAllTopics);
}

export default function* TopicsSaga() {
  yield fork(WatcherGetAllTopics);
}
