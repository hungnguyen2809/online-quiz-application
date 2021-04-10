import axios from 'axios';
import queryString from 'query-string';
import Config from 'react-native-config';
import {getTokenToStorage} from './../common/asyncStorage';

const SERVER = `http://${Config.IP_HOST}:${Config.IP_PORT}/api`;

const instanceAxios = axios.create({
  baseURL: SERVER,
  timeout: 10000,
  timeoutErrorMessage: 'Quá thời gian kết nối',
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle custom config ...
instanceAxios.interceptors.request.use(async (config) => {
  return config;
});

// Handle custom response ...
instanceAxios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return {
        status: response.status,
        ...response.data,
      };
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

const _makeAuthRequest = (instanceRequest) => async (args) => {
  const requestHeaders = args.headers ? args.headers : {};

  const token = await getTokenToStorage();
  const authHeaders = {
    'auth-token': token,
  };

  const options = {
    ...args,
    headers: {
      ...requestHeaders,
      ...authHeaders,
    },
  };

  try {
    return await instanceRequest(options);
  } catch (error) {
    throw error;
  }
};

const _makeNonAuthRequest = (instanceRequest) => async (args) => {
  const requestHeaders = args.headers ? args.headers : {};

  const options = {
    ...args,
    headers: {
      ...requestHeaders,
    },
  };

  try {
    return await instanceRequest(options);
  } catch (error) {
    throw error;
  }
};

export const apis = {
  makeAuthRequest: _makeAuthRequest(instanceAxios),
  makeNonAuthRequest: _makeNonAuthRequest(instanceAxios),
};
