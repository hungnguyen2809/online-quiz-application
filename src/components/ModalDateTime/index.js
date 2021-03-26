import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import RNDateTimePicker from 'react-native-date-picker';
import RNModal from 'react-native-modal';
import {Colors} from './../../common/Colors';

const isIOS = Platform.OS === 'ios';

class ModalDateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDate: new Date(),
      visible: false,
    };
  }

  onOpenModal = () => {
    this.setState({visible: true, valueDate: this.props.date});
  };

  _onDismissModal = () => {
    this.setState({visible: false});
  };

  _onSubmitDate = () => {
    // console.log(this.state.valueDate);
    this.props.onDateChange(this.state.valueDate);
    this._onDismissModal();
  };

  render() {
    return (
      <RNModal
        isVisible={this.state.visible}
        backdropOpacity={0.5}
        swipeDirection={['down']}
        useNativeDriver={!isIOS}
        useNativeDriverForBackdrop={!isIOS}
        onSwipeComplete={this._onDismissModal}>
        <View style={styles.container}>
          <View style={styles.wapperDateTime}>
            <RNDateTimePicker
              date={this.state.valueDate}
              mode={this.props.mode}
              minimumDate={this.props.minimumDate}
              maximumDate={this.props.maximumDate}
              is24hourSource={this.props.is24hourSource}
              locale={this.props.locale}
              onDateChange={(date) => {
                // console.log(date);
                this.setState({valueDate: date});
              }}
            />
            <View style={styles.wapperBtn}>
              <TouchableOpacity onPress={this._onDismissModal}>
                <Text style={[styles.titleText, {color: Colors.CLEAR_CHILL}]}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onSubmitDate}>
                <Text style={[styles.titleText, {color: Colors.WATERMELON}]}>
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>
    );
  }
}

export default ModalDateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wapperDateTime: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
  },
  wapperBtn: {
    marginVertical: isIOS ? 10 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
