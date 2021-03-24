import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_ACCOUNT = 'KEY_ACCOUNT';

const setAccountToStorage = async (userInfo) => {
  try {
    let user = JSON.stringify(userInfo);
    await AsyncStorage.setItem(KEY_ACCOUNT, user);
    return true;
  } catch (error) {
    return null;
  }
};

const getAccountToStorage = async () => {
  try {
    let user = await AsyncStorage.getItem(KEY_ACCOUNT);
    return user !== null ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

const deleteAccountToStorage = () => {
  return AsyncStorage.removeItem(KEY_ACCOUNT);
};

export {setAccountToStorage, getAccountToStorage, deleteAccountToStorage};
