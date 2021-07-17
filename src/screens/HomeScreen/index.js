import {get, isEmpty, map} from 'lodash';
import React, {Component} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAccountToStorage} from '../../common/asyncStorage';
import HeadTopBar from '../../components/HeadTopBar';
import {
  getListPercentTopicAction,
  getListRateUserAction,
} from '../../redux/UserQuestion/actions';
import {
  getListPercentTopicSelector,
  getListRateUserSelector,
} from '../../redux/UserQuestion/selectors';
import SocketManager from '../../socketIO';
import {SOCKET_CLIENT_SEND_PROFILE} from '../../socketIO/constant';
import CodePushManager from './../../codepush';
import AchievementUser from './components/AchievementUser';
import RatingUser from './components/RatingUser';
import {styles} from './styles';
import {LoginAccountActionSuccess} from './../../redux/Account/actions';

class HomeScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Trang chủ',
        icon: require('./../../assets/icons/ic-home.png'),
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
    Navigation.events().bindComponent(this);

    this.state = {
      listRateUser: [],
      listPercentTopic: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const account = await getAccountToStorage();
    this.props.dispatch(LoginAccountActionSuccess(account));

    const payload = {
      id_user: get(account, 'id'),
      name: get(account, 'name'),
      email: get(account, 'email'),
      image: get(account, 'image'),
      phone: get(account, 'phone'),
    };
    SocketManager.emit(SOCKET_CLIENT_SEND_PROFILE, payload);
  }

  componentDidAppear() {
    this.props.doGetListRateUser();
    this.onGetListPercentTopic();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.listRateUser !== nextProps.listRateUser) {
        this.setState({listRateUser: nextProps.listRateUser});
      }
      if (this.props.listPercentTopic !== nextProps.listPercentTopic) {
        this.setState({listPercentTopic: nextProps.listPercentTopic});
      }
      this.setState({loading: false});
    }
  }

  onGetListPercentTopic = async () => {
    const account = await getAccountToStorage();
    const payload = {
      id_user: get(account, 'id'),
    };
    this.props.doGetListPercentTopic(payload);
  };

  onReloadData = () => {
    this.setState({loading: true});
    this.props.doGetListRateUser();
    this.onGetListPercentTopic();
  };

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onReloadData}
            />
          }>
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Bảng xếp hạng:</Text>
              {!isEmpty(this.state.listRateUser) ? (
                map(this.state.listRateUser, (item, index) => {
                  return <RatingUser key={index} rate={index + 1} row={item} />;
                })
              ) : (
                <Text style={styles.textNotExam}>Chưa có bảng xếp hạng.</Text>
              )}
            </View>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Thành tích:</Text>
              {!isEmpty(this.state.listPercentTopic) ? (
                map(this.state.listPercentTopic, (item, index) => {
                  let percent = (
                    get(item, 'total_correct') / get(item, 'total_question')
                  ).toFixed(2);
                  return (
                    <AchievementUser
                      key={index}
                      name={get(item, 'name')}
                      process={percent}
                    />
                  );
                })
              ) : (
                <Text style={styles.textNotExam}>Bạn chưa có thành tích.</Text>
              )}
            </View>
          </View>
        </ScrollView>
        {/* Code push update app manager */}
        <CodePushManager />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  listRateUser: getListRateUserSelector(),
  listPercentTopic: getListPercentTopicSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    doGetListRateUser: () => {
      dispatch(getListRateUserAction());
    },
    doGetListPercentTopic: (payload) => {
      dispatch(getListPercentTopicAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
