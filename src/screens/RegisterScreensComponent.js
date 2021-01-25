import {Navigation} from 'react-native-navigation';
import {appScreens} from './config-screen';

import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import MenuLeftScreen from './MenuLeft';
import RegisterScreen from './RegisterScreen';

const registerComponentWithoutRedux = (srceenName, ComponentProvider) => {
  Navigation.registerComponent(srceenName, () => ComponentProvider);
};

export const goToScreen = (componentId, screen) => {
  Navigation.push(componentId, {
    component: {
      id: screen.id,
      name: screen.name,
    },
  });
};

export const showModalApp = (modal) => {
  Navigation.showModal({
    component: {
      id: modal.id,
      name: modal.name,
    },
  });
};

export const goToScreenWidthPassProps = (componentId, screen, passProps) => {
  Navigation.push(componentId, {
    component: {
      id: screen.id,
      name: screen.name,
      passProps: passProps,
    },
  });
};

export const showModalWidthPassProps = (modal, passProps) => {
  Navigation.showModal({
    component: {
      id: modal.id,
      name: modal.name,
      passProps: passProps,
    },
  });
};

const RegisterScreenComponent = () => {
  registerComponentWithoutRedux(appScreens.Login.name, LoginScreen);
  registerComponentWithoutRedux(appScreens.Register.name, RegisterScreen);
  registerComponentWithoutRedux(
    appScreens.ForgetPassword.name,
    ForgetPasswordScreen,
  );
  registerComponentWithoutRedux(appScreens.Home.name, HomeScreen);
  registerComponentWithoutRedux(appScreens.MenuLeft.name, MenuLeftScreen);
};

export default RegisterScreenComponent;
