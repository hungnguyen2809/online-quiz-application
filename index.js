import {Navigation} from 'react-native-navigation';
import {screenAuth} from './src/screens/config-screen';
import RegisterScreenComponent from './src/screens/RegisterScreensComponent';
import GlobalFont from 'react-native-global-font';
import {fonts} from './src/common/fonts';

RegisterScreenComponent();
GlobalFont.applyGlobal(fonts.OpenSans);

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
  statusBar: {
    style: 'dark',
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(screenAuth);
});
