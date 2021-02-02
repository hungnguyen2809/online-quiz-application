import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const isIOS = Platform.OS === 'ios';

class FieldInfo extends Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
  }

  onFocus = () => {
    this.refInput.current.focus();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title} </Text>
        {this.props.datetime ? (
          <View>
            <TouchableOpacity onPress={this.props.onOpenModalDate}>
              <View style={styles.wapperDate}>
                <Text style={styles.textTime}>{this.props.value}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            ref={this.refInput}
            style={styles.textInput}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
            maxLength={this.props.maxLength}
            editable={this.props.editable}
          />
        )}
      </View>
    );
  }
}

export default FieldInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  textInput: {
    padding: isIOS ? 15 : 10,
    paddingBottom: 5,
    fontSize: 19,
    borderBottomColor: '#a4b0be',
    borderBottomWidth: 2,
  },
  wapperDate: {
    borderBottomColor: '#a4b0be',
    borderBottomWidth: 2,
  },
  textTime: {
    padding: isIOS ? 15 : 10,
    paddingBottom: 5,
    fontSize: 19,
  },
});
