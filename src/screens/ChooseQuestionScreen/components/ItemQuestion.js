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
import {get, debounce} from 'lodash';

class ItemQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      showProgress: false,
    };

    this.clearTimeProgess = null;
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

  onPressDowload = () => {
    this.props.onPressDow(this.props.row, {
      callbacksOnSuccessDow: () => {
        this.setState({showProgress: true}, () => {
          let progress = 0;
          this.clearTimeProgess = setInterval(() => {
            progress += 0.1;
            if (progress <= 1) {
              this.setState({progress});
            } else {
              this.setState({progress: 0, showProgress: false}, () => {
                clearInterval(this.clearTimeProgess);
              });
            }
          }, 200);
        });
      },
    });
  };

  onStartDowload = () => {
    this.props.onPresStart(this.props.row);
  };

  componentWillUnmount() {
    this.clearTimeProgess && clearInterval(this.clearTimeProgess);
  }

  render() {
    const {row} = this.props;
    const islocal = get(row, 'islocal');

    const url = islocal
      ? require('./../../../assets/icons/icons-checked-success.png')
      : require('./../../../assets/icons/icons-below.png');

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={debounce(this.onStartDowload, 300)}
          style={{flex: 1}}
          activeOpacity={0.6}>
          <View style={styles.wrapText}>
            <Text style={styles.title}>{get(row, 'description')}</Text>
            <View style={styles.wrapDes}>
              <Text style={styles.description}>
                Số câu hỏi: {get(row, 'total_question')}
              </Text>
              <Text
                style={[
                  styles.lavel,
                  {
                    color:
                      get(row, 'level') === 'E'
                        ? Colors.LEVEL_E
                        : get(row, 'level') === 'M'
                        ? Colors.LEVEL_M
                        : Colors.LEVEL_H,
                  },
                ]}>
                Mức độ: {this._getLevel(get(row, 'level'))}
              </Text>
            </View>
            {get(row, 'question_correct', -1) !== -1 ? (
              <Text
                style={{
                  color:
                    get(row, 'question_correct', 0) ===
                    get(row, 'total_question', 0)
                      ? Colors.DARK_MOUNTAIN
                      : Colors.RED_ORANGE,
                }}>
                Đã hoàn thành : {get(row, 'question_correct', 0)}/
                {get(row, 'total_question')}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
        {this.state.showProgress ? (
          <Progress.Pie progress={this.state.progress} size={35} />
        ) : (
          <TouchableWithoutFeedback
            onPress={debounce(this.onPressDowload, 200)}>
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
