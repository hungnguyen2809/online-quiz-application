import {apis} from './createApiService';
import {
  API_LOGIN,
  API_HASEMAIL,
  API_REGISTER,
  API_USER_AVATAR,
} from './constantsApis';

export const LoginApi = (args) => {
  return apis.makeNonAuthRequest({
    url: API_LOGIN,
    method: 'POST',
    data: args,
  });
};

export const hasEmailAccountAPI = (agrs) => {
  return apis.makeNonAuthRequest({
    url: API_HASEMAIL + `?email=${agrs.email}`,
    method: 'GET',
  });
};

export const registerAccountAPI = (agrs) => {
  return apis.makeNonAuthRequest({
    url: API_REGISTER,
    method: 'POST',
    data: agrs,
  });
};

export const updateAvatarAccountAPI = (agrs) => {
  return apis.makeAuthRequest({
    url: API_USER_AVATAR,
    method: 'POST',
    data: agrs,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
