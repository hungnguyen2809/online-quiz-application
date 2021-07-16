import React, {Component} from 'react';
import {Alert, AppState, Platform, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import CodePush from 'react-native-code-push';
import ModalAppUpdate from './../components/ModalAppUpdate';

const OPTION_CODEPUSH = {checkFrequency: CodePush.CheckFrequency.MANUAL};
const isProduct = Config.CODE_PUSH_PRODCUTION === 'true';

const codePushKeys = {
  staging: Platform.select({
    ios: Config.CODE_PUSH_KEY_IOS_STAGING,
    android: Config.CODE_PUSH_KEY_ANDROID_STAGING,
  }),
  production: Platform.select({
    ios: Config.CODE_PUSH_KEY_IOS_PRODUCTION,
    android: Config.CODE_PUSH_KEY_ANDROID_PRODUCTION,
  }),
};

class CodePushManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalUpdate: false,
      disableBtn: false,
      progress: 0,
    };
  }

  componentDidMount() {
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
        console.log('Status [checkForUpdate]: ', value);
        if (value && !value.failedInstall) {
          this.setState({showModalUpdate: true});
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
    if (status === CodePush.SyncStatus.SYNC_IN_PROGRESS) {
    }
    if (status === CodePush.SyncStatus.UNKNOWN_ERROR) {
      this.setState({disableBtn: false});
      Alert.alert('Thông báo', 'Cập nhật thất bại.');
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
              console.log('Status [CodePush.sync]', status);
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
              console.log('Status [CodePush.sync]', status);
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

  render() {
    return (
      <View style={styles.container}>
        <ModalAppUpdate
          visible={this.state.showModalUpdate}
          isProduct={isProduct}
          disabled={this.state.disableBtn}
          progress={this.state.progress}
          onPressUpdate={this.onUpdateApp}
        />
      </View>
    );
  }
}

export default CodePush(OPTION_CODEPUSH)(CodePushManager);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
