import {apis} from './createApiService';

export const getQestionSetAPI = (args) => {
  return apis.makeAuthRequest({
    url: `/questions-set/question-topic?id_topic=${args.id_topic}`,
    method: 'GET',
  });
};
