/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {styles} from './../styles';
import {dateFormat} from './../../../common/format';

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
  }

  focus = () => {
    this.refInput.current.focus();
  };

  render() {
    return (
      <View style={{marginBottom: 30}}>
        {this.props.modedate ? (
          <View style={styles.wrapItemDate}>
            <MaterialIcons
              name={this.props.iconName}
              size={23}
              color={'#747d8c'}
            />
            <TouchableOpacity
              onPress={this.props.onPressDate}
              activeOpacity={0.6}
              disabled={this.props.disabled}
              style={{flex: 1, height: 46, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 17,
                  padding: 5,
                  color: this.props.value === null ? '#AAAAAA' : '#414141',
                }}>
                {this.props.value === null
                  ? this.props.placeholder
                  : moment(this.props.value).format(dateFormat)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.wrapItemEdit}>
            <MaterialIcons
              name={this.props.iconName}
              size={23}
              color={'#747d8c'}
            />
            <TextInput
              ref={this.refInput}
              style={styles.textInput}
              placeholder={this.props.placeholder}
              placeholderTextColor={'#AAAAAA'}
              keyboardType={this.props.keyboardType}
              returnKeyType={this.props.returnKeyType}
              onChangeText={this.props.onChangeText}
              value={this.props.value}
              maxLength={this.props.maxLength}
              editable={!this.props.disabled}
            />
          </View>
        )}
        {this.props.error ? (
          this.props.error.length > 0 ? (
            <Text style={styles.textError}>{this.props.error}</Text>
          ) : null
        ) : null}
      </View>
    );
  }
}

export default ItemEdit;
