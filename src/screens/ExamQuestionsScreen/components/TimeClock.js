/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {toString, floor} from 'lodash';

const TIME = 15;

class TimeClock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: TIME * 60,
      timeExec: 0,
    };
  }

  _getMinutes = (time) => {
    let minutes = toString(floor(time / 60));
    return minutes.length === 2 ? minutes : `0${minutes}`;
  };

  _getSecond = (time) => {
    let second = toString(floor(time % 60));
    return second.length === 2 ? second : `0${second}`;
  };

  onStop = () => {
    this.eventTime && clearInterval(this.eventTime);
  };

  onFinish = () => {
    this.onStop();
    return this.state.timeExec;
  };

  componentDidMount() {
    this.eventTime = setInterval(() => {
      console.log('time is runing.');
      this.setState(
        (prevState) => {
          return {
            time: prevState.time - 1,
            timeExec: prevState.timeExec + 1,
          };
        },
        () => {
          if (this.state.time === 0) {
            clearInterval(this.eventTime);
            this.props.onFinishTime();
          }
        },
      );
    }, 1000);
  }

  render() {
    return (
      <Text
        style={{color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 10}}>
        {this._getMinutes(this.state.time)} : {this._getSecond(this.state.time)}
      </Text>
    );
  }

  componentWillUnmount() {
    this.eventTime && clearInterval(this.eventTime);
  }
}

export default TimeClock;
