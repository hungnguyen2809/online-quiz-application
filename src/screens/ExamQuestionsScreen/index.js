/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ExecExam from './components/ExecExam';
import Header from './components/Header';
import {dataSet} from './../../assets/data/dataSet';
import {fill, isEqual, upperCase} from 'lodash';

const isIOS = Platform.OS === 'ios';
let potions = 0;
class ExamQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.viewQuestions = React.createRef();

    this.arrAnsers = fill(Array(dataSet.length), -1);
    this.questions = dataSet;
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
            Navigation.pop(this.props.componentId);
          },
        },
      ],
    );
    console.log('Ans', this.arrAnsers);
  };

  _onPressPrev = () => {
    if (potions <= 0) return;
    potions--;
    // console.log('Potions: ', potions);
    this.viewQuestions.current.scrollToIndex({index: potions});
  };

  _onPressNext = () => {
    if (potions >= dataSet.length - 1) return;
    potions++;
    // console.log('Potions: ', potions);
    this.viewQuestions.current.scrollToIndex({index: potions});
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

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressFinish={this._onFinishExam}
          onFinishTime={this._onFinishExam}
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
                    (this.arrAnsers[potions] = value)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#dfe4ea',
  },
  wapperFooter: {
    height: 100,
    marginBottom: isIOS ? 25 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
