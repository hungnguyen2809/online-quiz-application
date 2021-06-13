import {fromJS} from 'immutable';
import {
  POST_COMMENT_GET_POST_COMMENT_DONE,
  POST_GET_ALL_POST_DONE,
} from './constants';

const initState = fromJS({
  listPosts: [],
  // listPostComments: [],
});

export default function PostReducers(state = initState, action) {
  switch (action.type) {
    case POST_GET_ALL_POST_DONE:
      return state.set('listPosts', action.payload.data);
    case POST_COMMENT_GET_POST_COMMENT_DONE:
      return state.set('listPostComments', action.payload.data);
    default:
      return state;
  }
}
