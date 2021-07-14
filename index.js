import {AppState} from 'react-native';
import CodePush from 'react-native-code-push';
import GlobalFont from 'react-native-global-font';
import {Navigation} from 'react-native-navigation';
import {fonts} from './src/common/fonts';
import NotifiManager from './src/notifications/NotificationManager';
import {screenAuth} from './src/screens/config-screen';
import RegisterScreenComponent from './src/screens/RegisterScreensComponent';

GlobalFont.applyGlobal(fonts.OpenSans);

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
  statusBar: {
    style: 'dark',
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  start();
});

const checkCodePushUpdate = () => {
  return CodePush.sync({
    updateDialog: true,
    installMode: CodePush.InstallMode.IMMEDIATE,
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  });
};

const start = () => {
  checkCodePushUpdate()
    .then((status) => {
      //Có sự thay đổi cập nhật
      console.log('Start: codePush.sync completed with status: ', status);
      startApp();
    })
    .catch(() => {
      //Không có sự thay đổi cập nhật
      startApp();
    });
};

const startApp = () => {
  startNavigation();
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      checkCodePushUpdate();
    }
  });
};

const startNavigation = () => {
  Navigation.setRoot(screenAuth);
};
