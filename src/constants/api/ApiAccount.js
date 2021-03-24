import {apis} from './createApiService';
import {API_LOGIN} from './constantsApis';

export const LoginApi = (args) => {
  return apis.makeNonAuthRequest({
    url: API_LOGIN,
    method: 'POST',
    data: args,
  });
};
