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
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {Navigation} from 'react-native-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import {styles} from './styles';
import {appScreens, screenMain} from './../config-screen';
import InputEmailComponent from './components/InputEmailComponent';
import InputPasswordComponent from './components/InputPasswordComponent';
import {checkEmail, checkEmpty} from '../../common/validate';
import {Encript} from './../../common/encoding';
import SplashScreen from 'react-native-splash-screen';

import {
  LoginAccountAction,
  LoginAccountActionSuccess,
} from './../../redux/Account/actions';

import {
  getAccountToStorage,
  setAccountToStorage,
} from './../../common/asyncStorage';

const isIOS = Platform.OS === 'ios';

class LoginScreen extends Component {
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

    setTimeout(() => {
      SplashScreen.hide();
      this._handleExistsAccount();
    }, 1000);
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
          ToastAndroid.LONG,
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
    this.setState({loading: true});
    const result = await getAccountToStorage();
    if (result !== null) {
      Navigation.setRoot(screenMain);
      this.props.dispatch(LoginAccountActionSuccess(result));
    }
    this.setState({loading: false});
  };

  _handleSubmitLogin = (email, passwordHas) => {
    const body = {
      email,
      password: passwordHas,
    };
    this.props.doHandleLoginAccount(body, {
      callbacksOnSuccess: (account) => {
        setAccountToStorage(account);
        this.setState({loading: false}, () => {
          Navigation.setRoot(screenMain);
        });
      },
      callbacksOnFail: (errorCode) => {
        if (errorCode !== -1) {
          if (errorCode === 404) {
            this._onToastAlert('Tài khoản không tồn tại.');
          } else if (errorCode === 403) {
            this._onToastAlert(
              'Thông tin email hoặc mật khẩu không chính xác.',
            );
          } else if (errorCode === 406) {
            this._onToastAlert('Tài khoản hiện tại đang bị khoá.');
          } else {
            this._onToastAlert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
          }
        } else {
          this._onToastAlert(
            'Hiện tại không thể thực hiện. Vui lòng thử lại sau.',
          );
        }
        this.setState({loading: false});
      },
    });
  };

  onSubmit = () => {
    this.dismissKeyboard();
    if (this.isConnectedInternet) {
      const email = this.state.email.trim();
      const password = this.state.password.trim();
      if (this._handleValidate(email, password)) {
        const passwordHas = Encript(email, password);
        this.setState({loading: true});
        this._handleSubmitLogin(email, passwordHas);
      }
    } else {
      this._onToastAlert('Không có kết nối internet. Vui lòng kiểm tra lại.');
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

  _onGoToScreen = async (screen) => {
    if (this.isConnectedInternet) {
      await Navigation.push(this.props.componentId, {
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

const mapStateToProps = (state) => {
  // console.log("account: ", state.account);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    doHandleLoginAccount: (data, callbacks) => {
      dispatch(LoginAccountAction(data, callbacks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
