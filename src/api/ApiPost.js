import {apis} from './createApiService';

export const getAllPostAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/post/get-all',
    method: 'GET',
    params: args,
  });
};

export const createNewPostAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/post/create-post',
    method: 'POST',
    data: args,
  });
};

export const getPostCommentAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/post-cmt/get-comment',
    method: 'GET',
    params: args,
  });
};

export const createPostCommentAPI = (args) => {
  return apis.makeAuthRequest({
    url: '/post-cmt/create-post-cmt',
    method: 'POST',
    data: args,
  });
};
