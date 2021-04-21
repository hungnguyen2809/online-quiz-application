import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAccountToStorage} from '../../common/asyncStorage';
import HeadTopBar from '../../components/HeadTopBar';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
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
    }
  }

  onGetListPercentTopic = async () => {
    const account = await getAccountToStorage();
    const payload = {
      id_user: _.get(account, 'id'),
    };
    this.props.doGetListPercentTopic(payload);
  };

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Bảng xếp hạng:</Text>
              {_.map(this.state.listRateUser, (item, index) => {
                return <RatingUser key={index} rate={index + 1} row={item} />;
              })}
            </View>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Tỷ lệ hoàn thành môn:</Text>
              {_.map(this.state.listPercentTopic, (item, index) => {
                let percent =
                  _.get(item, 'total_correct') / _.get(item, 'total_question');
                return (
                  <AchievementUser
                    key={index}
                    name={_.get(item, 'name')}
                    process={percent}
                  />
                );
              })}
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
