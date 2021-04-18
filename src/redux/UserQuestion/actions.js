import {
  USER_QUESTION_GETLIST_INFO_EXAM,
  USER_QUESTION_GETLIST_INFO_EXAM_DONE,
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
