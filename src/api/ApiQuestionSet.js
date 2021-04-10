import {apis} from './createApiService';

export const getQestionSetAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/questions-set/question-topic',
    method: 'GET',
    params: args,
  });
};
