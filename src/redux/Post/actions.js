import {
  POST_COMMENT_CREATE_POST_COMMENT,
  POST_COMMENT_GET_POST_COMMENT,
  POST_COMMENT_GET_POST_COMMENT_DONE,
  POST_CREATE_NEW_POST,
  POST_GET_ALL_POST,
  POST_GET_ALL_POST_DONE,
} from './constants';

export const getAllPostAction = (
  callbacks = {callbackOnSuccess: () => {}, callbackOnFail: () => {}},
) => {
  return {
    type: POST_GET_ALL_POST,
    payload: {},
    callbacks,
  };
};

export const getAllPostActionDone = (data) => {
  return {
    type: POST_GET_ALL_POST_DONE,
    payload: {data},
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