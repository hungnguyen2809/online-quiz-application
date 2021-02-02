import {Platform} from 'react-native';
import axios from 'axios';

const isIOS = Platform.OS === 'ios';
const SERVER = isIOS ? 'http://127.0.0.1:8888/api' : 'http://10.0.2.2:8888/api';

export const HASEMAIL = (url, params) => {
  return axios.get(SERVER + url, {
    timeout: 30000,
    timeoutErrorMessage: 'Server not responding',
    params: params,
  });
};

export const LOGIN = (url, body) => {
  return axios.post(SERVER + url, JSON.stringify(body), {
    timeout: 30000,
    timeoutErrorMessage: 'Server not responding',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const REGISTER = (url, body) => {
  return axios.post(SERVER + url, JSON.stringify(body), {
    timeout: 30000,
    timeoutErrorMessage: 'Server not responding',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
