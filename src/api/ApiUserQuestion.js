import {apis} from './createApiService';

export const getListInfoExamByUserTopicAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/user-question/getexam-by-usertopic',
    method: 'GET',
    params: args,
  });
};

export const getListRateUserAPI = (args = {}) => {
  return apis.makeAuthRequest({
    url: '/user-question/rate-users',
    method: 'GET',
    params: args,
  });
};

export const getListPercentTopicAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/user-question/percent-topics',
    method: 'GET',
    params: args,
  });
};
