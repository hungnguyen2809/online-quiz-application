import {
  USER_QUESTION_CREATE,
  USER_QUESTION_GETLIST_INFO_EXAM,
  USER_QUESTION_GETLIST_INFO_EXAM_DONE,
  USER_QUESTION_GETLIST_PERCENT_TOPIC,
  USER_QUESTION_GETLIST_PERCENT_TOPIC_DONE,
  USER_QUESTION_GETLIST_RATE_USER,
  USER_QUESTION_GETLIST_RATE_USER_DONE,
  USER_QUESTION_UPDATE,
} from './constants';

export const getListInfoExamByUserTopicAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: USER_QUESTION_GETLIST_INFO_EXAM,
    payload: {data},
    callbacks,
  };
};

export const getListInfoExamByUserTopicActionDone = (data) => {
  return {
    type: USER_QUESTION_GETLIST_INFO_EXAM_DONE,
    payload: {data},
  };
};

export const getListRateUserAction = (
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: USER_QUESTION_GETLIST_RATE_USER,
    payload: {},
    callbacks,
  };
};

export const getListRateUserActionDone = (data) => {
  return {
    type: USER_QUESTION_GETLIST_RATE_USER_DONE,
    payload: {data},
  };
};

export const getListPercentTopicAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: USER_QUESTION_GETLIST_PERCENT_TOPIC,
    payload: {data},
    callbacks,
  };
};

export const getListPercentTopicActionDone = (data) => {
  return {
    type: USER_QUESTION_GETLIST_PERCENT_TOPIC_DONE,
    payload: {data},
  };
};

export const createUserQuestionAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: USER_QUESTION_CREATE,
    payload: {data},
    callbacks,
  };
};

export const updateUserQuestionAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: USER_QUESTION_UPDATE,
    payload: {data},
    callbacks,
  };
};
