import {QUESTION_SET_GET_DATA, QUESTION_SET_GET_DATA_DONE} from './constants';

export const questionSetGetDataAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: QUESTION_SET_GET_DATA,
    payload: {
      data,
    },
    callbacks,
  };
};

export const questionSetGetDataActionDone = (data) => {
  return {
    type: QUESTION_SET_GET_DATA_DONE,
    payload: {
      data,
    },
  };
};
