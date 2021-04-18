import {createSelector} from 'reselect';

const userQuestionSate = () => (state) => {
  return state.userQuestion;
};

export const getListInfoExamSelector = () => {
  return createSelector(userQuestionSate(), (state) => {
    return state.get('listInfoExam');
  });
};
