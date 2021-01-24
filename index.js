import {Navigation} from 'react-native-navigation';
import {screenNavigate} from './src/screens/config-screen';
import RegisterScreenComponent from './src/screens/RegisterScreens';

RegisterScreenComponent();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(screenNavigate);
});
