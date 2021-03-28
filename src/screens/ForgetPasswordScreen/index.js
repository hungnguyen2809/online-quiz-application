/* eslint-disable react-native/no-inline-styles */
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
import InputCustomComponent from './../../components/InputCustom';
import ModalCode from './../../components/ModalCode';
import {trim} from 'lodash';
import {checkEmail, checkEmpty} from './../../common/validate';
import {styles} from './styles';
import {backToLastScreen} from './../../screens/MethodScreen';
import {
  forgetPasswordAccountAction,
  hasEmailAccountAction,
} from './../../redux/Account/actions';
import {connect} from 'react-redux';
import {Encript} from './../../common/encoding';

const isIOS = Platform.OS === 'ios';

class ForgetPasswordScreen extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      newPass: '',
      isSubmit: false,
    };

    this.refModalCode = React.createRef();
    this.refEmail = React.createRef();
    this.refCode = React.createRef();
  }

  componentDidMount() {
    // this.refEmail.current.onSetFocus();
  }

  _onChangeEmail = (email) => {
    this.setState({email});
  };

  _onChangePass = (pass) => {
    this.setState({newPass: pass});
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

  _onValidatePass = () => {
    const {newPass} = this.state;
    if (!checkEmpty(trim(newPass))) {
      this._onToastAlert('Bạn chưa nhập mật khẩu.');
      return false;
    } else if (newPass.length < 5) {
      this._onToastAlert('Mật khẩu tối thiểu 5 ký tự');
      return false;
    }
    return true;
  };

  _handleSendCode = () => {
    if (this._onValidateEmail()) {
      const {email} = this.state;
      const payload = {email};
      this.props.doHasEmailAccount(payload, {
        callbacksOnSuccess: ({exists}) => {
          if (exists === true) {
            this.refModalCode.current.onShowModal(email);
          } else {
            this._onToastAlert('Địa chỉ email không tồn tại trên hệ thống !');
          }
        },
        callbacksOnFail: (erCode) => {
          if (erCode === -1) {
            this._onToastAlert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
          }
        },
      });
    }
  };

  _handleSubmitFoget = () => {
    if (this._onValidatePass()) {
      const payload = {
        email: this.state.email,
        password: Encript(this.state.email, this.state.newPass),
      };

      this.props.doFogetPassword(payload, {
        callbacksOnSuccess: () => {
          Alert.alert('Thông báo !', 'Cập nhật thành công', [
            {
              text: 'OK',
              onPress: () => {
                this._goBackScreen();
              },
            },
          ]);
        },
        callbacksOnFail: (erCode) => {
          Alert.alert('Thông báo !', 'Cập nhật thất bại');
        },
      });
    }
  };

  onHandleEventSuccess = () => {
    this.setState({isSubmit: true}, () => {
      setTimeout(() => {
        this.refCode.current.onSetFocus();
      }, 500);
    });
  };

  _goBackScreen = () => {
    backToLastScreen(this.props.componentId);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.wapperInput}>
            <Text style={styles.titleInput}>Nhập địa chỉ email:</Text>
            <InputCustomComponent
              ref={this.refEmail}
              icons={'email-outline'}
              returnKeyType={'done'}
              keyboardType={'email-address'}
              maxLength={60}
              onChangeText={this._onChangeEmail}
              onSubmitEditing={this._handleSendCode}
            />
          </View>
          {this.state.isSubmit ? (
            <View style={styles.wapperInput}>
              <Text style={styles.titleInput}>Mật khẩu mới:</Text>
              <InputCustomComponent
                ref={this.refCode}
                icons={'key-star'}
                returnKeyType={'go'}
                maxLength={60}
                onChangeText={this._onChangePass}
                onSubmitEditing={this._handleSubmitFoget}
              />
            </View>
          ) : null}
          {this.state.isSubmit ? (
            <TouchableOpacity
              style={styles.wapperButtonSubmit}
              onPress={this._handleSubmitFoget}>
              <Text style={styles.titleButton}>Xác nhận</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.wapperButton}
              onPress={this._handleSendCode}>
              <Text style={styles.titleButton}>Gửi mã</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <ModalCode
          ref={this.refModalCode}
          onHandleEventSuccess={this.onHandleEventSuccess}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doHasEmailAccount: (payload, callbacks) => {
      dispatch(hasEmailAccountAction(payload, callbacks));
    },
    doFogetPassword: (payload, callbacks) => {
      dispatch(forgetPasswordAccountAction(payload, callbacks));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPasswordScreen);
