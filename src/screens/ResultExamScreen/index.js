/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import _ from 'lodash';
import {SCREEN_WIDTH} from '../../common/dimensionScreen';
import HeadTopBar from '../../components/HeadTopBar';
import {
  createUserQuestionAction,
  getListPercentTopicAction,
  updateUserQuestionAction,
} from '../../redux/UserQuestion/actions';
import {backToScreen} from '../MethodScreen';
import {styles} from './styles';
import {getAccountToStorage} from '../../common/asyncStorage';

class ResultExamScreen extends Component {
  static options(props) {
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

    this.state = {
      dataPass: props.dataPass,
      countCorrect: props.countCorrect,
      countInCorrect: props.countInCorrect,
      countNotCheck: props.countNotCheck,
    };
  }

  componentDidMount() {}

  onGoBackScreen = async () => {
    await backToScreen(this.props.chooseQuestionId);
    this.props.onRefreshQuestionSet();

    const account = await getAccountToStorage();
    const payload = {
      id_user: _.get(account, 'id'),
    };
    this.props.doGetListPercentTopic(payload);
  };

  onSubmitResult = async () => {
    const account = await getAccountToStorage();
    const {dataPass, timeExec, countCorrect} = this.props;
    const question_correct = _.get(dataPass, 'question_correct', null);
    const time_finish = _.get(dataPass, 'time_finish', null);
    const payload = {
      id_user: _.get(account, 'id'),
      id_qs: _.get(dataPass, 'id_qs'),
      time_finish: timeExec,
      number_qc: countCorrect,
    };
    if (question_correct === null) {
      this.props.doCreateUserQuestion(payload, {
        callbacksOnSuccess: () => {
          this.onGoBackScreen();
        },
        callbacksOnFail: () => {},
      });
    } else if (countCorrect > question_correct) {
      this.props.doUpdateUserQuestion(payload, {
        callbacksOnSuccess: () => {
          this.onGoBackScreen();
        },
        callbacksOnFail: () => {},
      });
    } else if (countCorrect === question_correct && timeExec < time_finish) {
      this.props.doUpdateUserQuestion(payload, {
        callbacksOnSuccess: () => {
          this.onGoBackScreen();
        },
        callbacksOnFail: () => {},
      });
    } else {
      this.onGoBackScreen();
    }
  };

  _renderSubComponentButtonLeft = () => {
    return (
      <TouchableOpacity key={'btn'} onPress={this.onGoBackScreen}>
        <Image
          style={{width: 25, height: 25}}
          source={require('./../../assets/icons/icons-left.png')}
        />
      </TouchableOpacity>
    );
  };

  calculatorPercent = (num) => {
    let totalQues = _.get(this.props.dataPass, 'total_question');
    return ((num / totalQues) * 100).toFixed(2);
  };

  render() {
    let subComponentButtonLeft = [];
    subComponentButtonLeft.push(this._renderSubComponentButtonLeft());

    const data = [
      {
        name: 'Chọn đúng',
        number: this.state.countCorrect,
        color: '#ffa801',
        legendFontColor: '#ffa801',
        legendFontSize: 15,
      },
      {
        name: 'Chọn sai',
        number: this.state.countInCorrect,
        color: '#ff4d4d',
        legendFontColor: '#ff4d4d',
        legendFontSize: 15,
      },
      {
        name: 'Chưa chọn',
        number: this.state.countNotCheck,
        color: '#a4b0be',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

    let percentCorrect = this.calculatorPercent(this.state.countCorrect);
    let percentInCorrect = this.calculatorPercent(this.state.countInCorrect);
    let percentNotCheck = this.calculatorPercent(this.state.countNotCheck);

    return (
      <View style={styles.container}>
        {/* <HeadTopBar subComponentButtonLeft={subComponentButtonLeft} /> */}
        <HeadTopBar />
        <View style={styles.content}>
          <Text style={styles.title}>Kết quả</Text>
          <PieChart
            data={data}
            width={SCREEN_WIDTH - 20}
            height={180}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 1,
            }}
            accessor={'number'}
            backgroundColor={'transparent'}
            absolute
            avoidFalseZero={true}
            hasLegend={false}
            //110 = 180(height)/2 - 20
            center={[SCREEN_WIDTH / 2 - 110, 0]}
          />
          <View style={styles.wrapPercent}>
            <View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
                <View style={[styles.circle, {backgroundColor: '#ffa801'}]} />
                <Text style={[styles.textPercent, {color: '#ffa801'}]}>
                  {percentCorrect}% - Chọn đúng: {this.state.countCorrect}.
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
                <View style={[styles.circle, {backgroundColor: '#ff4d4d'}]} />
                <Text style={[styles.textPercent, {color: '#ff4d4d'}]}>
                  {percentInCorrect}% - Chọn sai: {this.state.countInCorrect}.
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
                <View style={[styles.circle, {backgroundColor: '#a4b0be'}]} />
                <Text style={[styles.textPercent, {color: '#7F7F7F'}]}>
                  {percentNotCheck}% - Chưa chọn: {this.state.countNotCheck}.
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnSubmit}
            activeOpacity={0.8}
            onPress={this.onSubmitResult}>
            <Text style={styles.btnTextSubmit}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => {
  return {
    doCreateUserQuestion: (payload, callbacks) => {
      dispatch(createUserQuestionAction(payload, callbacks));
    },
    doUpdateUserQuestion: (payload, callbacks) => {
      dispatch(updateUserQuestionAction(payload, callbacks));
    },
    doGetListPercentTopic: (payload) => {
      dispatch(getListPercentTopicAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultExamScreen);
