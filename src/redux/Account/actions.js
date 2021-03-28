import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGOUT,
  ACCOUNT_REGISTER,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_HAS_EMAIL,
  ACCOUNT_UPDATE_AVATAR,
  ACCOUNT_UPDATE_AVATAR_SUCCESS,
  ACCOUNT_UPDATE_INFO,
  ACCOUNT_UPDATE_INFO_SUCCESS,
  ACCOUNT_FORGET_PASSWORD,
  ACCOUNT_FORGET_PASSWORD_SUCCESS,
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

export const updateAvatarAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: ACCOUNT_UPDATE_AVATAR,
    payload: {
      data,
    },
    callbacks,
  };
};

export const updateAvatarActionSuccess = (data) => {
  return {
    type: ACCOUNT_UPDATE_AVATAR_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateInfoAccountAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: ACCOUNT_UPDATE_INFO,
    payload: {
      data,
    },
    callbacks,
  };
};

export const updateInfoAccountActionSuccess = (data) => {
  return {
    type: ACCOUNT_UPDATE_INFO_SUCCESS,
    payload: {
      data,
    },
  };
};

export const forgetPasswordAccountAction = (
  data,
  callbacks = {callbacksOnSuccess: () => {}, callbacksOnFail: () => {}},
) => {
  return {
    type: ACCOUNT_FORGET_PASSWORD,
    payload: {
      data,
    },
    callbacks,
  };
};

export const forgetPasswordAccountActionSuccess = (data) => {
  return {
    type: ACCOUNT_FORGET_PASSWORD_SUCCESS,
    payload: {
      data,
    },
  };
};
