/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  // Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const isIOS = Platform.OS === 'ios';

class InputPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      isShowPassword: true,
    };
    this.inputPasswordRef = React.createRef();
  }

  _onFocus = () => {
    this.setState({isFocus: true});
  };

  _onBlur = () => {
    this.setState({isFocus: false});
  };

  _handleChangeShowPassword = () => {
    this.setState({...this.state, isShowPassword: !this.state.isShowPassword});
  };

  onSetFocusPassword = () => {
    this.inputPasswordRef.current.focus();
  };

  render() {
    return (
      <View style={styles.wapper}>
        <View style={styles.wapperIcon}>
          <MCIcons name={'account-key'} size={30} />
        </View>
        <View
          style={[
            styles.wapperPassword,
            {
              borderBottomColor: this.state.isFocus ? '#2e86de' : '#dcdcdc',
            },
          ]}>
          <TextInput
            ref={this.inputPasswordRef}
            style={styles.inputPassword}
            placeholder={'Mật khẩu ...'}
            placeholderTextColor={'#2f3640'}
            secureTextEntry={this.state.isShowPassword}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            returnKeyType={'done'}
            onSubmitEditing={this.props.onSubmitEditing}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            maxLength={20}
          />
          <TouchableOpacity
            style={styles.btnShowPass}
            onPress={this._handleChangeShowPassword}>
            <Text>{this.state.isShowPassword ? 'Hiện' : 'Ẩn'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default InputPasswordComponent;

const styles = StyleSheet.create({
  wapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  wapperIcon: {
    flex: 1,
  },
  wapperPassword: {
    flex: 9,
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  inputPassword: {
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 3,
    flex: 9,
  },
  btnShowPass: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
