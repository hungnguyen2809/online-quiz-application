import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGOUT,
  ACCOUNT_REGISTER,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_HAS_EMAIL,
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

export const hasEmailAccountAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: ACCOUNT_HAS_EMAIL,
    payload: {
      data,
    },
    callbacks,
  };
};

export const registerAccountAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: ACCOUNT_REGISTER,
    payload: {
      data,
    },
    callbacks,
  };
};

export const registerAccountActionSuccess = (data) => {
  return {
    type: ACCOUNT_REGISTER_SUCCESS,
    payload: {
      data,
    },
  };
};
