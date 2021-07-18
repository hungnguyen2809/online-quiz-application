import {Alert, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';

const alertOpenSettings = () => {
  Alert.alert('Vui lòng cấp quyền truy cập', 'Mở cài đặt thiết bị', [
    {
      text: 'Hủy',
      style: 'destructive',
      onPress: () => {},
    },
    {
      text: 'Đồng ý',
      onPress: async () => {
        await openSettings();
      },
    },
  ]);
};

const requestPermissions = async (devicePermissions) => {
  let res = false;
  try {
    const permissions = await check(devicePermissions);
    if (permissions === RESULTS.GRANTED || permissions === RESULTS.LIMITED) {
      res = true;
    }
    if (permissions === RESULTS.UNAVAILABLE) {
      Alert.alert('Thông báo', 'Tính năng này không khả dụng trên thiết bị');
    }
    if (permissions === RESULTS.BLOCKED) {
      alertOpenSettings();
    }
    if (permissions === RESULTS.DENIED) {
      const allowPermissions = await request(devicePermissions);
      if (allowPermissions === RESULTS.GRANTED) {
        res = true;
      }
      if (allowPermissions === RESULTS.BLOCKED) {
        alertOpenSettings();
      }
    }
  } catch (error) {
    Alert.alert(
      'Thông báo',
      'Lỗi khi yêu cầu quyền thiết bị' + JSON.stringify(error),
    );
  }
  return res;
};

export const checkPermissionsCamera = async () => {
  // const devicePermissions = Platform.select({
  //   ios: PERMISSIONS.IOS.CAMERA,
  //   android: PERMISSIONS.ANDROID.CAMERA,
  // });
  if (Platform.OS === 'ios') {
    return true;
  } else {
    return await requestPermissions(PERMISSIONS.ANDROID.CAMERA);
  }
};

export const checkPermissionsPhoto = async () => {
  // const devicePermissions = Platform.select({
  //   ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  //   android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  // });
  if (Platform.OS === 'ios') {
    return true;
  } else {
    return await requestPermissions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }
};
