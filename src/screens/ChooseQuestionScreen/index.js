/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import {debounce, forEach, get, map} from 'lodash';
import React, {Component} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {createStructuredSelector} from 'reselect';
import NotifiManager from '../../notifications/NotificationManager';
import {SCREEN_WIDTH} from './../../common/dimensionScreen';
import HeadTopBar from './../../components/HeadTopBar';
import {addQuestionToDB, getQuestionsByQS} from './../../realm/questions';
import {getAccountSelector} from './../../redux/Account/selectors';
// import {questionSetGetDataAction} from './../../redux/QuestionSet/actions';
// import {listQuestionSetSelector} from './../../redux/QuestionSet/selectors';
import {getQuestionsByQSAction} from './../../redux/Questions/actions';
import {getListInfoExamByUserTopicAction} from './../../redux/UserQuestion/actions';
import {getListInfoExamSelector} from './../../redux/UserQuestion/selectors';
import {appScreens} from './../config-screen';
import {backToLastScreen, goToScreenWithPassProps} from './../MethodScreen';
import ItemQuestion from './components/ItemQuestion';
import {styles} from './styles';

class ChooseQuestionScreen extends Component {
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
        style: 'dark',
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      listQuestionSet: [],
      listQuestions: [],
      idTopic: 0,
      loading: false,
      account: null,
      listInfoExam: [],
    };

    this.layoutProvider = new LayoutProvider(
      (index) => {
        return 'LAYOUT';
      },
      (type, dim, index) => {
        switch (type) {
          case 'LAYOUT':
            dim.width = SCREEN_WIDTH;
            dim.height = 100;
            break;
          default:
            dim.width = SCREEN_WIDTH;
            dim.height = 0;
            break;
        }
      },
    );
  }

  componentDidMount() {
    if (this.props.account) {
      this.setState({account: this.props.account}, () => {
        if (this.props.topic) {
          this.setState({idTopic: get(this.props.topic, 'id')}, () => {
            this.onGetListInfoExam();
          });
        }
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.topic !== nextProps.topic) {
      this.setState({idTopic: get(nextProps.topic, 'id')});
    }

    if (this.props.listInfoExam !== nextProps.listInfoExam) {
      let mapData = [];
      let count = 0;
      let total = [...nextProps.listInfoExam].length;
      forEach(nextProps.listInfoExam, async (item, index) => {
        count++;
        const response = await getQuestionsByQS(get(item, 'id_qs'));
        let islocal = get(response.data, 'length', 0) > 0;
        mapData.push({
          islocal,
          ...item,
        });
        if (count === total) {
          this.setState({listInfoExam: mapData, loading: false});
        }
      });
    }
  }

  onGetListInfoExam = () => {
    const payload = {
      id_user: get(this.state.account, 'id'),
      id_topic: this.state.idTopic,
    };
    // console.log('PAYLOAD: ', payload);
    this.setState({loading: true});
    this.props.doGetListInfoExam(payload);
  };

  onStartExample = async (data) => {
    const dataQuestions = await getQuestionsByQS(get(data, 'id_qs', []));
    if (get(data, 'islocal')) {
      await goToScreenWithPassProps(
        this.props.parentComponentId,
        appScreens.ExamQuestions.name,
        {
          dataPass: data,
          dataQuestions: get(dataQuestions, 'data', []),
          parentComponentId: this.props.parentComponentId,
          chooseQuestionId: this.props.componentId,
          onRefreshQuestionSet: this.onRefreshQuestionSet,
        },
      );
    } else {
      Alert.alert('Thông báo', 'Bạn cần tải bộ câu hỏi về máy trước.');
    }
  };

  onDownloadQuestion = (item, {callbacksOnSuccessDow}) => {
    const payload = {
      id_qs: get(item, 'id_qs'),
    };

    this.props.doGetQuestionByQs(payload, {
      callbacksOnSuccess: (data) => {
        this.setState({listQuestions: data}, () => {
          callbacksOnSuccessDow(() => {
            NotifiManager.showNotification(
              'Thông báo',
              'Bộ đề thi đã được tải về thành công',
            );
          });
          this.onAddQuestionRealmDB(payload.id_qs);
        });
      },
      callbacksOnFail: () => {},
    });
  };

  _layoutProvider = () => {
    return this.layoutProvider;
  };

  _dataProviderFacetory = () => {
    const dataProvier = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(this.state.listInfoExam);
    return dataProvier;
  };

  _renderRendererItem = (type, item, index, extendedState) => {
    switch (type) {
      case 'LAYOUT':
        return (
          <ItemQuestion
            row={item}
            onPresStart={this.onStartExample}
            onPressDow={this.onDownloadQuestion}
          />
        );
      default:
        return null;
    }
  };

  _renderListNonData = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 150, height: 150}}
            source={require('./../../assets/images/no_data.png')}
          />
          <Text>Không có dữ liệu</Text>
        </ScrollView>
      </View>
    );
  };

  onGoBackScreen = () => {
    backToLastScreen(this.props.componentId);
  };

  _renderSubComponentButtonLeft = () => {
    return (
      <TouchableOpacity
        key={'btn'}
        onPress={debounce(this.onGoBackScreen, 300)}>
        <Image
          style={{width: 25, height: 25}}
          source={require('./../../assets/icons/icons-left.png')}
        />
      </TouchableOpacity>
    );
  };

  onRefreshQuestionSet = () => {
    this.onGetListInfoExam();
  };

  onAddQuestionRealmDB = (id_qs) => {
    const {listQuestions, listInfoExam} = this.state;
    let count = 0;
    let total = listQuestions.length;
    forEach(listQuestions, (item, index) => {
      addQuestionToDB(item).then(() => {
        count++;
        if (count === total) {
          const dataMap = map(listInfoExam, (item2, index2) => {
            if (get(item2, 'id_qs') === id_qs) {
              return {
                ...item2,
                islocal: !get(item2, 'islocal'),
              };
            }
            return {
              ...item2,
            };
          });
          this.setState({listInfoExam: dataMap});
        }
      });
    });
  };

  render() {
    let subComponentButtonLeft = [];
    subComponentButtonLeft.push(this._renderSubComponentButtonLeft());
    const dataProvider = this._dataProviderFacetory();
    const layoutProvider = this._layoutProvider();

    return (
      <View style={styles.container}>
        <HeadTopBar subComponentButtonLeft={subComponentButtonLeft} />
        <View style={{flex: 1}}>
          {dataProvider.getSize() > 0 ? (
            <RecyclerListView
              canChangeSize={true}
              forceNonDeterministicRendering={true}
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={this._renderRendererItem}
              extendedState={{}}
              scrollViewProps={{
                refreshControl: (
                  <RefreshControl
                    refreshing={this.state.loading}
                    onRefresh={this.onRefreshQuestionSet}
                  />
                ),
              }}
            />
          ) : (
            this._renderListNonData()
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // listQuestionSet: listQuestionSetSelector(),
  listInfoExam: getListInfoExamSelector(),
  account: getAccountSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // doGetQuestionSet: (payload, callbacks) => {
    //   dispatch(questionSetGetDataAction(payload, callbacks));
    // },
    doGetQuestionByQs: (payload, callbacks) => {
      dispatch(getQuestionsByQSAction(payload, callbacks));
    },
    doGetListInfoExam: (payload) => {
      dispatch(getListInfoExamByUserTopicAction(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseQuestionScreen);
