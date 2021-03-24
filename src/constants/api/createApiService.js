import axios from 'axios';
import {getAccountToStorage} from './../../common/asyncStorage';
import {IP_HOST, IP_PORT} from './../../../keyHost';
const SERVER = `http://${IP_HOST}:${IP_PORT}/api`;

const instance = axios.create({
  baseURL: SERVER,
});

const _makeAuthRequest = (instanceRequest) => async (args) => {
  const requestHeaders = args.headers ? args.headers : {};
  const res = await getAccountToStorage();
  const token = res.token;
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

  return new Promise(async (resolve, reject) => {
    try {
      const response = await instanceRequest(options);
      resolve({
        status: response.status,
        ...response.data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const _makeNonAuthRequest = (instanceRequest) => (args) => {
  const requestHeaders = args.headers ? args.headers : {};

  const options = {
    ...args,
    headers: {
      ...requestHeaders,
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await instanceRequest(options);
      resolve({
        status: response.status,
        ...response.data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const apis = {
  makeAuthRequest: _makeAuthRequest(instance),
  makeNonAuthRequest: _makeNonAuthRequest(instance),
};
