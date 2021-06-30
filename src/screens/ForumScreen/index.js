/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import {debounce, get, map, size} from 'lodash';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {createStructuredSelector} from 'reselect';
import AlertNoti from '../../components/AlertNoti';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostItem from '../../components/PostItem';
import {getAccountSelector} from '../../redux/Account/selectors';
import {getAllPostAction} from '../../redux/Post/actions';
import {getAllPostSelector, getPagePost} from '../../redux/Post/selectors';
import SocketManager from '../../socketIO';
import {SOCKET_SERVER_SEND_NEW_POST} from '../../socketIO/constant';
import {appScreens} from '../config-screen';
import {goToScreenWithPassProps} from '../MethodScreen';
import {SCREEN_WIDTH} from './../../common/dimensionScreen';
import HeadTopBar from './../../components/HeadTopBar';
import {styles} from './styles';

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
    Navigation.events().bindComponent(this);

    this.state = {
      loading: false,
      loadingAvt: false,
      listPosts: [],
      showNewPost: false,
      curPage: 1,
      loadMore: false,
    };

    this.layoutProvider = new LayoutProvider(
      (index) => {
        return 'LAYOUT';
      },
      (type, dim, index) => {
        switch (type) {
          case 'LAYOUT':
            dim.width = SCREEN_WIDTH;
            dim.height = 150;
            break;
          default:
            dim.width = SCREEN_WIDTH;
            dim.height = 150;
            break;
        }
      },
    );

    this.isDidAppear = false;
    this.refListPost = React.createRef();
  }

  componentDidMount() {
    if (get(this.props.account, 'size') !== 0) {
      this.setState({account: this.props.account});
    }
    //Handle Socket
    SocketManager.on(SOCKET_SERVER_SEND_NEW_POST, () => {
      if (!this.state.showNewPost) {
        this.openCloseAlertNoti();
      }
    });
  }

  componentDidAppear() {
    if (this.isDidAppear === false) {
      this.onGetListAllPost();
      this.isDidAppear = true;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.account !== nextProps.account) {
        this.setState({account: nextProps.account});
      }
    }

    if (!!nextProps.listPosts && this.props.listPosts !== nextProps.listPosts) {
      this.setState({listPosts: nextProps.listPosts}, () => {
        if (!!nextProps.pagePost && nextProps.pagePost === 1) {
          setTimeout(this.onScrollToTop, 500);
        }
      });
    }
  }

  onGetListAllPost = (page = 1) => {
    let offset = page * 10 - 10;
    const payload = {offset};
    this.props.doGetListAllPost(payload, page, {
      callbackOnSuccess: ({isNull}) => {
        if (!isNull) {
          this.setState({
            curPage: page,
            loading: false,
            showNewPost: false,
            loadMore: false,
          });
        } else {
          this.setState({loading: false, showNewPost: false, loadMore: false});
        }
      },
      callbackOnFail: () => {
        this.setState({loading: false, showNewPost: false, loadMore: false});
      },
    });
  };

  onScrollToTop = () => {
    this.refListPost.current.scrollToOffset(0, 0, true);
  };

  _renderListNonData = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefreshPost}
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
          {/* <Text>Không có bài viết</Text> */}
          <Text>Vuốt để cập nhật bài viết</Text>
        </ScrollView>
      </View>
    );
  };

  _layoutProvider = () => {
    return this.layoutProvider;
  };

  _dataProvider = () => {
    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
      this.state.listPosts,
    );
    return _dataProvider;
  };

  _renderRowItem = (type, item, index, extendState) => {
    switch (type) {
      case 'LAYOUT':
        return (
          <PostItem
            row={item}
            account={this.props.account}
            onDetailPost={debounce(this.goToPostDetailsScreen, 200)}
          />
        );
      default:
        return null;
    }
  };

  goToPostDetailsScreen = (row) => {
    goToScreenWithPassProps(
      this.props.componentId,
      appScreens.PostDetailsScreen.name,
      {
        row,
        parentComponentId: this.props.componentId,
        onUpdatePost: ({id_post, number}) => {
          const mapPosts = map(this.state.listPosts, (item) => {
            if (item.id_post === id_post && item.number !== number) {
              return {
                ...item,
                number,
              };
            } else {
              return {...item};
            }
          });
          this.setState({listPosts: mapPosts});
        },
      },
    );
  };

  onCreatePost = () => {
    goToScreenWithPassProps(
      this.props.componentId,
      appScreens.PostCreatesScreen.name,
      {
        account: this.props.account,
        parentComponentId: this.props.componentId,
        onRefreshPost: () => {
          this.onGetListAllPost();
        },
      },
    );
  };

  _onRefreshPost = () => {
    this.setState({loading: true});
    this.onGetListAllPost();
  };

  openCloseAlertNoti = () => {
    this.setState({showNewPost: !this.state.showNewPost});
  };

  handlePressAlertNoti = () => {
    // this.refListPost.current.scrollToOffset(0, 0, true);
    this.onGetListAllPost();
  };

  _renderFooterLoadMore = () => {
    return this.state.loadMore ? (
      <ActivityIndicator color={'red'} style={{marginBottom: 10}} />
    ) : (
      <View />
    );
  };

  onLoadMoreData = () => {
    this.setState({loadMore: true}, () =>
      this.onGetListAllPost(this.state.curPage + 1),
    );
  };

  render() {
    const {account} = this.state;
    return (
      <View style={styles.container}>
        <HeadTopBar />
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
          </View>
          <View style={styles.wrapContent}>
            {size(this.state.listPosts) ? (
              <RecyclerListView
                ref={this.refListPost}
                dataProvider={this._dataProvider()}
                layoutProvider={this._layoutProvider()}
                rowRenderer={this._renderRowItem}
                forceNonDeterministicRendering={true}
                canChangeSize={true}
                scrollViewProps={{
                  refreshControl: (
                    <RefreshControl
                      refreshing={this.state.loading}
                      onRefresh={this._onRefreshPost}
                    />
                  ),
                }}
                renderFooter={this._renderFooterLoadMore}
                onEndReachedThreshold={50}
                onEndReached={this.onLoadMoreData}
              />
            ) : (
              this._renderListNonData()
            )}
          </View>
        </View>
        <AlertNoti
          visible={this.state.showNewPost}
          title={'Bạn có bài viết mới'}
          onClose={this.openCloseAlertNoti}
          onPress={this.handlePressAlertNoti}
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  account: getAccountSelector(),
  listPosts: getAllPostSelector(),
  pagePost: getPagePost(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    doGetListAllPost: (payload, page, callbacks) => {
      dispatch(getAllPostAction(payload, page, callbacks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumScreen);
