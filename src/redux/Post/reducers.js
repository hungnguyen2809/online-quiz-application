import {fromJS} from 'immutable';
import {concat, isEmpty} from 'lodash';
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
      let listPosts = action.payload.data;
      const page = action.payload.page;
      if (isEmpty(listPosts)) {
        return state;
      }
      if (page !== 1) {
        listPosts = concat(state.get('listPosts'), listPosts);
      }
      return state.set('listPosts', listPosts).set('pagePost', page);
    case POST_COMMENT_GET_POST_COMMENT_DONE:
      return state.set('listPostComments', action.payload.data);
    default:
      return state;
  }
}
