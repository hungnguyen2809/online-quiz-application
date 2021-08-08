import {isEmpty} from 'lodash';
import {Alert} from 'react-native';
import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  createNewPostAPI,
  createPostCommentAPI,
  getAllPostAPI,
  getPostByIdAPI,
  getPostCommentAPI,
  updatePostCommentAPI,
} from '../../api/ApiPost';
import {getAllPostActionDone} from './actions';
import {
  POST_COMMENT_CREATE_POST_COMMENT,
  POST_COMMENT_GET_POST_COMMENT,
  POST_COMMENT_UPDATE_POST_COMMENT,
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
    if (error.response) {
      const {status} = error.response;
      yield callbackOnFail(status);
    } else {
      yield callbackOnFail();
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
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
    if (error.response) {
      const {status} = error.response;
      yield callbackOnFail(status);
    } else {
      yield callbackOnFail();
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
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
    if (error.response) {
      const {status} = error.response;
      yield callbackOnFail(status);
    } else {
      yield callbackOnFail();
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
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
    if (error.response) {
      const {status} = error.response;
      yield callbackOnFail(status);
    } else {
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
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
    if (error.response) {
      const {status} = error.response;
      yield callbackOnFail(status);
    } else {
      yield callbackOnFail();
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra. Vui lòng thử lại sau');
    }
  }
}

function* watcherCreatePostComment() {
  yield takeLatest(POST_COMMENT_CREATE_POST_COMMENT, workerCreatePostComment);
}

function* workerUpdatePostComment(action) {
  const {callbackOnSuccess, callbackOnFail} = action.callbacks;
  try {
    const response = yield call(updatePostCommentAPI, action.payload.data);
    if (response.status === 200 && response.error === false) {
      yield callbackOnSuccess();
    } else {
      Alert.alert('Thông báo', response.message);
      yield callbackOnFail();
    }
  } catch (error) {
    if (error.response) {
      yield callbackOnFail(error.response);
    } else {
      yield callbackOnFail();
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra, ' + error.message);
    }
  }
}

function* watcherUpdatePostCommnet() {
  yield takeLatest(POST_COMMENT_UPDATE_POST_COMMENT, workerUpdatePostComment);
}

export default function* PostSagas() {
  yield fork(watcherGetAllPost);
  yield fork(watcherGetPostById);
  yield fork(watcherCreateNewPost);
  yield fork(watcherGetPostComment);
  yield fork(watcherCreatePostComment);
  yield fork(watcherUpdatePostCommnet);
}
