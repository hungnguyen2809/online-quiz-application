import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGOUT,
} from './constants.js';

export const LoginAccountAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: ACCOUNT_LOGIN,
    payload: {
      data,
    },
    callbacks,
  };
};

export const LoginAccountActionSuccess = (data) => {
  return {
    type: ACCOUNT_LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
};

export const LogoutAccountAction = () => {
  return {
    type: ACCOUNT_LOGOUT,
  };
};
