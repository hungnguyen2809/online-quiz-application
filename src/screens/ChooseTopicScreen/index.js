/* eslint-disable react-native/no-inline-styles */
import {debounce, get} from 'lodash';
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import HeadTopBar from '../../components/HeadTopBar';
import {Colors} from './../../common/Colors';
import {getAllTopicsAction} from './../../redux/Topics/actions';
import {listTopicsSelector} from './../../redux/Topics/selectors';
import {appScreens} from './../config-screen';
import {goToScreenWithPassProps} from './../MethodScreen';
import {styles} from './styles';

class ChooseTopicScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Làm bài',
        icon: require('./../../assets/icons/ic-edit_property.png'),
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
      listTopis: [],
      loading: false,
    };
  }

  componentDidMount() {}

  componentDidAppear() {
    if (!!this.props.listTopis) {
      this.setState({listTopis: this.props.listTopis});
    } else {
      this.props.doGetListTopics(
        {},
        {
          callbacksOnSuccess: () => {},
          callbacksOnFail: () => {
            this.setState({loading: false});
          },
        },
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.listTopis !== nextProps.listTopis) {
      this.setState({listTopis: nextProps.listTopis, loading: false});
    }
  }

  _startExam = (data) => {
    goToScreenWithPassProps(
      this.props.componentId,
      appScreens.ChooseQuestionScreen.name,
      {
        topic: data,
        parentComponentId: this.props.componentId,
      },
    );
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={debounce(() => this._startExam(item), 300)}>
        <View style={styles.itemExam}>
          <Image style={styles.imageLabel} source={{uri: get(item, 'image')}} />
          <View style={styles.wrapLabel}>
            <Text style={styles.titleExam}>{get(item, 'name')}</Text>
            <Text numberOfLines={2} style={styles.desExam}>
              {get(item, 'description')}
            </Text>
          </View>
          <MaterialIcons
            name={'chevron-right'}
            size={30}
            color={Colors.PEACE}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderListNonData = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.onRefreshTopic}
            />
          }
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

  onRefreshTopic = () => {
    this.setState({loading: true}, () => {
      this.props.doGetListTopics(
        {},
        {
          callbacksOnSuccess: () => {},
          callbacksOnFail: () => {
            this.setState({loading: false});
          },
        },
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        {this.state.listTopis.length > 0 ? (
          <FlatList
            style={{margin: 10}}
            data={this.state.listTopis}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this.onRefreshTopic}
              />
            }
          />
        ) : (
          this._renderListNonData()
        )}
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  listTopis: listTopicsSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    doGetListTopics: (payload, callbacks) => {
      dispatch(getAllTopicsAction(payload, callbacks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTopicScreen);
