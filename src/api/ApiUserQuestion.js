import {apis} from './createApiService';

export const getListInfoExamByUserTopicAPI = (agrs) => {
  return apis.makeAuthRequest({
    url: '/user-question/getexam-by-usertopic',
    method: 'GET',
    params: agrs,
  });
};

export const getListRateUserAPI = (agrs = {}) => {
  return apis.makeAuthRequest({
    url: '/user-question/rate-users',
    method: 'GET',
    params: agrs,
  });
};

export const getListPercentTopicAPI = (agrs) => {
  return apis.makeAuthRequest({
    url: '/user-question/percent-topics',
    method: 'GET',
    params: agrs,
  });
};

export const createUserQuestionAPI = (agrs) => {
  return apis.makeAuthRequest({
    url: '/user-question/create-user-question',
    method: 'POST',
    data: agrs,
  });
};

export const updateUserQuestionAPI = (agrs) => {
  return apis.makeAuthRequest({
    url: '/user-question/update-user-question',
    method: 'PUT',
    data: agrs,
  });
};
