import App from './App';
import {Navigation} from 'react-native-navigation';
import GlobalFont from 'react-native-global-font';
import {fonts} from './src/common/fonts';
import NotifiManager from './src/notifications/NotificationManager';
import RegisterScreenComponent from './src/screens/RegisterScreensComponent';

GlobalFont.applyGlobal(fonts.OpenSans);

Navigation.registerComponent('AppRootScreen', () => App);
RegisterScreenComponent();
NotifiManager.RegisterEvent();

Navigation.setDefaultOptions({
  bottomTab: {
    fontSize: 13,
    iconColor: '#dcdde1',
    selectedIconColor: '#fff',
    textColor: '#dcdde1',
    selectedTextColor: '#fff',
    fontWeight: '500',
    iconInsets: {
      top: 5,
      bottom: 2,
    },
  },
  bottomTabs: {
    backgroundColor: '#6a89cc',
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        id: 'app.screen.AppRoot',
        name: 'AppRootScreen',
      },
    },
  });
});
