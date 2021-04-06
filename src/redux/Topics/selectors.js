import {createSelector} from 'reselect';

const topicsState = () => (state) => {
  return state.topics;
};

export const listTopicsSelector = () => {
  return createSelector(topicsState(), (state) => {
    return state.get('listTopics');
  });
};
