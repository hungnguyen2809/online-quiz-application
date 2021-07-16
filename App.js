import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, View} from 'react-native';
import {AppState} from 'react-native';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import {Navigation} from 'react-native-navigation';
import {screenAuth, screenMain} from './src/screens/config-screen';
import {getAccountToStorage} from './src/common/asyncStorage';
import {LoginAccountActionSuccess} from './src/redux/Account/actions';
import ModalAppUpdate from './src/components/ModalAppUpdate';

const OPTION_CODEPUSH = {checkFrequency: CodePush.CheckFrequency.MANUAL};

const codePushKeys = {
  staging: Platform.select({
    ios: 'bM8sOBXq95YdDMSwwwIrH_6vo1H1aCc1LhPjx',
    android: 'eOdUG52ahdoEet0bEQ1hVxnP85Un-NOXUGln6',
  }),
  production: Platform.select({
    ios: 'yymQl61s82T4bkQz8jxJL5vA1lsG7KRPHSGNx',
    android: 'e1B47kSKt_0dxzUEu-gTh3L1CdZb2yjv8jxN7',
  }),
};

const isProduct = true;

class App extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showLottie: true,
      showModalUpdate: false,
      disableBtn: false,
      progress: 0,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    setTimeout(() => {
      this.setState({showLottie: false});
    }, 1500);

    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        this.onCheckCodePushUpdate();
      }
    });
    this.onCheckCodePushUpdate();
  }

  onCheckCodePushUpdate = () => {
    const key = isProduct ? codePushKeys.production : codePushKeys.staging;
    CodePush.checkForUpdate(key)
      .then((value) => {
        console.log('Status Update: ', value);
        if (value) {
          if (!value.failedInstall) {
            this.setState({showModalUpdate: true});
          } else {
            this.handleExistsAccount();
          }
        } else {
          this.handleExistsAccount();
        }
      })
      .catch((err) => {
        console.log('Error [checkForUpdateCodePush]: ', err);
      });
  };

  onStatusCodePush = (status) => {
    if (status === CodePush.SyncStatus.DOWNLOADING_PACKAGE) {
      console.log('Download Package');
      this.setState({disableBtn: true});
    }
    if (status === CodePush.SyncStatus.UNKNOWN_ERROR) {
      this.setState({disableBtn: false});
      Alert.alert('Thông báo', 'Cập nhật thất bại. Vui lòng thử lại');
    }
  };

  onProgressDownload = (progress) => {
    console.log('Progress', progress);
    this.setState({
      progress: Math.round(
        (progress.receivedBytes / progress.totalBytes) * 100,
      ),
    });
  };

  onUpdateCodePush = () => {
    CodePush.notifyAppReady()
      .then(() => {
        return isProduct;
      })
      .then((evProduction) => {
        if (evProduction) {
          CodePush.sync(
            {
              deploymentKey: codePushKeys.production,
              installMode: CodePush.InstallMode.IMMEDIATE,
            },
            this.onStatusCodePush,
            this.onProgressDownload,
          )
            .then((status) => {
              console.log('Status', status === CodePush.SyncStatus.UP_TO_DATE);
            })
            .catch(() => {
              console.log('Đã cập nhật');
            });
        } else {
          CodePush.sync(
            {
              deploymentKey: codePushKeys.staging,
              installMode: CodePush.InstallMode.IMMEDIATE,
            },
            this.onStatusCodePush,
            this.onProgressDownload,
          )
            .then((status) => {
              console.log('Status', status === CodePush.SyncStatus.UP_TO_DATE);
            })
            .catch(() => {
              console.log('Đã cập nhật');
            });
        }
      });
  };

  onUpdateApp = () => {
    this.onUpdateCodePush();
  };

  handleExistsAccount = async () => {
    const result = await getAccountToStorage();
    if (result !== null) {
      Navigation.setRoot(screenMain);
      this.props.dispatch(LoginAccountActionSuccess(result));
    } else {
      Navigation.setRoot(screenAuth);
    }
  };

  render() {
    return this.state.showLottie ? (
      <LottieView
        source={require('./src/assets/animated/question-mark.json')}
        autoPlay
        loop
      />
    ) : (
      <View style={styles.container}>
        <ModalAppUpdate
          visible={this.state.showModalUpdate}
          disabled={this.state.disableBtn}
          progress={this.state.progress}
          onPressUpdate={this.onUpdateApp}
        />
      </View>
    );
  }
}

export default CodePush(OPTION_CODEPUSH)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
