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

export const checkPermissionsCamera = async () => {
  const devicePermissions = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  try {
    const permissions = await check(devicePermissions);
    switch (permissions) {
      case RESULTS.GRANTED || RESULTS.LIMITED:
        return true;
      case RESULTS.DENIED:
        const allowPermissions = await request(devicePermissions);
        return allowPermissions === RESULTS.GRANTED ? true : false;
      default:
        alertOpenSettings();
        return false;
    }
  } catch (error) {
    return false;
  }
};

export const checkPermissionsPhoto = async () => {
  const devicePermissions = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  });
  try {
    const permissions = await check(devicePermissions);
    switch (permissions) {
      case RESULTS.GRANTED || RESULTS.LIMITED:
        return true;
      case RESULTS.DENIED:
        const allowPermissions = await request(devicePermissions);
        return allowPermissions === RESULTS.GRANTED ? true : false;
      default:
        alertOpenSettings();
        return false;
    }
  } catch (error) {
    return false;
  }
};
