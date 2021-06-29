/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-native/no-inline-styles */
import {debounce, get, isEmpty, size, trim} from 'lodash';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImageView from 'react-native-image-viewing';
import Spinner from 'react-native-loading-spinner-overlay';
import uuid from 'react-native-uuid';
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
// import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {createStructuredSelector} from 'reselect';
import {makeUploadImage} from '../../api/createApiService';
// import {SCREEN_WIDTH} from '../../common/dimensionScreen';
import {getTimeFromNow} from '../../common/format';
import {onToastAlert} from '../../common/validate';
import PostItemComment from '../../components/PostItemComment';
import {getAccountSelector} from '../../redux/Account/selectors';
import {
  createPostCommentAction,
  getPostCommentAction,
} from '../../redux/Post/actions';
import {
  SOCKET_CLIENT_SEND_JOIN_ROOM_POST,
  SOCKET_CLIENT_SEND_LEAVE_ROOM_POST,
  SOCKET_CLIENT_SEND_USER_FOCUS_POSTCOMMENT,
  SOCKET_CLIENT_SEND_USER_UNFOCUS_POSTCOMMENT,
  SOCKET_SERVER_SEND_USER_FOCUS_POSTCOMMENT,
  SOCKET_SERVER_SEND_USER_UNFOCUS_POSTCOMMENT,
} from '../../socketIO/constant';
// import {getAllPostCommentSelector} from '../../redux/Post/selectors';
import {backToLastScreen} from '../MethodScreen';
import SocketManager from './../../socketIO';
import {styles} from './styles';

class PostDetailsScreen extends Component {
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
      loadingAvt: false,
      showKeybroad: false,
      heightKeybroad: 0,
      textComment: '',
      fileSource: null,
      loadingImage: false,

      loading: false,
      loadingRefresh: false,
      account: {},
      listPostComments: [],
      showImageView: false,

      otherUserComment: false,
    };

    this.keyBroadHide = null;
    this.keyBroadShow = null;

    // this.layouyProvider = new LayoutProvider(
    //   (index) => {
    //     return index === 0 ? 'POST' : 'POST_COMMENT';
    //   },
    //   (type, dim, index) => {
    //     switch (type) {
    //       case 'POST':
    //         dim.width = SCREEN_WIDTH;
    //         dim.height = 150;
    //         break;
    //       case 'POST_COMMENT':
    //         dim.width = SCREEN_WIDTH;
    //         dim.height = 150;
    //         break;
    //       default:
    //         dim.width = SCREEN_WIDTH;
    //         dim.height = 0;
    //         break;
    //     }
    //   },
    // );
  }

  componentDidMount() {
    if (!!this.props.listPostComments) {
      this.setState({listPostComments: this.props.listPostComments});
    }
    if (!!this.props.account) {
      this.setState({account: this.props.account});
    }

    this.onGetListPostComment();
    this.onRegisterEventKeybroad();
    this.onRegisterEventSocket();
  }

  onRegisterEventSocket = () => {
    //JOIN ROOM POST
    SocketManager.emit(SOCKET_CLIENT_SEND_JOIN_ROOM_POST, {
      id_post: get(this.props.row, 'id_post'),
    });

    //When other people input
    SocketManager.on(
      SOCKET_SERVER_SEND_USER_FOCUS_POSTCOMMENT,
      debounce(() => {
        this.setState({otherUserComment: true});
      }, 300),
    );
    SocketManager.on(
      SOCKET_SERVER_SEND_USER_UNFOCUS_POSTCOMMENT,
      debounce(() => {
        this.setState({otherUserComment: false});
      }, 300),
    );
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (
    //   !!nextProps.listPostComments &&
    //   this.props.listPostComments !== nextProps.listPostComments
    // ) {
    //   this.setState({
    //     listPostComments: nextProps.listPostComments,
    //     loadingRefresh: false,
    //   });
    // }
  }

  componentWillUnmount() {
    this.keyBroadHide && this.keyBroadHide.remove();
    this.keyBroadShow && this.keyBroadShow.remove();
    // Leave room post
    SocketManager.emit(SOCKET_CLIENT_SEND_LEAVE_ROOM_POST, {
      id_post: get(this.props.row, 'id_post'),
    });
  }

  onRegisterEventKeybroad = () => {
    this.keyBroadShow = Keyboard.addListener('keyboardDidShow', (ev) => {
      this.setState({
        showKeybroad: true,
        heightKeybroad: ev.endCoordinates.height - 10,
      });
    });
    this.keyBroadHide = Keyboard.addListener('keyboardDidHide', (ev) => {
      this.setState({showKeybroad: false, heightKeybroad: 0});
    });
  };

  onBackScreen = () => {
    backToLastScreen(this.props.componentId);
    const param = {
      id_post: get(this.props.row, 'id_post'),
      number: this.state.listPostComments.length,
    };
    this.props.onUpdatePost && this.props.onUpdatePost(param);
  };

  onChooseImage = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        (response) => {
          if (response.didCancel) {
            return;
          }
          this.setState({fileSource: response});
        },
      );
    } catch (error) {
      Alert.alert('Thông báo !', 'Lỗi không thể chọn ảnh. Vui lòng thử lại !');
    }
  };

  onSubmitSendComment = async () => {
    const textComment = trim(this.state.textComment);
    let resImage = null;

    if (isEmpty(textComment)) {
      onToastAlert('Bạn chưa nhập nội dung trả lời');
      return;
    }

    this.setState({loading: true});
    try {
      if (this.state.fileSource) {
        const imageResize = await ImageResizer.createResizedImage(
          this.state.fileSource.uri,
          this.state.fileSource.width / 3 > 600
            ? this.state.fileSource.width / 3
            : this.state.fileSource.width,
          this.state.fileSource.height / 3 > 600
            ? this.state.fileSource.height / 3
            : this.state.fileSource.height,
          'JPEG',
          95,
          0,
          undefined,
          false,
          {mode: 'contain', onlyScaleDown: false},
        );
        const imageUpload = {
          name: uuid.v4(),
          height: imageResize.height,
          width: imageResize.width,
          size: imageResize.size,
          type: 'image/jpeg',
          uri:
            Platform.OS === 'ios'
              ? imageResize.uri.replace('file://', '')
              : imageResize.uri,
        };
        resImage = await makeUploadImage(imageUpload, 'post');
      }

      const payload = {
        id_post: get(this.props.row, 'id_post', null),
        id_user: get(this.props.account, 'id', null),
        comment: textComment,
        image: resImage ? resImage.secure_url : null,
      };

      this.props.doCreatePostComment(payload, {
        callbackOnSuccess: () => {
          Keyboard.dismiss();
          this.onGetListPostComment();
          this.setState({loading: false, fileSource: null, textComment: ''});
        },
        callbackOnFail: () => {
          this.setState({loading: false});
        },
      });
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi', error.message);
      this.setState({loading: false});
    }
  };

  onGetListPostComment = () => {
    const payload = {
      id_post: get(this.props.row, 'id_post', null),
    };
    this.props.doGetPostComment(payload, {
      callbackOnSuccess: (listPostComments) => {
        this.setState({listPostComments, loadingRefresh: false});
      },
      callbackOnFail: () => {
        this.setState({loadingRefresh: false});
      },
    });
  };

  onRefreshPostComment = () => {
    this.setState({loadingRefresh: true});
    this.onGetListPostComment();
  };

  // _layoutProvider = () => {
  //   return this.layouyProvider;
  // };

  // _dataProvider = () => {
  //   let dataProvider = [];
  //   dataProvider.push(this.props.row);
  //   dataProvider.push(this.state.listPostComments);
  //   const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
  //     dataProvider,
  //   );
  //   return _dataProvider;
  // };

  // _rowRenderItem = (type, item, index, extendState) => {
  //   switch (type) {
  //     case 'POST':
  //       return (
  //         <View>
  //           <Text style={styles.textContent}>
  //             {get(this.props.row, 'content', '')}
  //           </Text>
  //           {get(this.props.row, 'image', null) ? (
  //             <View>
  //               <Image
  //                 style={styles.imagePost}
  //                 source={{uri: get(this.props.row, 'image')}}
  //                 onLoadStart={() => this.setState({loadingImage: true})}
  //                 onLoad={() => this.setState({loadingImage: false})}
  //               />
  //               {extendState.loadingImage ? (
  //                 <ActivityIndicator
  //                   color={'red'}
  //                   style={styles.loadingImagePost}
  //                 />
  //               ) : null}
  //             </View>
  //           ) : null}
  //           <View style={styles.divider} />
  //           {extendState.sizePostComment ? (
  //             <Text>Trả lời:</Text>
  //           ) : (
  //             <Text style={{textAlign: 'center'}}>
  //               Hãy là người đầu tiên trả lời
  //             </Text>
  //           )}
  //         </View>
  //       );
  //     case 'POST_COMMENT':
  //       return <PostItemComment />;
  //     default:
  //       return null;
  //   }
  // };

  onFocusInputComment = () => {
    SocketManager.emit(SOCKET_CLIENT_SEND_USER_FOCUS_POSTCOMMENT);
  };

  onUnFocusInputCommnet = () => {
    SocketManager.emit(SOCKET_CLIENT_SEND_USER_UNFOCUS_POSTCOMMENT);
  };

  render() {
    const {row} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <TouchableOpacity onPress={this.onBackScreen} style={styles.btnBack}>
            <Image
              style={{width: 25, height: 25}}
              source={require('./../../assets/icons/arrow.png')}
            />
          </TouchableOpacity>
          {get(row, 'avatar') ? (
            <>
              <Image
                style={styles.avatar}
                source={{uri: get(row, 'avatar')}}
                onLoadStart={() => this.setState({loadingAvt: true})}
                onLoad={() => this.setState({loadingAvt: false})}
              />
              {this.state.loadingAvt ? (
                <ActivityIndicator color={'red'} style={styles.loadingAvt} />
              ) : null}
            </>
          ) : (
            <Image
              style={styles.avatar}
              source={require('./../../assets/icons/avatar/5.jpg')}
            />
          )}
          <View style={{marginLeft: 10, flex: 1}}>
            <Text
              allowFontScaling={false}
              style={styles.textName}
              numberOfLines={1}>
              {get(row, 'name', '')}
            </Text>
            <Text allowFontScaling={false} style={styles.textTime}>
              {getTimeFromNow(get(row, 'date_create', ''))}
            </Text>
          </View>
          {get(this.state.account, 'id', -1) === get(row, 'id_user', -2) ? (
            <TouchableOpacity style={{marginRight: 10}}>
              <MateriaIcon name={'more-vert'} size={20} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.wrapContent}>
          <FlatList
            ListHeaderComponent={
              <View>
                <Text style={styles.textContent}>
                  {get(row, 'content', '')}
                </Text>
                {get(row, 'image', null) ? (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{alignSelf: 'flex-start'}}
                      onPress={() => this.setState({showImageView: true})}>
                      <Image
                        style={styles.imagePost}
                        source={{uri: get(row, 'image')}}
                        onLoadStart={() => this.setState({loadingImage: true})}
                        onLoad={() => this.setState({loadingImage: false})}
                      />
                    </TouchableOpacity>
                    {this.state.loadingImage ? (
                      <ActivityIndicator
                        color={'red'}
                        style={styles.loadingImagePost}
                      />
                    ) : null}
                  </View>
                ) : null}
                <View style={styles.divider} />
                {size(this.state.listPostComments) ? (
                  <Text>Trả lời:</Text>
                ) : (
                  <Text style={{textAlign: 'center'}}>
                    Hãy là người đầu tiên bình luận
                  </Text>
                )}
                {get(row, 'image', null) ? (
                  <ImageView
                    images={[{uri: get(row, 'image')}]}
                    visible={this.state.showImageView}
                    imageIndex={0}
                    onRequestClose={() => this.setState({showImageView: false})}
                  />
                ) : null}
              </View>
            }
            data={this.state.listPostComments}
            renderItem={({item}) => <PostItemComment row={item} />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.loadingRefresh}
                onRefresh={this.onRefreshPostComment}
              />
            }
          />
          {/* <RecyclerListView
            dataProvider={this._dataProvider()}
            layoutProvider={this._layoutProvider()}
            forceNonDeterministicRendering={true}
            canChangeSize={true}
            rowRenderer={this._rowRenderItem}
            extendedState={{
              loadingImage: this.state.loadingImage,
              sizePostComment: size(this.state.listPostComments),
            }}
          /> */}
        </View>
        {this.state.otherUserComment ? (
          <View style={styles.wrapNotiInput}>
            <Text style={{lineHeight: 25, marginRight: 10, fontSize: 15}}>
              Có người đang bình luận
            </Text>
            <Image
              style={styles.imageLoading}
              source={require('./../../assets/animated/loadding.gif')}
            />
          </View>
        ) : null}
        {this.state.fileSource ? (
          <View style={{marginLeft: 10}}>
            <Image
              style={{width: 80, height: 80}}
              source={{uri: this.state.fileSource.uri}}
            />
            <TouchableOpacity
              style={styles.btnTrashImage}
              onPress={() => this.setState({fileSource: null})}>
              <Image
                style={{width: 20, height: 20, tintColor: '#fff'}}
                source={require('./../../assets/icons/icons-delete_trash.png')}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={[
            styles.wrapFooter,
            {
              marginBottom: Platform.select({
                ios: this.state.showKeybroad ? this.state.heightKeybroad : 0,
                android: 5,
              }),
            },
          ]}>
          <TextInput
            onFocus={debounce(this.onFocusInputComment, 300)}
            onBlur={debounce(this.onUnFocusInputCommnet, 300)}
            value={this.state.textComment}
            multiline={true}
            style={styles.textInput}
            placeholder={'Nhập nội dung'}
            onChangeText={(text) => this.setState({textComment: text})}
          />
          <View style={styles.wrapBtnFooter}>
            <TouchableOpacity onPress={this.onChooseImage}>
              <Image
                style={{width: 23, height: 23}}
                source={require('./../../assets/icons/icons-camera.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSubmitSendComment}>
              <Image
                style={{width: 30, height: 30}}
                source={require('./../../assets/icons/icons-sent.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // listPostComments: getAllPostCommentSelector(),
  account: getAccountSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    doGetPostComment: (payload, callbacks) => {
      dispatch(getPostCommentAction(payload, callbacks));
    },
    doCreatePostComment: (payload, callbacks) => {
      dispatch(createPostCommentAction(payload, callbacks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsScreen);
