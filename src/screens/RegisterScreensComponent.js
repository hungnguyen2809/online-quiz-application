import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import stores from './../redux/stores';
import {appScreens} from './config-screen';

import ChooseTopicScreen from './ChooseTopicScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import MenuLeftScreen from './MenuLeft';
import RegisterScreen from './RegisterScreen';
import ExamQuestionsScreen from './ExamQuestionsScreen';
import ProfileScreen from './ProfileScreen';
import ProfileDetailsScreen from './ProfileDetailsScreen';
import ChooseQuestionScreen from './ChooseQuestionScreen';
import ForumScreen from './ForumScreen';
import ResultExamScreen from './ResultExamScreen';

// const registerComponentWithoutRedux = (srceenName, ComponentProvider) => {
//   Navigation.registerComponent(srceenName, () => ComponentProvider);
// };

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
  registerComponentWithRedux(appScreens.Register.name, RegisterScreen, stores);
  registerComponentWithRedux(
    appScreens.ForgetPassword.name,
    ForgetPasswordScreen,
    stores,
  );
  registerComponentWithRedux(appScreens.Home.name, HomeScreen, stores);
  registerComponentWithRedux(appScreens.MenuLeft.name, MenuLeftScreen);
  registerComponentWithRedux(
    appScreens.ChooseTopicScreen.name,
    ChooseTopicScreen,
    stores,
  );
  registerComponentWithRedux(
    appScreens.ExamQuestions.name,
    ExamQuestionsScreen,
    stores,
  );
  registerComponentWithRedux(appScreens.Profile.name, ProfileScreen, stores);
  registerComponentWithRedux(
    appScreens.ProfileDetails.name,
    ProfileDetailsScreen,
    stores,
  );
  registerComponentWithRedux(
    appScreens.ChooseQuestionScreen.name,
    ChooseQuestionScreen,
    stores,
  );
  registerComponentWithRedux(appScreens.ForumScreen.name, ForumScreen, stores);
  registerComponentWithRedux(
    appScreens.ResultExamScreen.name,
    ResultExamScreen,
    stores,
  );
};

export default RegisterScreenComponent;
