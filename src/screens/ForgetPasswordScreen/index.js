import React, {Component} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import InputCustomComponent from './../../components/InputCustom';

import {isInteger, trim} from 'lodash';
import {checkEmail, checkEmpty} from './../../common/validate';

const isIOS = Platform.OS === 'ios';

class ForgetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
    };
  }

  static options(props) {
    return {
      topBar: {
        visible: true,
        animate: true,
        title: {
          text: 'Quyên mật khẩu',
        },
      },
    };
  }

  _onChangeEmail = (email) => {
    this.setState({email});
  };

  _onChangeCode = (code) => {
    this.setState({code});
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

  _onValidateEmail = () => {
    const {email} = this.state;
    if (!checkEmpty(trim(email))) {
      this._onToastAlert('Bạn chưa điền địa chỉ email.');
      return false;
    } else if (!checkEmail(trim(email))) {
      this._onToastAlert('Email không đúng định dạng.');
      return false;
    }
    return true;
  };

  _onValidateCode = () => {
    const {code} = this.state;
    if (!checkEmpty(trim(code))) {
      this._onToastAlert('Bạn chưa nhập mã xác minh.');
      return false;
    } else if (!isInteger(code)) {
      this._onToastAlert('Mã xác minh phải là một số.');
      return false;
    }
    return true;
  };

  _handleSubmit = () => {
    if (this.state.editableInputCode === false) {
      if (this._onValidateEmail()) {
        console.log('Gửi code');
      }
    } else {
      if (this._onValidateCode()) {
        console.log('So sánh code');
      }
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wapperInput}>
          <Text style={styles.titleInput}>Nhập địa chỉ email:</Text>
          <InputCustomComponent
            icons={'email-outline'}
            returnKeyType={'go'}
            keyboardType={'email-address'}
            maxLength={60}
            onChangeText={this._onChangeEmail}
          />
        </View>
        <TouchableOpacity
          style={styles.wapperButton}
          onPress={this._handleSubmit}>
          <Text style={styles.titleButton}>Xác nhận</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wapperInput: {
    marginTop: 20,
    marginHorizontal: '5%',
  },
  wapperButton: {
    marginTop: 25,
    backgroundColor: '#0097e6',
    padding: 13,
    marginHorizontal: '6%',
    borderRadius: 10,
  },
  titleButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
