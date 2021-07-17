import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {get} from 'lodash';
import queryString from 'query-string';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {getPresetCloundinary} from '../common/validate';
import {switchScreenLogin} from '../screens/MethodScreen';
import {
  deleteAccountToStorage,
  deleteTokenToStorage,
  getTokenToStorage,
  setTokenToStorage,
} from './../common/asyncStorage';

export const isProduct = true;

const BaseAPI = {
  BaseUrl: isProduct
    ? 'https://server-online-quiz.herokuapp.com/api'
    : `http://${Config.IP_HOST_DEV}:${Config.IP_PORT_DEV}/api`,
};

const urlUpload = 'https://api.cloudinary.com/v1_1/hungnguyen2809/image/upload';

const instanceAxios = axios.create({
  baseURL: BaseAPI.BaseUrl,
  timeout: 10000,
  timeoutErrorMessage: 'Quá thời gian kết nối',
  paramsSerializer: (params) => queryString.stringify(params),
});

// Custom request ...
instanceAxios.interceptors.request.use((config) => {
  return config;
});

// Custom response ...
instanceAxios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return {
        status: response.status,
        ...response.data,
      };
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const {response} = error;
      const {data} = response;
      if (get(data, 'token_invalid')) {
        Alert.alert('Thông báo', 'Bạn cần đăng nhập lại !', [
          {
            text: 'Đồng ý',
            style: 'destructive',
            onPress: async () => {
              await deleteAccountToStorage();
              await deleteTokenToStorage();
              await switchScreenLogin();
            },
          },
        ]);
      }
    }
    throw error;
  },
);

let refreshTokenRequest = null;
let tokenAuth = '';
let setTokenStorage = null;
const _makeAuthRequest = (instanceRequest) => async (args) => {
  try {
    const {token, tokenRefresh} = await getTokenToStorage();
    tokenAuth = token;
    const decodeToken = jwt_decode(token);
    const expiresToken = Date.now() / 1000 >= decodeToken.exp;

    if (expiresToken) {
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : apis.makeNonAuthRequest({
            url: '/refresh-token',
            method: 'POST',
            data: {id_user: decodeToken.id, token: tokenRefresh},
          });
      const responseToken = await refreshTokenRequest;
      refreshTokenRequest = null;

      if (responseToken.error === false && responseToken.status === 200) {
        setTokenStorage = setTokenStorage
          ? setTokenStorage
          : setTokenToStorage(responseToken.payload);
        await setTokenStorage;
        setTokenStorage = null;
        tokenAuth = responseToken.payload.token;
      }
    }

    const requestHeaders = args.headers ? args.headers : {};
    const authHeaders = {'AuthToken-VTNH': tokenAuth};
    const options = {
      ...args,
      headers: {
        ...requestHeaders,
        ...authHeaders,
      },
    };

    return await instanceRequest(options);
  } catch (error) {
    throw error;
  }
};

const _makeNonAuthRequest = (instanceRequest) => async (args) => {
  const requestHeaders = args.headers ? args.headers : {};

  const options = {
    ...args,
    headers: {
      ...requestHeaders,
    },
  };

  try {
    return await instanceRequest(options);
  } catch (error) {
    throw error;
  }
};

export const apis = {
  makeAuthRequest: _makeAuthRequest(instanceAxios),
  makeNonAuthRequest: _makeNonAuthRequest(instanceAxios),
};

export const makeUploadImage = async (imageFile, type = 'avt') => {
  try {
    if (!imageFile) {
      Alert.alert('Thông báo', 'Yêu cầu cần có file ảnh');
      return;
    }

    const uploadPreset = getPresetCloundinary(type, isProduct);
    const formData = new FormData();
    formData.append('cloud_name', 'hungnguyen2809');
    formData.append('upload_preset', uploadPreset);
    formData.append('file', imageFile);

    const response = await axios.post(urlUpload, formData);
    return {
      ...response.data,
    };
  } catch (error) {
    if (error.response) {
      const {response} = error;
      Alert.alert(
        'Đã xảy ra lỗi',
        'Lỗi tải ảnh ' + get(response, 'data.error.message', ''),
      );
      return;
    }
    throw error;
  }
};
