import React, {Component} from 'react';
import {ScrollView, Text, View, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAccountToStorage} from '../../common/asyncStorage';
import HeadTopBar from '../../components/HeadTopBar';
import _ from 'lodash';
import {
  getListPercentTopicAction,
  getListRateUserAction,
} from '../../redux/UserQuestion/actions';
import {
  getListPercentTopicSelector,
  getListRateUserSelector,
} from '../../redux/UserQuestion/selectors';
import AchievementUser from './components/AchievementUser';
import RatingUser from './components/RatingUser';
import {styles} from './styles';

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
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      listRateUser: [],
      listPercentTopic: [],
      loading: false,
    };
  }

  componentDidMount() {
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
      id_user: _.get(account, 'id'),
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
              {!_.isEmpty(this.state.listRateUser) ? (
                _.map(this.state.listRateUser, (item, index) => {
                  return <RatingUser key={index} rate={index + 1} row={item} />;
                })
              ) : (
                <Text style={styles.textNotExam}>Chưa có bảng xếp hạng.</Text>
              )}
            </View>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Thành tích:</Text>
              {!_.isEmpty(this.state.listPercentTopic) ? (
                _.map(this.state.listPercentTopic, (item, index) => {
                  let percent = (
                    _.get(item, 'total_correct') / _.get(item, 'total_question')
                  ).toFixed(2);
                  return (
                    <AchievementUser
                      key={index}
                      name={_.get(item, 'name')}
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
    doGetListRateUser: () => {
      dispatch(getListRateUserAction());
    },
    doGetListPercentTopic: (payload) => {
      dispatch(getListPercentTopicAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
