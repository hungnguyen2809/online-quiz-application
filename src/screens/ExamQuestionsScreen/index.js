/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Alert, FlatList, Image, TouchableOpacity, View} from 'react-native';
import {backToLastScreen} from './../MethodScreen';
import ExecExam from './components/ExecExam';
import Header from './components/Header';
import {dataSet} from './../../assets/data/dataSet';
import {fill, isEqual, upperCase} from 'lodash';
import {styles} from './styles';
class ExamQuestionsScreen extends Component {
  static options(prosp) {
    return {
      topBar: {
        visible: false,
      },
      bottomTabs: {
        visible: false,
      },
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
      },
    };
  }

  constructor(props) {
    super(props);
    this.viewQuestions = React.createRef();

    this.arrAnsers = fill(Array(dataSet.length), -1);
    this.questions = dataSet;
    this.potions = 0;
  }

  _onFinishExam = () => {
    Alert.alert(
      'Kết quả',
      `Bạn đã đúng ${this._handleCheckAnswer()}/${this.arrAnsers.length} !.`,
      [
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => {
            backToLastScreen(this.props.componentId);
          },
        },
      ],
    );
    console.log('Ans', this.arrAnsers);
  };

  onSubmitFinishExam = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn nộp bài ?', [
      {
        text: 'Đồng ý',
        style: 'default',
        onPress: () => {
          this._onFinishExam();
        },
      },
      {
        text: 'Hủy',
        style: 'destructive',
        onPress: () => {},
      },
    ]);
  };

  onSubmitFinishEndTimeExam = () => {
    Alert.alert('Thông báo', 'Thời gian làm bài đã hết !', [
      {
        text: 'Đồng ý',
        style: 'default',
        onPress: () => {
          this._onFinishExam();
        },
      },
    ]);
  };

  _onPressPrev = () => {
    if (this.potions <= 0) return;
    this.potions--;
    // console.log('Potions: ', potions);
    this.viewQuestions.current.scrollToIndex({index: this.potions});
  };

  _onPressNext = () => {
    if (this.potions >= dataSet.length - 1) return;
    this.potions++;
    // console.log('Potions: ', potions);
    this.viewQuestions.current.scrollToIndex({index: this.potions});
  };

  _handleCheckAnswer = () => {
    let count = 0;
    this.arrAnsers.forEach((answer, index) => {
      if (isEqual(upperCase(dataSet[index].answer), upperCase(answer))) {
        count = count + 1;
      }
    });
    return count;
  };

  goBackScreen = () => {
    Alert.alert(
      'Thông báo !',
      'Bạn có chắc muốn thoát ? Bài làm hiện tại sẽ không được tính ?',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            backToLastScreen(this.props.componentId);
          },
          style: 'default',
        },
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'destructive',
        },
      ],
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={this.goBackScreen}
          onPressFinish={this.onSubmitFinishExam}
          onFinishTime={this.onSubmitFinishEndTimeExam}
        />
        <View style={styles.content}>
          <FlatList
            ref={this.viewQuestions}
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={dataSet}
            renderItem={({item, index}) => {
              return (
                <ExecExam
                  question={item}
                  index={index}
                  onPressChooseAnswer={(value) =>
                    (this.arrAnsers[this.potions] = value)
                  }
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.wapperFooter}>
          <TouchableOpacity onPress={this._onPressPrev}>
            <Image
              style={{tintColor: '#ff4757'}}
              source={require('./../../assets/icons/arrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressNext}>
            <Image
              style={{transform: [{rotate: '180deg'}], tintColor: '#2ed573'}}
              source={require('./../../assets/icons/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExamQuestionsScreen;
