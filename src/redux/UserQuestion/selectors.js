import {createSelector} from 'reselect';

const userQuestionSate = () => (state) => {
  return state.userQuestion;
};

export const getListInfoExamSelector = () => {
  return createSelector(userQuestionSate(), (state) => {
    return state.get('listInfoExam');
  });
};

export const getListRateUserSelector = () => {
  return createSelector(userQuestionSate(), (state) => {
    return state.get('listRateUser');
  });
};

export const getListPercentTopicSelector = () => {
  return createSelector(userQuestionSate(), (state) => {
    return state.get('listPercentTopic');
  });
};
