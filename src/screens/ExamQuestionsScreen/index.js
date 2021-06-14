/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import {fill, get, isEqual, map, shuffle, upperCase} from 'lodash';
import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  // FlatList,
  // Image,
  // TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {appScreens} from '../config-screen';
import ModalReviewExam from './../../components/ModalReviewExam';
import {backToLastScreen, goToScreenWithPassProps} from './../MethodScreen';
import ExecExam from './components/ExecExam';
import Header from './components/Header';
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
    this.potions = 0;
    this.arrAnsers = fill(Array(props.dataQuestions.length), -1);

    this.state = {
      questions: [],
      showModalReview: false,
    };

    this.backHandler = null;
    this.refHeader = React.createRef();
  }

  componentDidMount() {
    if (this.props.dataQuestions) {
      this.setState({questions: shuffle(this.props.dataQuestions)});
    }
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackHandler,
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !!nextProps.dataQuestions &&
      this.props.dataQuestions !== nextProps.dataQuestions
    ) {
      this.setState({questions: shuffle(nextProps.dataQuestions)});
    }
  }

  onGoToScreenResultExam = async () => {
    this.refHeader.current.onStopTime();
  };

  _onFinishExam = async () => {
    const {
      countCorrect,
      countInCorrect,
      countNotCheck,
    } = this._handleCheckAnswer();
    let timeExec = this.refHeader.current.onFinishTime();
    const dataProps = {
      dataPass: this.props.dataPass,
      timeExec,
      countCorrect,
      countInCorrect,
      countNotCheck,
      chooseQuestionId: this.props.chooseQuestionId,
      parentComponentId: this.props.parentComponentId,
      onRefreshQuestionSet: this.props.onRefreshQuestionSet,
    };
    if (this.state.showModalReview) {
      this.setState({showModalReview: false}, async () => {
        await goToScreenWithPassProps(
          this.props.parentComponentId,
          appScreens.ResultExamScreen.name,
          dataProps,
        );
      });
    } else {
      await goToScreenWithPassProps(
        this.props.parentComponentId,
        appScreens.ResultExamScreen.name,
        dataProps,
      );
    }
    this.refHeader.current.onStopTime();
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
    if (this.potions <= 0) {
      return;
    }
    this.potions--;
    // console.log('Potions: ', potions);
    // this.viewQuestions.current.scrollToIndex({index: this.potions});
    this.viewQuestions.current.setPage(this.potions);
  };

  _onPressNext = () => {
    if (this.potions >= this.state.questions.length - 1) {
      return;
    }
    this.potions++;
    // console.log('Potions: ', potions);
    // this.viewQuestions.current.scrollToIndex({index: this.potions});
    this.viewQuestions.current.setPage(this.potions);
  };

  _handleCheckAnswer = () => {
    let countCorrect = 0;
    let countInCorrect = 0;
    let countNotCheck = 0;
    this.arrAnsers.forEach((answer, index) => {
      if (
        isEqual(
          upperCase(get(this.state.questions[index], 'final', '')),
          upperCase(answer),
        )
      ) {
        countCorrect++;
      } else if (answer === -1) {
        countNotCheck++;
      } else {
        countInCorrect++;
      }
    });
    return {countCorrect, countInCorrect, countNotCheck};
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

  _openCloseReviewExam = () => {
    this.setState({showModalReview: !this.state.showModalReview});
  };

  onBackHandler = () => {
    Alert.alert(
      'Thông báo',
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
    return true;
  };

  onScrollToQuestion = (idx) => {
    this.setState({showModalReview: false}, () => {
      this.potions = idx;
      this.viewQuestions.current.setPage(idx);
    });
  };

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          ref={this.refHeader}
          onPressLeft={this.goBackScreen}
          onPressRight={this._openCloseReviewExam}
          onFinishTime={this.onSubmitFinishEndTimeExam}
        />
        <View style={styles.content}>
          {/* <FlatList
            ref={this.viewQuestions}
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.questions}
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
          /> */}
          <PagerView
            ref={this.viewQuestions}
            style={{flex: 1}}
            onPageSelected={(ev) => {
              this.potions = ev.nativeEvent.position;
            }}>
            {map(this.state.questions, (item, index) => {
              return (
                <View key={index.toString()}>
                  <ExecExam
                    key={index.toString()}
                    question={item}
                    index={index}
                    onPressChooseAnswer={(value) =>
                      (this.arrAnsers[this.potions] = value)
                    }
                  />
                </View>
              );
            })}
          </PagerView>
        </View>
        {/* <View style={styles.wapperFooter}>
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
        </View> */}
        <ModalReviewExam
          listAnswerQuestions={this.arrAnsers}
          visible={this.state.showModalReview}
          onCancel={this._openCloseReviewExam}
          onSubmit={this._onFinishExam}
          onPressItem={this.onScrollToQuestion}
        />
      </View>
    );
  }
}

export default ExamQuestionsScreen;
