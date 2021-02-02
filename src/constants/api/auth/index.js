import {Platform} from 'react-native';
import axios from 'axios';

const isIOS = Platform.OS === 'ios';
const SERVER = isIOS ? 'http://127.0.0.1:8888/api' : 'http://10.0.2.2:8888/api';

export const GET = (url, token) => {
  return axios.get(SERVER + url, {
    timeout: 30000,
    timeoutErrorMessage: 'Server not responding',
    headers: {
      'auth-token': token,
    },
  });
};

export const GET2 = (url, params, token) => {
  return axios.get(SERVER + url, {
    timeout: 30000,
    timeoutErrorMessage: 'Server not responding',
    params: params,
    headers: {
      'auth-token': token,
    },
  });
};

export const POST = (url, body, token) => {
  return axios.post(SERVER + url, JSON.stringify(body), {
    timeout: 30000,
    timeoutErrorMessage: 'Server not responding',
    headers: {
      'auth-token': token,
      'Content-Type': 'application/json',
    },
  });
};
