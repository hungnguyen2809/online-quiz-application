/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';

import InputEmailComponent from './components/InputEmailComponent';
import InputPasswordComponent from './components/InputPasswordComponent';

import Toast from '../../components/Toast';
import {checkEmail, checkString} from '../../common/validate';

const isIOS = Platform.OS === 'ios';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.toast = React.createRef();
    this.inputTextPassword = React.createRef();

    this.showKeyboard = false;
    this.createEventKeyboard();
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
    if (!checkString(email)) {
      this._onToastAlert('Bạn chưa điền email !');
      return false;
    } else if (!checkString(password)) {
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
    let email = this.state.email.trim();
    let password = this.state.password.trim();
    if (this._handleValidate(email, password)) {
      // let infor = {
      //   email,
      //   password,
      // };
      // console.log('Infor: ', infor);
      this.toast.current.onShowToast('Success');
      this.dismissKeyboard();
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

  render() {
    return (
      <>
        {!isIOS && <StatusBar backgroundColor={'#00E4FF'} />}
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
              <TouchableOpacity>
                <Text style={styles.textForgert}>Quyên mật khẩu?</Text>
              </TouchableOpacity>
              <Text style={{textAlign: 'center', fontSize: 14}}>hoặc</Text>
              <TouchableOpacity>
                <Text style={styles.textRegister}>Đăng ký ngay?</Text>
              </TouchableOpacity>
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
  }
}

export default LoginScreen;
