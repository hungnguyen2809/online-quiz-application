import {appScreens} from './config-screen';
import {Navigation} from 'react-native-navigation';
import ChooseQiuzScreen from './ChooseQiuzScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import MenuLeftScreen from './MenuLeft';
import RegisterScreen from './RegisterScreen';
import ExamQuestionsScreen from './ExamQuestionsScreen';
import ProfileScreen from './ProfileScreen';

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
  registerComponentWithoutRedux(appScreens.Home.name, HomeScreen);
  registerComponentWithoutRedux(appScreens.MenuLeft.name, MenuLeftScreen);
  registerComponentWithoutRedux(appScreens.ChooseQiuz.name, ChooseQiuzScreen);
  registerComponentWithoutRedux(
    appScreens.ExamQuestions.name,
    ExamQuestionsScreen,
  );
  registerComponentWithoutRedux(appScreens.Profile.name, ProfileScreen);
};

export default RegisterScreenComponent;
