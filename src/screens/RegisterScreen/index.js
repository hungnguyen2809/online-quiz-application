import React, {Component} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import InputCustomComponent from './components/InputCustom';
import {isEqual, trim} from 'lodash';
import {checkEmail, checkEmpty} from './../../common/validate';
import ModalCodeComponent from '../../components/ModalCode';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  getAccountToStorage,
  setAccountToStorage,
} from './../../common/asyncStorage';
import {Encript} from './../../common/encoding';
import {GET2, POST} from './../../constants/api';
import {URL_REGISTER, URL_HASEMAIL} from './../../constants/urlApi';

import {setRootScreen} from './../MethodScreen';
import {screenMain} from './../config-screen';

const isIOS = Platform.OS === 'ios';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.inputEmailRef = React.createRef();
    this.inputNameRef = React.createRef();
    this.inputPasswordRef = React.createRef();
    this.inputRePasswordRef = React.createRef();
    this.modalCode = React.createRef();

    this.state = {
      email: '',
      name: '',
      password: '',
      repassword: '',
      loading: false,
    };
  }

  static options(props) {
    return {
      topBar: {
        visible: true,
        animate: true,
        title: {
          text: 'Tạo mới tài khoản',
        },
      },
    };
  }

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

  _handleFocusInput = (inputRef) => {
    inputRef.current.onSetFocus();
  };

  _onChangeEmail = (email) => {
    this.setState({email});
  };

  _onChangeName = (name) => {
    this.setState({name});
  };

  _onChangePassword = (password) => {
    this.setState({password});
  };

  _onChangeRePassword = (repassword) => {
    this.setState({repassword});
  };

  _onValidateContent = () => {
    const {email, name, password, repassword} = this.state;
    if (!checkEmpty(trim(email))) {
      this._onToastAlert('Bạn chưa điền địa chỉ email.');
      return false;
    } else if (!checkEmail(trim(email))) {
      this._onToastAlert('Email không đúng định dạng.');
      return false;
    } else if (!checkEmpty(trim(name))) {
      this._onToastAlert('Bạn chưa điền họ tên.');
      return false;
    } else if (!checkEmpty(trim(password))) {
      this._onToastAlert('Bạn chưa điền mật khẩu.');
      return false;
    } else if (password.trim().length < 5) {
      this._onToastAlert('Mật khẩu tối thiểu 5 ký tự.');
      return false;
    } else if (!checkEmpty(trim(repassword))) {
      this._onToastAlert('Bạn chưa nhập lại mật khẩu.');
      return false;
    } else if (!isEqual(password, repassword)) {
      this._onToastAlert('Mật khẩu nhập lại không đúng.');
      return false;
    }
    return true;
  };

  _onShowModalCode = async () => {
    const {email} = this.state;
    if (this._onValidateContent()) {
      try {
        const result = await GET2(URL_HASEMAIL, {email});
        // console.log(result.data);
        if (result.status === 200) {
          this.modalCode.current.onShowModal(email);
        }
      } catch (error) {
        if (error.response) {
          const {status} = error.response;
          // console.log(status);
          if (status === 400) {
            this._onToastAlert('Địa chỉ email đã tồn tại.');
          } else {
            this._onToastAlert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
          }
        } else {
          this._onToastAlert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
      }
    }
  };

  _handleSubmitRegisterUser = async () => {
    const {email, name, password} = this.state;
    this.setState({loading: true});
    const body = {
      email: trim(email),
      name: trim(name),
      token: Encript(email, password),
    };
    // console.log('Register', user);
    try {
      const result = await POST(URL_REGISTER, body);
      if (result.status === 201) {
        const user = result.data.payload;
        await setAccountToStorage(user);
        const userInfo = await getAccountToStorage();
        setTimeout(() => {
          this.setState({loading: false}, () => {
            if (userInfo) {
              setRootScreen(screenMain);
            } else {
              this._onToastAlert('Lỗi lưu dữ liệu. Vui lòng thử lại sau.');
            }
          });
        }, 2000);
      }
    } catch (error) {
      this._onToastAlert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.wapperContent}>
            <View>
              <Text style={styles.titleInput}>Địa chỉ email:</Text>
              <InputCustomComponent
                ref={this.inputEmailRef}
                icons={'email-outline'}
                returnKeyType={'go'}
                keyboardType={'email-address'}
                maxLength={60}
                onChangeText={this._onChangeEmail}
                value={this.state.email}
                onSubmitEditing={() => {
                  this._handleFocusInput(this.inputNameRef);
                }}
              />
            </View>
            <View>
              <Text style={styles.titleInput}>Họ tên:</Text>
              <InputCustomComponent
                ref={this.inputNameRef}
                icons={'account'}
                returnKeyType={'go'}
                maxLength={60}
                onChangeText={this._onChangeName}
                value={this.state.name}
                onSubmitEditing={() => {
                  this._handleFocusInput(this.inputPasswordRef);
                }}
              />
            </View>
            <View>
              <Text style={styles.titleInput}>Mật khẩu:</Text>
              <InputCustomComponent
                ref={this.inputPasswordRef}
                icons={'key-variant'}
                password={true}
                returnKeyType={'go'}
                maxLength={20}
                onChangeText={this._onChangePassword}
                value={this.state.password}
                onSubmitEditing={() => {
                  this._handleFocusInput(this.inputRePasswordRef);
                }}
              />
            </View>
            <View>
              <Text style={styles.titleInput}>Nhập lại mật khẩu:</Text>
              <InputCustomComponent
                ref={this.inputRePasswordRef}
                icons={'key-change'}
                password={true}
                returnKeyType={'done'}
                maxLength={20}
                onChangeText={this._onChangeRePassword}
                value={this.state.repassword}
                onSubmitEditing={this._onShowModalCode}
              />
            </View>
          </View>
          <View style={styles.wapperBottom}>
            <TouchableOpacity
              style={styles.wapperButton}
              onPress={this._onShowModalCode}>
              <Text style={styles.titleButton}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ModalCodeComponent
          ref={this.modalCode}
          onHandleEventSuccess={this._handleSubmitRegisterUser}
        />
        <Spinner visible={this.state.loading} />
      </>
    );
  }
}

export default RegisterScreen;
