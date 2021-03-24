import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import stores from './../redux/stores';
import {appScreens} from './config-screen';

import ChooseQiuzScreen from './ChooseQiuzScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import MenuLeftScreen from './MenuLeft';
import RegisterScreen from './RegisterScreen';
import ExamQuestionsScreen from './ExamQuestionsScreen';
import ProfileScreen from './ProfileScreen';
import ProfileDetailsScreen from './ProfileDetailsScreen';

const registerComponentWithoutRedux = (srceenName, ComponentProvider) => {
  Navigation.registerComponent(srceenName, () => ComponentProvider);
};

const registerComponentWithRedux = (srceenName, ComponentProvider, store) => {
  Navigation.registerComponent(
    srceenName,
    () => (props) => (
      <Provider store={store}>
        <ComponentProvider {...props} />
      </Provider>
    ),
    () => ComponentProvider,
  );
};

const RegisterScreenComponent = () => {
  registerComponentWithRedux(appScreens.Login.name, LoginScreen, stores);
  registerComponentWithoutRedux(appScreens.Register.name, RegisterScreen);
  registerComponentWithoutRedux(
    appScreens.ForgetPassword.name,
    ForgetPasswordScreen,
  );
  registerComponentWithoutRedux(appScreens.Home.name, HomeScreen);
  registerComponentWithoutRedux(appScreens.MenuLeft.name, MenuLeftScreen);
  registerComponentWithoutRedux(appScreens.ChooseQiuz.name, ChooseQiuzScreen);
  registerComponentWithoutRedux(
    appScreens.ExamQuestions.name,
    ExamQuestionsScreen,
  );
  registerComponentWithRedux(appScreens.Profile.name, ProfileScreen, stores);
  registerComponentWithoutRedux(
    appScreens.ProfileDetails.name,
    ProfileDetailsScreen,
  );
};

export default RegisterScreenComponent;
