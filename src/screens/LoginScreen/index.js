/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {appScreens, screenMain} from './../config-screen';

import InputEmailComponent from './components/InputEmailComponent';
import InputPasswordComponent from './components/InputPasswordComponent';

import Toast from '../../components/Toast';
import {checkEmail, checkEmpty} from '../../common/validate';
import {Navigation} from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';
import {Encript, Decript} from './../../common/encoding';

const isIOS = Platform.OS === 'ios';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.isConnectedInternet = false;

    this.toast = React.createRef();
    this.inputTextPassword = React.createRef();

    this.showKeyboard = false;
    this.createEventKeyboard();
  }

  componentDidMount() {
    this.unsubscribeEventNetInfo = NetInfo.addEventListener((state) => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      this.isConnectedInternet = state.isConnected;
    });
  }

  onChangeEmail = (email) => {
    this.setState({...this.state, email});
  };

  onChangePassword = (password) => {
    this.setState({...this.state, password});
  };

  _onToastAlert = (msg) => {
    isIOS
      ? Alert.alert('Thông báo', msg)
      : ToastAndroid.showWithGravityAndOffset(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          20,
        );
  };

  _handleValidate = (email, password) => {
    if (!checkEmpty(email)) {
      this._onToastAlert('Bạn chưa điền email !');
      return false;
    } else if (!checkEmpty(password)) {
      this._onToastAlert('Bạn chưa điền mật khẩu !');
      return false;
    } else if (!checkEmail(email)) {
      this._onToastAlert('Email không đúng định dạng !');
      return false;
    } else {
      return true;
    }
  };

  onSubmit = () => {
    if (this.isConnectedInternet) {
      // Navigation.setRoot(screenMain);
      let email = this.state.email.trim();
      let password = this.state.password.trim();
      if (this._handleValidate(email, password)) {
        const token = Encript(email + '-' + password);
        const user = {
          email: email,
          token: token,
        };
        Navigation.setRoot(screenMain);

        console.log('User: ', JSON.stringify(user));
        // this.toast.current.onShowToast('Success');
        this.dismissKeyboard();
      }
    } else {
      this._onToastAlert('Không có kết nối internet.');
    }
  };

  createEventKeyboard = () => {
    this.eventShowKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      this.showKeyboard = true;
    });
    this.eventHideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      this.showKeyboard = false;
    });
  };

  dismissKeyboard = () => {
    if (this.showKeyboard) {
      Keyboard.dismiss();
    }
  };

  autoFocusPassword = () => {
    this.inputTextPassword.current.onSetFocusPassword();
  };

  _onGoToScreen = (screen) => {
    if (this.isConnectedInternet) {
      Navigation.push(this.props.componentId, {
        component: {
          name: screen.name,
        },
      });
    } else {
      this._onToastAlert('Không có kết nối internet.');
    }
  };

  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.title}>Đăng nhập</Text>
            </View>
            <View style={styles.center}>
              <InputEmailComponent
                onChangeText={this.onChangeEmail}
                onSubmitEditing={this.autoFocusPassword}
              />
              <InputPasswordComponent
                ref={this.inputTextPassword}
                setFocusInput={this.autoFocusPassword}
                onChangeText={this.onChangePassword}
                onSubmitEditing={this.onSubmit}
              />
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.btnLogin}
                activeOpacity={0.6}
                onPress={this.onSubmit}>
                <Text style={styles.textLogin}>Đăng nhập</Text>
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this._onGoToScreen(appScreens.ForgetPassword);
                  }}>
                  <Text style={styles.textForgert}>Quyên mật khẩu?</Text>
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 14}}>hoặc</Text>
                <TouchableOpacity
                  onPress={() => {
                    this._onGoToScreen(appScreens.Register);
                  }}>
                  <Text style={styles.textRegister}>Đăng ký ngay?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Toast ref={this.toast} position={'bottom'} />
      </>
    );
  }

  componentWillUnmount() {
    Keyboard.removeListener(this.eventHideKeyboard);
    Keyboard.removeListener(this.eventShowKeyboard);
    this.unsubscribeEventNetInfo && this.unsubscribeEventNetInfo();
  }
}

export default LoginScreen;
