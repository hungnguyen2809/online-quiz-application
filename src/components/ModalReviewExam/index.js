/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import {debounce, upperCase} from 'lodash';
import React, {Component} from 'react';
import {Text, View, Platform, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from './../../common/Colors';
import {styles} from './styles';

const isIOS = Platform.OS === 'ios';

const ItemReviewQuestion = ({index, answer, onPressItem}) => {
  const checkedA = upperCase(answer) === 'A';
  const checkedB = upperCase(answer) === 'B';
  const checkedC = upperCase(answer) === 'C';
  const checkedD = upperCase(answer) === 'D';

  const _onPressItem = () => {
    onPressItem && onPressItem(index);
  };

  return (
    <TouchableOpacity
      style={styles.containerItemQues}
      activeOpacity={0.9}
      onPress={debounce(_onPressItem, 250)}>
      <Text style={styles.numberQues}>{index + 1}. </Text>
      <View
        style={[
          styles.wrapQuesAnswer,
          {backgroundColor: checkedA ? Colors.PURE_APPLE : Colors.PEACE},
        ]}>
        <Text style={styles.textAnswer}>A</Text>
      </View>
      <View
        style={[
          styles.wrapQuesAnswer,
          {backgroundColor: checkedB ? Colors.PURE_APPLE : Colors.PEACE},
        ]}>
        <Text style={styles.textAnswer}>B</Text>
      </View>
      <View
        style={[
          styles.wrapQuesAnswer,
          {backgroundColor: checkedC ? Colors.PURE_APPLE : Colors.PEACE},
        ]}>
        <Text style={styles.textAnswer}>C</Text>
      </View>
      <View
        style={[
          styles.wrapQuesAnswer,
          {backgroundColor: checkedD ? Colors.PURE_APPLE : Colors.PEACE},
        ]}>
        <Text style={styles.textAnswer}>D</Text>
      </View>
    </TouchableOpacity>
  );
};

class ModalReviewExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listQuestion: [],
    };
  }

  _onPressItem = (idx) => {
    this.props.onPressItem && this.props.onPressItem(idx);
  };

  renderRowItem = ({item, index}) => {
    return (
      <ItemReviewQuestion
        index={index}
        answer={item}
        onPressItem={this._onPressItem}
      />
    );
  };

  componentDidMount() {
    if (!!this.props.listAnswerQuestions) {
      this.setState({listQuestion: this.props.listAnswerQuestions});
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.listQuestion !== nextProps.listAnswerQuestions) {
      this.setState({listQuestion: nextProps.listAnswerQuestions});
    }
  }

  render() {
    const {onCancel, onSubmit} = this.props;

    return (
      <Modal
        style={{borderRadius: 5}}
        animationIn={'fadeInDownBig'}
        isVisible={this.props.visible}
        backdropOpacity={0.2}
        useNativeDriver={!isIOS}
        useNativeDriverForBackdrop={!isIOS}>
        <View style={styles.container}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>Phiếu trả lời</Text>
          </View>
          <View style={styles.wrapContent}>
            <FlatList
              data={this.state.listQuestion}
              renderItem={this.renderRowItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.wrapFooter}>
            <TouchableOpacity style={styles.btnExit} onPress={onCancel}>
              <Text style={[styles.textBtnFooter, styles.textExit]}>Thoát</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit} onPress={onSubmit}>
              <Text style={[styles.textBtnFooter, styles.textSubmit]}>
                Nộp bài
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalReviewExam;
