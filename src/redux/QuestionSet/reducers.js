import {fromJS} from 'immutable';
import {QUESTION_SET_GET_DATA_DONE} from './constants';

const initState = fromJS({
  // listQuestionSet: [],
});

export default function (state = initState, action) {
  switch (action.type) {
    case QUESTION_SET_GET_DATA_DONE:
      return state.set('listQuestionSet', action.payload.data);
    default:
      return state;
  }
}
