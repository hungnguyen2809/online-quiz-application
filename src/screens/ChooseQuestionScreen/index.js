/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import HeadTopBar from './../../components/HeadTopBar';
import {backToLastScreen} from './../MethodScreen';
import {styles} from './styles';
import ItemQuestion from './components/ItemQuestion';
import {SCREEN_WIDTH} from './../../common/dimensionScreen';
import {goToScreenWithPassProps} from './../MethodScreen';
import {appScreens} from './../config-screen';
import {debounce, get} from 'lodash';
import {createStructuredSelector} from 'reselect';
import {questionSetGetDataAction} from './../../redux/QuestionSet/actions';
import {listQuestionSetSelector} from './../../redux/QuestionSet/selectors';
import {connect} from 'react-redux';

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
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      listQuestionSet: [],
      idTopic: 0,
      loading: false,
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
    if (!!this.props.topic) {
      this.setState({idTopic: get(this.props.topic, 'id')}, () => {
        this.onGetListQuestionSet();
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.topic !== nextProps.topic) {
      this.setState({idTopic: get(nextProps.topic, 'id')});
    }
    if (this.props.listQuestionSet !== nextProps.listQuestionSet) {
      this.setState({
        listQuestionSet: nextProps.listQuestionSet,
        loading: false,
      });
    }
  }

  onGetListQuestionSet = () => {
    const payload = {
      id_topic: this.state.idTopic,
    };
    this.setState({loading: true});
    this.props.doGetQuestionSet(payload, {
      callbacksOnSuccess: () => {},
      callbacksOnFail: () => {},
    });
  };

  onStartExample = (data) => {
    goToScreenWithPassProps(
      this.props.parentComponentId,
      appScreens.ExamQuestions.name,
      {
        dataPass: data,
        parentComponentId: this.props.parentComponentId,
      },
    );
  };

  _layoutProvider = () => {
    return this.layoutProvider;
  };

  _dataProviderFacetory = () => {
    const dataProvier = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(this.state.listQuestionSet);

    return dataProvier;
  };

  _renderRendererItem = (type, item) => {
    switch (type) {
      case 'LAYOUT':
        return (
          <ItemQuestion
            islocal={true}
            title={get(item, 'description')}
            numberQues={get(item, 'total_question')}
            level={get(item, 'level')}
            onPresStart={debounce(() => this.onStartExample(item), 300)}
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
      <TouchableOpacity key={'btn'} onPress={this.onGoBackScreen}>
        <Image
          style={{width: 25, height: 25}}
          source={require('./../../assets/icons/icons-left.png')}
        />
      </TouchableOpacity>
    );
  };

  onRefreshQuestionSet = () => {
    this.onGetListQuestionSet();
  };

  render() {
    let subComponentButtonLeft = [];
    subComponentButtonLeft.push(this._renderSubComponentButtonLeft());
    const dataProvider = this._dataProviderFacetory();
    const layoutProvider = this._layoutProvider();

    // console.log('ABC: ', this.state.listQuestionSet);

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
  listQuestionSet: listQuestionSetSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    doGetQuestionSet: (payload, callbacks) => {
      dispatch(questionSetGetDataAction(payload, callbacks));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseQuestionScreen);
