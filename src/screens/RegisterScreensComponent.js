import {Navigation} from 'react-native-navigation';
import {appScreens} from './config-screen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const registerComponentWithoutRedux = (srceenName, ComponentProvider) => {
  Navigation.registerComponent(srceenName, () => ComponentProvider);
};

const RegisterScreenComponent = () => {
  registerComponentWithoutRedux(appScreens.Login.name, LoginScreen);
  registerComponentWithoutRedux(appScreens.Register.name, RegisterScreen);
  registerComponentWithoutRedux(
    appScreens.ForgetPassword.name,
    ForgetPasswordScreen,
  );
};

export default RegisterScreenComponent;
