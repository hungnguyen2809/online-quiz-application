import {fromJS} from 'immutable';
import {
  USER_QUESTION_GETLIST_INFO_EXAM_DONE,
  USER_QUESTION_GETLIST_RATE_USER_DONE,
  USER_QUESTION_GETLIST_PERCENT_TOPIC_DONE,
} from './constants';

const initSate = fromJS({
  listInfoExam: [],
  listRateUser: [],
  listPercentTopic: [],
});

export default function (state = initSate, action) {
  switch (action.type) {
    case USER_QUESTION_GETLIST_INFO_EXAM_DONE:
      return state.set('listInfoExam', action.payload.data);
    case USER_QUESTION_GETLIST_RATE_USER_DONE:
      return state.set('listRateUser', action.payload.data);
    case USER_QUESTION_GETLIST_PERCENT_TOPIC_DONE:
      return state.set('listPercentTopic', action.payload.data);
    default:
      return state;
  }
}
