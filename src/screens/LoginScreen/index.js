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
import Spinner from 'react-native-loading-spinner-overlay';

import {checkEmail, checkEmpty} from '../../common/validate';
import {Navigation} from 'react-native-navigation';
import NetInfo from '@react-native-community/netinfo';
import {Encript} from './../../common/encoding';

import {LOGIN} from './../../constants/api/loginRegister';
import {URL_LOGIN, URL_USERS} from './../../constants/api/urlApi';
import {GET2} from './../../constants/api/auth';

import {
  getAccountToStorage,
  setAccountToStorage,
  deleteAccountToStorage,
} from './../../common/asyncStorage';

const isIOS = Platform.OS === 'ios';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    this.isConnectedInternet = false;

    this.inputTextPassword = React.createRef();

    this.showKeyboard = false;
    this.createEventKeyboard();
  }

  componentDidMount() {
    this.unsubscribeEventNetInfo = NetInfo.addEventListener((state) => {
      this.isConnectedInternet = state.isInternetReachable;
    });
    this._handleExistsAccount();
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
    } else if (password.length < 5) {
      this._onToastAlert('Mật khẩu tối thiểu 5 ký tự.');
      return false;
    } else {
      return true;
    }
  };

  _handleExistsAccount = async () => {
    const result = await getAccountToStorage();
    // console.log('ket qua', result);
    this.setState({loading: true});
    if (result) {
      try {
        const id = result.id;
        const token = result.token;
        await GET2(URL_USERS, {id}, token);
        setTimeout(() => {
          Navigation.setRoot(screenMain);
          this.setState({loading: false});
        }, 1500);
      } catch (error) {
        if (error.response) {
          const {status} = error.response;
          if (status === 400 || status === 401) {
            this._onToastAlert('Phiên hết hạn. Vui lòng đăng nhập lại.');
            deleteAccountToStorage();
            setTimeout(() => {
              this.setState({loading: false});
            }, 1500);
          }
        } else {
          this._onToastAlert('Hiện tại không thể thực hiện. Vui lòng thử lại.');
          setTimeout(() => {
            this.setState({loading: false});
          }, 1500);
        }
      }
    } else {
      setTimeout(() => {
        this.setState({loading: false});
      }, 1500);
    }
  };

  _handleLogin = async (email, password) => {
    try {
      const result = await LOGIN(URL_LOGIN, {email, password});
      // console.log(result.data);
      setAccountToStorage(result.data.payload);
      setTimeout(() => {
        this.setState({loading: false}, () => {
          Navigation.setRoot(screenMain);
        });
      }, 1500);
    } catch (error) {
      // console.log(error.response);
      if (error.response) {
        const {status} = error.response;
        if (status === 404) {
          this._onToastAlert('Tài khoản không tồn tại.');
        } else if (status === 403) {
          this._onToastAlert('Thông tin email hoặc mật khẩu không chính xác.');
        } else if (status === 406) {
          this._onToastAlert('Tài khoản hiện tại đang bị khoá.');
        } else {
          this._onToastAlert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
      } else {
        this._onToastAlert(
          'Hiện tại không thể thực hiện. Vui lòng thử lại sau.',
        );
      }

      setTimeout(() => {
        this.setState({loading: false});
      }, 1500);
    }
  };

  onSubmit = () => {
    this.dismissKeyboard();

    if (this.isConnectedInternet) {
      const email = this.state.email.trim();
      const password = this.state.password.trim();
      if (this._handleValidate(email, password)) {
        const passwordHas = Encript(email, password);
        this.setState({loading: true});
        this._handleLogin(email, passwordHas);
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
        <Spinner visible={this.state.loading} />
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
