/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNModal from 'react-native-modal';
import InputCustomComponent from '../InputCustom';
import Toast from './../Toast/';
import {random, isEqual, toNumber} from 'lodash';

import {sendOTPCode} from './../../common/sendCodeEmail';

const WIDTH_SCREEN = Dimensions.get('window').width;
// const HEIGHT_SCREEN = Dimensions.get('window').height;

const TIME_OUT = 60; // second

class ModalCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.showKeyboard = false;
    this.eventKeybroadShow = null;
    this.eventKeybroadHide = null;
    this.eventTimeOutCode = null;
    this.codeAuthencation = null;
    this.toast = React.createRef();

    this.state = {
      timeOutCode: TIME_OUT,
      isVisibleModal: false,
      retryCode: false,
      code: '',
      disabledSubmit: true,
      emailSendCode: '',
    };
  }

  onShowModal = (emailSendCode) => {
    this.setState(
      {isVisibleModal: true, timeOutCode: TIME_OUT, emailSendCode},
      () => {
        this.eventKeybroadShow = Keyboard.addListener('keyboardDidShow', () => {
          this.showKeyboard = true;
        });
        this.eventKeybroadHide = Keyboard.addListener('keyboardDidHide', () => {
          this.showKeyboard = false;
        });
        this._handleAwaitCode();
      },
    );
  };

  onDismissModal = () => {
    this.setState({isVisibleModal: false}, () => {
      this.eventKeybroadHide && this.eventKeybroadHide.remove();
      this.eventKeybroadShow && this.eventKeybroadShow.remove();
      this.eventTimeOutCode && clearInterval(this.eventTimeOutCode);
    });
  };

  _dismissKeyboard = () => {
    if (this.showKeyboard) {
      Keyboard.dismiss();
    }
  };

  _genegateCode = () => {
    this.codeAuthencation = Math.floor(random(10000, 99999));
  };

  _sendEmailCode = () => {
    sendOTPCode(this.codeAuthencation, 'hungnguyen99.nvh@gmail.com')
      .then((seccess) => {
        this.toast.current.onShowToast(
          'Mã xác thực đã được gửi đến email của bạn.',
        );
      })
      .catch((error) => {
        this.toast.current.onShowToast(
          'Lỗi không thể gửi mã lúc này. Vui lòng thử lại sau.',
        );
        // console.error(error);
      });
  };

  _handleAwaitCode = () => {
    this._genegateCode();
    this._sendEmailCode();
    this.eventTimeOutCode = setInterval(() => {
      console.log('interval is running.');
      this.setState(
        (prevState) => {
          return {
            timeOutCode: prevState.timeOutCode - 1,
          };
        },
        () => {
          if (this.state.timeOutCode === 0) {
            clearInterval(this.eventTimeOutCode);
            this.setState({retryCode: true});
          }
        },
      );
    }, 1000);
  };

  _handleRetryCode = () => {
    this.setState({timeOutCode: TIME_OUT, retryCode: false}, () => {
      this._handleAwaitCode();
    });
  };

  _onChangeCode = (code) => {
    this.setState({code}, () => {
      if (this.state.code.trim().length === 5) {
        this.setState({disabledSubmit: false});
      } else {
        this.setState({disabledSubmit: true});
      }
    });
  };

  _handleSubmit = () => {
    if (isEqual(this.codeAuthencation, toNumber(this.state.code))) {
      // this.toast.current.onShowToast('Mã chính xác');
      this.eventTimeOutCode && clearInterval(this.eventTimeOutCode);
      this.props.onHandleEventSuccess();
      this.codeAuthencation = null;
      this.onDismissModal();
    } else {
      this.toast.current.onShowToast('Mã không đúng.');
    }
  };

  render() {
    return (
      <RNModal
        isVisible={this.state.isVisibleModal}
        backdropOpacity={0.5}
        swipeDirection={['down']}
        onSwipeComplete={this.onDismissModal}>
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={styles.container}>
            <Text style={styles.title}>Xác thực tài khoản</Text>
            <View style={styles.wapper}>
              <Text style={styles.titleInput}>Mã xác minh:</Text>
              <InputCustomComponent
                icons={'key-wireless'}
                returnKeyType={'send'}
                keyboardType={'numeric'}
                maxLength={5}
                secureTextEntry={false}
                onChangeText={this._onChangeCode}
                onSubmitEditing={this._handleSubmit}
              />
            </View>
            <View style={styles.wapperRetry}>
              <Text style={styles.titleRetry}>
                Chưa nhận được mã ?{'\n'}Thử lại sau: {this.state.timeOutCode}s
              </Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  disabled={!this.state.retryCode}
                  style={{opacity: this.state.retryCode ? 1 : 0.3}}
                  onPress={this._handleRetryCode}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#1e90ff',
                      fontSize: 16,
                      margin: 5,
                      fontWeight: 'bold',
                    }}>
                    Thử lại
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              disabled={this.state.disabledSubmit}
              style={[
                styles.wapperButton,
                {
                  opacity: this.state.disabledSubmit ? 0.6 : 1,
                },
              ]}
              onPress={this._handleSubmit}>
              <Text style={styles.titleButton}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <Toast ref={this.toast} left={-20} />
      </RNModal>
    );
  }
}

export default ModalCodeComponent;

const styles = StyleSheet.create({
  container: {
    height: WIDTH_SCREEN,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  wapper: {
    padding: '5%',
  },
  wapperRetry: {
    marginTop: 15,
  },
  titleRetry: {
    fontSize: 17,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#2ed573',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    color: '#fff',
    paddingVertical: 10,
    textTransform: 'capitalize',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  wapperButton: {
    marginTop: 25,
    backgroundColor: '#ff4757',
    padding: 13,
    marginHorizontal: '6%',
    borderRadius: 10,
    marginBottom: 50,
  },
  titleButton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
