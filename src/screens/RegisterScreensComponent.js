import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import stores from './../redux/stores';
import {appScreens} from './config-screen';

import App from '../../App';
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
import PostDetailsScreen from './PostDetailsScreen';
import PostCreateScreen from './PostCreateScreen';

// const registerComponentWithoutRedux = (srceenName, ComponentProvider) => {
//   Navigation.registerComponent(srceenName, () => ComponentProvider);
// };

const registerComponentWithRedux = (srceenName, ComponentProvider, store) => {
  Navigation.registerComponent(
    srceenName,
    () => (props) => (
      <Provider store={store}>
        <MenuProvider skipInstanceCheck={true}>
          <ComponentProvider {...props} />
        </MenuProvider>
      </Provider>
    ),
    () => ComponentProvider,
  );
};

const RegisterScreenComponent = () => {
  registerComponentWithRedux(appScreens.AppRoot.name, App, stores);
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
  registerComponentWithRedux(
    appScreens.PostDetailsScreen.name,
    PostDetailsScreen,
    stores,
  );
  registerComponentWithRedux(
    appScreens.PostCreatesScreen.name,
    PostCreateScreen,
    stores,
  );
};

export default RegisterScreenComponent;
