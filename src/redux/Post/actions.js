import {
  POST_COMMENT_CREATE_POST_COMMENT,
  POST_COMMENT_GET_POST_COMMENT,
  POST_COMMENT_GET_POST_COMMENT_DONE,
  POST_CREATE_NEW_POST,
  POST_GET_ALL_POST,
  POST_GET_ALL_POST_DONE,
  POST_GET_POST_BY_ID,
} from './constants';

export const getAllPostAction = (
  data,
  page,
  callbacks = {callbackOnSuccess: () => {}, callbackOnFail: () => {}},
) => {
  return {
    type: POST_GET_ALL_POST,
    payload: {data, page},
    callbacks,
  };
};

export const getAllPostActionDone = (data, page) => {
  return {
    type: POST_GET_ALL_POST_DONE,
    payload: {data, page},
  };
};

export const getPostByIdAction = (data, callbacks) => {
  return {
    type: POST_GET_POST_BY_ID,
    payload: {data},
    callbacks,
  };
};

export const createNewPostAction = (
  data,
  callbacks = {callbackOnSuccess: () => {}, callbackOnFail: () => {}},
) => {
  return {
    type: POST_CREATE_NEW_POST,
    payload: {data},
    callbacks,
  };
};

export const getPostCommentAction = (
  data,
  callbacks = {callbackOnSuccess: () => {}, callbackOnFail: () => {}},
) => {
  return {
    type: POST_COMMENT_GET_POST_COMMENT,
    payload: {data},
    callbacks,
  };
};

export const getPostComemntActionDone = (data) => {
  return {
    type: POST_COMMENT_GET_POST_COMMENT_DONE,
    payload: {data},
  };
};

export const createPostCommentAction = (
  data,
  callbacks = {callbackOnSuccess: () => {}, callbackOnFail: () => {}},
) => {
  return {
    type: POST_COMMENT_CREATE_POST_COMMENT,
    payload: {data},
    callbacks,
  };
};
