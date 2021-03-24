import {createSelector} from 'reselect';

const getAccountState = () => (state) => {
  return state.accountInfo;
};

export const getAccountSelector = () => {
  return createSelector(getAccountState(), (state) => {
    return state.get('accountInfo');
  });
};
