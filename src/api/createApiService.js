/* eslint-disable no-new */
import axios from 'axios';
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
} from './../common/asyncStorage';

export const isProduct = false;

const BaseAPI = {
  BaseUrl: isProduct
    ? 'https://server-online-quiz.herokuapp.com/api'
    : `http://${Config.IP_HOST_DEV}:${Config.IP_PORT_DEV}/api`,
};

const urlUpload = 'https://api.cloudinary.com/v1_1/hungnguyen2809/image/upload';

const CancelToken = axios.CancelToken;

const instanceAxios = axios.create({
  baseURL: BaseAPI.BaseUrl,
  timeout: 10000,
  timeoutErrorMessage: 'Quá thời gian kết nối',
  paramsSerializer: (params) => queryString.stringify(params),
});

let cancelRequest = null;
// Custom request ...
instanceAxios.interceptors.request.use(async (config) => {
  if (cancelRequest) {
    cancelRequest();
  }
  return config;
});

// Custom response ...
instanceAxios.interceptors.response.use(
  async (response) => {
    if (cancelRequest) {
      cancelRequest = null;
    }
    if (response && response.data) {
      return {
        status: response.status,
        ...response.data,
      };
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      const {response} = error;
      const {data} = response;

      if (response.status === 400) {
        if (get(data, 'token_invalid') === true) {
          if (cancelRequest === null) {
            new CancelToken((cancel) => {
              cancelRequest = cancel;
            });
            Alert.alert('Thông báo', 'Phiên đăng nhập hết hạn !', [
              {
                text: 'OK',
                style: 'destructive',
                onPress: async () => {
                  await deleteAccountToStorage();
                  await deleteTokenToStorage();
                  await switchScreenLogin();
                },
              },
            ]);
          }
          return {data};
        }
      }
    }
    throw error;
  },
);

const _makeAuthRequest = (instanceRequest) => async (args) => {
  const requestHeaders = args.headers ? args.headers : {};

  const token = await getTokenToStorage();
  const authHeaders = {
    'AuthToken-VTNH': token,
  };

  const options = {
    ...args,
    headers: {
      ...requestHeaders,
      ...authHeaders,
    },
  };

  try {
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
