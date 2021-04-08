import {fromJS} from 'immutable';
import {QUESTIONS_GET_BY_QUESTIONSET_DONE} from './constants';

const initSate = fromJS({
  listQuestions: [],
});

export default function (state = initSate, action) {
  switch (action.type) {
    case QUESTIONS_GET_BY_QUESTIONSET_DONE:
      return state.set('listQuestions', action.payload.data);
    default:
      return state;
  }
}
