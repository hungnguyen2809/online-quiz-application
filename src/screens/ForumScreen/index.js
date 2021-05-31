/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {get} from 'lodash';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAccountSelector} from '../../redux/Account/selectors';
import HeadTopBar from './../../components/HeadTopBar';
import {styles} from './styles';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostItem from '../../components/PostItem';
import {goToScreenWithPassProps} from '../MethodScreen';
import {appScreens} from '../config-screen';

class ForumScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Hỏi đáp',
        icon: require('./../../assets/icons/ic-star_half_empty.png'),
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
      loadingAvt: false,
    };
  }

  componentDidMount() {
    if (get(this.props.account, 'size') !== 0) {
      this.setState({account: this.props.account});
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.account !== nextProps.account) {
        this.setState({account: nextProps.account});
      }
    }
  }

  goToPostDetailsScreen = (row) => {
    goToScreenWithPassProps(
      this.props.componentId,
      appScreens.PostDetailsScreen.name,
      {
        row,
        parentComponentId: this.props.componentId,
      },
    );
  };

  onCreatePost = () => {
    goToScreenWithPassProps(
      this.props.componentId,
      appScreens.PostCreatesScreen.name,
      {
        parentComponentId: this.props.componentId,
      },
    );
  };

  render() {
    const {account} = this.state;
    return (
      <View style={styles.container}>
        <HeadTopBar />
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Đang phát triển</Text>
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{textAlign: 'center'}}>
            ❤️
          </Animatable.Text>
        </View> */}
        <View style={{flex: 1}}>
          <View style={styles.wrapHeader}>
            <TouchableOpacity
              style={styles.btnNewQuestion}
              activeOpacity={0.8}
              onPress={this.onCreatePost}>
              {get(account, 'image') ? (
                <>
                  <Image
                    style={styles.avatar}
                    source={{uri: get(account, 'image')}}
                    onLoadStart={() => this.setState({loadingAvt: true})}
                    onLoad={() => this.setState({loadingAvt: false})}
                  />
                  {this.state.loadingAvt ? (
                    <ActivityIndicator
                      color={'red'}
                      style={styles.loadingAvt}
                    />
                  ) : null}
                </>
              ) : (
                <Image
                  style={styles.avatar}
                  source={require('./../../assets/icons/avatar/5.jpg')}
                />
              )}
              <Text style={styles.textQuestion}>Bạn muốn hỏi gì ?</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnFilter}>
              <FontAwesome name={'filter'} size={30} color={'#f39c12'} />
            </TouchableOpacity> */}
          </View>
          <View style={styles.wrapContent}>
            <ScrollView>
              <PostItem onDetailPost={this.goToPostDetailsScreen} />
              <PostItem />
              <PostItem />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  account: getAccountSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumScreen);
