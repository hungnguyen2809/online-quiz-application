import {createSelector} from 'reselect';

const questionSetState = () => (state) => {
  return state.questionSet;
};

export const listQuestionSetSelector = () => {
  return createSelector(questionSetState(), (state) => {
    return state.get('listQuestionSet');
  });
};
