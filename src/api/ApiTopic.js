import {apis} from './createApiService';

export const getAllTopicsAPI = (args = {}) => {
  return apis.makeAuthRequest({
    url: '/topics',
    method: 'GET',
  });
};
