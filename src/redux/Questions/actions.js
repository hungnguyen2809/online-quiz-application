import {
  QUESTIONS_GET_BY_QUESTIONSET,
  QUESTIONS_GET_BY_QUESTIONSET_DONE,
} from './constants';

export const getQuestionsByQSAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: QUESTIONS_GET_BY_QUESTIONSET,
    payload: {
      data,
    },
    callbacks,
  };
};

export const getQuestionsByQSActionDone = (data) => {
  return {
    type: QUESTIONS_GET_BY_QUESTIONSET_DONE,
    payload: {
      data,
    },
  };
};
