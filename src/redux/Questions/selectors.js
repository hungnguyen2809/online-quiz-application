import {createSelector} from 'reselect';

const questionsState = () => (state) => {
  return state.questions;
};

export const getQuestionsSelector = () => {
  return createSelector(questionsState(), (state) => {
    return state.get('listQuestions');
  });
};
