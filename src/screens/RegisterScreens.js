import {Navigation} from 'react-native-navigation';
import {appScreens} from './config-screen';
import LoginScreen from './Login';

const registerComponentWithoutRedux = (srceenName, ComponentProvider) => {
  Navigation.registerComponent(srceenName, () => ComponentProvider);
};

const RegisterScreenComponent = () => {
  registerComponentWithoutRedux(appScreens.Login.name, LoginScreen);
};

export default RegisterScreenComponent;
