import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {backToLastScreen} from './../MethodScreen';
import ExecExam from './components/ExecExam';
import Header from './components/Header';
import _, {fill, isEqual, upperCase} from 'lodash';
import {styles} from './styles';
import ModalReviewExam from './../../components/ModalReviewExam';
import PagerView from 'react-native-pager-view';

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
  }

  componentDidMount() {
    if (!!this.props.dataQuestions) {
      this.setState({questions: this.props.dataQuestions});
    }
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackHandler,
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.dataQuestions !== nextProps.dataQuestions) {
      this.setState({questions: nextProps.dataQuestions});
    }
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
            if (this.state.showModalReview) {
              this.setState({showModalReview: false}, () => {
                backToLastScreen(this.props.componentId);
              });
            } else {
              backToLastScreen(this.props.componentId);
            }
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
    // this.viewQuestions.current.scrollToIndex({index: this.potions});
    this.viewQuestions.current.setPage(this.potions);
  };

  _onPressNext = () => {
    if (this.potions >= this.state.questions.length - 1) return;
    this.potions++;
    // console.log('Potions: ', potions);
    // this.viewQuestions.current.scrollToIndex({index: this.potions});
    this.viewQuestions.current.setPage(this.potions);
  };

  _handleCheckAnswer = () => {
    let count = 0;
    this.arrAnsers.forEach((answer, index) => {
      if (
        isEqual(
          upperCase(_.get(this.state.questions[index], 'final', '')),
          upperCase(answer),
        )
      ) {
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

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
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
            {_.map(this.state.questions, (item, index) => {
              return (
                <ExecExam
                  key={index.toString()}
                  question={item}
                  index={index}
                  onPressChooseAnswer={(value) =>
                    (this.arrAnsers[this.potions] = value)
                  }
                />
              );
            })}
          </PagerView>
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
        <ModalReviewExam
          listAnswerQuestions={this.arrAnsers}
          visible={this.state.showModalReview}
          onCancel={this._openCloseReviewExam}
          onSubmit={this._onFinishExam}
        />
      </View>
    );
  }
}

export default ExamQuestionsScreen;
