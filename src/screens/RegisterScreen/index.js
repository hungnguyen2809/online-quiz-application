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
    } else if (!checkEmpty(trim(repassword))) {
      this._onToastAlert('Bạn chưa nhập lại mật khẩu.');
      return false;
    } else if (!isEqual(password, repassword)) {
      this._onToastAlert('Mật khẩu nhập lại không đúng.');
      return false;
    }
    return true;
  };

  _onShowModalCode = () => {
    const {email} = this.state;
    if (this._onValidateContent()) {
      this.modalCode.current.onShowModal(email);
    }
  };

  _handleSubmitRegisterUser = () => {
    // const {email, name, password} = this.state;
    // const user = {
    //   email: trim(email),
    //   name: trim(name),
    //   password: trim(password),
    // };
    console.log('Register');
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
      </>
    );
  }
}

export default RegisterScreen;
