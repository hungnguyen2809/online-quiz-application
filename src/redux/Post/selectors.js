import {createSelector} from 'reselect';

const getStatePost = () => (state) => {
  return state.posts;
};

export const getAllPostSelector = () => {
  return createSelector(getStatePost(), (state) => {
    return state.get('listPosts');
  });
};

export const getAllPostCommentSelector = () => {
  return createSelector(getStatePost(), (state) => {
    return state.get('listPostComments');
  });
};
