/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {isEqual, upperCase} from 'lodash';
import {SCREEN_WIDTH} from './../../../common/dimensionScreen';

class ExecExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: -1,
    };

    this.prop_question = [
      {
        label: props.question.anA,
        value: 'A',
      },
      {
        label: props.question.anB,
        value: 'B',
      },
      {
        label: props.question.anC,
        value: 'C',
      },
      {
        label: props.question.anD,
        value: 'D',
      },
    ];
  }

  onPress = (value) => {
    if (isEqual(upperCase(value), 'A')) {
      this.setState({isSelected: 0});
      this.props.onPressChooseAnswer(value);
    }
    if (isEqual(upperCase(value), 'B')) {
      this.setState({isSelected: 1});
      this.props.onPressChooseAnswer(value);
    }
    if (isEqual(upperCase(value), 'C')) {
      this.setState({isSelected: 2});
      this.props.onPressChooseAnswer(value);
    }
    if (isEqual(upperCase(value), 'D')) {
      this.setState({isSelected: 3});
      this.props.onPressChooseAnswer(value);
    }
  };

  render() {
    const {question} = this.props.question;
    return (
      <View style={styles.container}>
        <Text style={styles.numberQuestion}>
          Câu số {this.props.index + 1}:
        </Text>
        <View style={styles.wapperContent}>
          <Text style={styles.contentQuestion}>{question}</Text>
        </View>
        <View style={styles.chooseAnswer}>
          <RadioForm animation={true}>
            {this.prop_question.map((item, index) => {
              return (
                <RadioButton labelHorizontal={true} key={index}>
                  <RadioButtonInput
                    obj={item}
                    index={index}
                    isSelected={this.state.isSelected === index}
                    onPress={this.onPress}
                    borderWidth={1}
                    buttonInnerColor={'#1e90ff'}
                    buttonOuterColor={
                      this.state.isSelected === index ? '#2196f3' : '#000'
                    }
                    buttonSize={15}
                    buttonOuterSize={25}
                    buttonStyle={{margin: 10}}
                    buttonWrapStyle={{}}
                  />
                  <RadioButtonLabel
                    obj={item}
                    index={index}
                    labelHorizontal={true}
                    onPress={this.onPress}
                    labelStyle={{
                      fontSize: 18,
                      color: '#000',
                      fontWeight: '600',
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              );
            })}
          </RadioForm>
        </View>
      </View>
    );
  }
}

export default ExecExam;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },
  numberQuestion: {
    fontSize: 19,
    fontStyle: 'italic',
    margin: 5,
  },
  wapperContent: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  contentQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    minHeight: 35,
  },
  chooseAnswer: {
    padding: 5,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
  },
});
