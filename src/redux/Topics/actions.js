import {TOPIC_GET_ALL_TOPICS, TOPIC_GET_ALL_TOPICS_DONE} from './constants';

export const getAllTopicsAction = (data, callbacks) => {
  return {
    type: TOPIC_GET_ALL_TOPICS,
    payload: {
      data,
    },
    callbacks,
  };
};

export const getAllTopicsActionDone = (data) => {
  return {
    type: TOPIC_GET_ALL_TOPICS_DONE,
    payload: {
      data,
    },
  };
};
