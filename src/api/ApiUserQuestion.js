import {apis} from './createApiService';

export const getListInfoExamByUserTopicAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/user-question/getexam-by-usertopic',
    method: 'GET',
    params: args,
  });
};
