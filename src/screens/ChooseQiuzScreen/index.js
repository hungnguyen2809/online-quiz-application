/* eslint-disable react-native/no-inline-styles */
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
import HeadTopBar from '../../components/HeadTopBar';
import {goToScreenWithPassProps} from './../MethodScreen';
import {appScreens} from './../config-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from './../../common/Colors';
import {styles} from './styles';
import {createStructuredSelector} from 'reselect';
import {getAllTopicsAction} from './../../redux/Topics/actions';
import {listTopicsSelector} from './../../redux/Topics/selectors';
import {connect} from 'react-redux';
import _ from 'lodash';

class ChooseQiuzScreen extends Component {
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
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      listTopis: [],
      loading: false,
    };
  }

  componentDidMount() {
    if (!!this.props.listTopis) {
      this.setState({listTopis: this.props.listTopis});
    } else {
      this.props.doGetListTopics();
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
      <TouchableOpacity onPress={() => this._startExam(item)}>
        <View style={styles.itemExam}>
          <Image
            style={styles.imageLabel}
            source={{uri: _.get(item, 'image')}}
          />
          <View style={styles.wrapLabel}>
            <Text style={styles.titleExam}>{_.get(item, 'name')}</Text>
            <Text numberOfLines={2} style={styles.desExam}>
              {_.get(item, 'description')}
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
      this.props.doGetListTopics();
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
    doGetListTopics: () => {
      dispatch(getAllTopicsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseQiuzScreen);
