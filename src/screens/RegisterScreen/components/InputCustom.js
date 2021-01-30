/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const isIOS = Platform.OS === 'ios';

class InputCustomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      isShowPassword: true,
    };
    this.inputRef = React.createRef();
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

  onSetFocus = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <View style={styles.wapper}>
        <View style={styles.wapperIcon}>
          <MCIcons name={this.props.icons} size={30} />
        </View>
        <View
          style={[
            styles.wapperInput,
            {
              borderBottomColor: this.state.isFocus ? '#2e86de' : '#dcdcdc',
            },
          ]}>
          <TextInput
            ref={this.inputRef}
            style={styles.inputPassword}
            placeholder={this.props.placeholder}
            placeholderTextColor={'#2f3640'}
            secureTextEntry={
              this.props.password ? this.state.isShowPassword : false
            }
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onEndEditing={this.props.onEndEditing}
            returnKeyType={this.props.returnKeyType}
            keyboardType={this.props.keyboardType}
            onSubmitEditing={this.props.onSubmitEditing}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            maxLength={this.props.maxLength}
          />
          {this.props.password ? (
            <TouchableOpacity
              style={styles.btnShowPass}
              onPress={this._handleChangeShowPassword}>
              <Text>{this.state.isShowPassword ? 'Hiện' : 'Ẩn'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

export default InputCustomComponent;

const styles = StyleSheet.create({
  wapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: isIOS ? 35 : 20,
    marginTop: isIOS ? 10 : 0,
  },
  wapperIcon: {
    flex: 1,
  },
  wapperInput: {
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
