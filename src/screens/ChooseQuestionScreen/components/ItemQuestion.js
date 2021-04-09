/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from './../../../common/Colors';
import * as Progress from 'react-native-progress';

class ItemQuestion extends Component {
  constructor(props) {
    super(props);
  }

  _getLevel = (type) => {
    switch (type) {
      case 'E':
        return 'Dễ';
      case 'M':
        return 'Trung bình';
      case 'H':
        return 'Khó';
      default:
        return null;
    }
  };

  render() {
    const {
      title,
      numberQues,
      level,
      islocal,
      onPresStart,
      onPressDow,
      progressDow,
      showProgress,
    } = this.props;

    const url = islocal
      ? require('./../../../assets/icons/icons-checked-success.png')
      : require('./../../../assets/icons/icons-below.png');

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPresStart}
          style={{flex: 1}}
          activeOpacity={0.6}>
          <View style={styles.wrapText}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.wrapDes}>
              <Text style={styles.description}>Số câu hỏi: {numberQues}</Text>
              <Text style={styles.lavel}>Mức độ: {this._getLevel(level)}</Text>
            </View>
            {/* <Text style={styles.result}>Đã hoàn thành : 6/10</Text> */}
          </View>
        </TouchableOpacity>
        {showProgress ? (
          <Progress.Pie progress={progressDow} size={35} />
        ) : (
          <TouchableWithoutFeedback onPress={onPressDow}>
            <Image
              style={[styles.image, islocal ? {} : {tintColor: 'red'}]}
              source={url}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

export default ItemQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: Colors.ANTI_FLASH_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  wrapText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  wrapDes: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  description: {
    color: Colors.CLEAR_CHILL,
  },
  lavel: {
    color: Colors.LEVEL_E,
    marginLeft: 10,
  },
  image: {
    width: 35,
    height: 35,
  },
  result: {
    color: Colors.RED_ORANGE,
  },
});
