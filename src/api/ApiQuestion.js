import {apis} from './createApiService';

export const getQuestionsByQSAPI = (args) => {
  return apis.makeAuthRequest({
    url: `/questions/question-qs?id_qs=${args.id_qs}`,
    method: 'GET',
  });
};
