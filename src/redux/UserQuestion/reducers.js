import {fromJS} from 'immutable';
import {USER_QUESTION_GETLIST_INFO_EXAM_DONE} from './constants';

const initSate = fromJS({
  listInfoExam: [],
});

export default function (state = initSate, action) {
  switch (action.type) {
    case USER_QUESTION_GETLIST_INFO_EXAM_DONE:
      return state.set('listInfoExam', action.payload.data);
    default:
      return state;
  }
}
