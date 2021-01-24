/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const isIOS = Platform.OS === 'ios';

class InputEmailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
  }

  _onFocus = () => {
    this.setState({isFocus: true});
  };

  _onBlur = () => {
    this.setState({isFocus: false});
  };

  render() {
    return (
      <View style={styles.wapper}>
        <View style={styles.wapperIcons}>
          <MCIcons name={'email-outline'} size={30} />
        </View>
        <TextInput
          style={[
            styles.inputEmail,
            {
              borderBottomColor: this.state.isFocus ? '#2e86de' : '#dcdcdc',
            },
          ]}
          placeholder={'Email ...'}
          placeholderTextColor={'#2f3640'}
          keyboardType={'email-address'}
          returnKeyType={'go'}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          maxLength={60}
          onSubmitEditing={this.props.onSubmitEditing}
        />
      </View>
    );
  }
}

export default InputEmailComponent;

const styles = StyleSheet.create({
  wapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: isIOS ? 35 : 20,
  },
  wapperIcons: {
    flex: 1,
    paddingBottom: isIOS ? 5 : 0,
  },
  inputEmail: {
    flex: 9,
    fontSize: 20,
    fontWeight: '500',
    borderBottomWidth: 2,
    paddingBottom: isIOS ? 0 : 3,
    height: 40,
  },
});
