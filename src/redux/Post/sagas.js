import {isEmpty} from 'lodash';
import {Alert} from 'react-native';
import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  createNewPostAPI,
  createPostCommentAPI,
  getAllPostAPI,
  getPostByIdAPI,
  getPostCommentAPI,
} from '../../api/ApiPost';
import {getAllPostActionDone} from './actions';
import {
  POST_COMMENT_CREATE_POST_COMMENT,
  POST_COMMENT_GET_POST_COMMENT,
  POST_CREATE_NEW_POST,
  POST_GET_ALL_POST,
  POST_GET_POST_BY_ID,
} from './constants';

function* workerGetAllPost(action) {
  const {callbackOnSuccess, callbackOnFail} = action.callbacks;
  try {
    const response = yield call(getAllPostAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield put(getAllPostActionDone(response.payload, action.payload.page));
      yield callbackOnSuccess({isNull: isEmpty(response.payload)});
    } else {
      Alert.alert('Đã xảy ra lỗi', response.message);
      yield callbackOnFail();
    }
  } catch (error) {
    yield callbackOnFail();
    Alert.alert('Đã xảy ra lỗi', error.message);
  }
}

function* watcherGetAllPost() {
  yield takeLatest(POST_GET_ALL_POST, workerGetAllPost);
}

function* workerGetPostById(action) {
  const {callbackOnSuccess, callbackOnFail} = action.callbacks;
  try {
    const response = yield call(getPostByIdAPI, action.payload.data);
    if (response.status === 200 && response.error === false) {
      yield callbackOnSuccess(response.payload);
    } else {
      Alert.alert('Có lỗi', response.message);
      yield callbackOnFail();
    }
  } catch (error) {
    Alert.alert('Đã xảy ra lỗi', error.message);
    yield callbackOnFail();
  }
}

function* watcherGetPostById() {
  yield takeLatest(POST_GET_POST_BY_ID, workerGetPostById);
}

function* workerCreateNewPost(action) {
  const {callbackOnSuccess, callbackOnFail} = action.callbacks;
  try {
    const response = yield call(createNewPostAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield callbackOnSuccess();
    } else {
      Alert.alert('Có lỗi', response.message);
      yield callbackOnFail();
    }
  } catch (error) {
    Alert.alert('Đã xảy ra lỗi', error.message);
    yield callbackOnFail();
  }
}

function* watcherCreateNewPost() {
  yield takeLatest(POST_CREATE_NEW_POST, workerCreateNewPost);
}

function* workerGetPostComment(action) {
  const {callbackOnSuccess, callbackOnFail} = action.callbacks;
  try {
    const response = yield call(getPostCommentAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      // yield put(getPostComemntActionDone(response.payload));
      yield callbackOnSuccess(response.payload);
    } else {
      Alert.alert('Có lỗi', response.message);
      yield callbackOnFail();
    }
  } catch (error) {
    Alert.alert('Đã xảy ra lỗi', error.message);
    yield callbackOnFail();
  }
}

function* watcherGetPostComment() {
  yield takeLatest(POST_COMMENT_GET_POST_COMMENT, workerGetPostComment);
}

function* workerCreatePostComment(action) {
  const {callbackOnSuccess, callbackOnFail} = action.callbacks;
  try {
    const response = yield call(createPostCommentAPI, action.payload.data);
    if (response.error === false && response.status === 200) {
      yield callbackOnSuccess(response.payload);
    } else {
      yield callbackOnFail();
      Alert.alert('Có lỗi', response.message);
    }
  } catch (error) {
    Alert.alert('Đã xảy ra lỗi', error.message);
    yield callbackOnFail();
  }
}

function* watcherCreatePostComment() {
  yield takeLatest(POST_COMMENT_CREATE_POST_COMMENT, workerCreatePostComment);
}

export default function* PostSagas() {
  yield fork(watcherGetAllPost);
  yield fork(watcherGetPostById);
  yield fork(watcherCreateNewPost);
  yield fork(watcherGetPostComment);
  yield fork(watcherCreatePostComment);
}
