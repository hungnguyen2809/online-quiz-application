import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const onChooseImageLibrary = (callback, options = {}) => {
  try {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        ...options,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode === 'permission') {
          Alert.alert('Thông báo', 'Ứng dụng không có quyền truy cập');
          return;
        }
        if (response.errorCode === 'other') {
          Alert.alert('Thông báo', response.errorMessage);
        }
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      },
    );
  } catch (error) {
    Alert.alert('Thông báo !', 'Lỗi không thể chọn ảnh. Vui lòng thử lại !');
  }
};

export const onTakePhotoCamera = (callback, options = {}) => {
  try {
    launchCamera(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode === 'permission') {
          Alert.alert('Thông báo', 'Ứng dụng không có quyền truy cập');
          return;
        }
        if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Thông báo', 'Camera triên thiết bị không khả dụng');
          return;
        }
        if (response.errorCode === 'other') {
          Alert.alert('Thông báo', response.errorMessage);
        }
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      },
    );
  } catch (error) {
    Alert.alert('Thông báo !', 'Lỗi không thể chụp ảnh. Vui lòng thử lại !');
  }
};
