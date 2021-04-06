import {fromJS} from 'immutable';
import {TOPIC_GET_ALL_TOPICS_DONE} from './constants';

const initState = fromJS({
  // listTopics: [],
});

export default function (state = initState, action) {
  switch (action.type) {
    case TOPIC_GET_ALL_TOPICS_DONE:
      return state.set('listTopics', action.payload.data);
    default:
      return state;
  }
}
