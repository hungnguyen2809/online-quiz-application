/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import {debounce, get} from 'lodash';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import Spinner from 'react-native-loading-spinner-overlay';
import {Navigation} from 'react-native-navigation';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeUploadImage} from '../../api/createApiService';
import {
  checkPermissionsCamera,
  checkPermissionsPhoto,
} from '../../common/checkPermission';
import {
  onChooseImageLibrary,
  onTakePhotoCamera,
} from '../../common/imageCameraPicker';
import ModalBase from '../../components/ModalBase';
import {
  deleteAccountToStorage,
  deleteTokenToStorage,
  getTokenToStorage,
} from './../../common/asyncStorage';
import {formatPhone} from './../../common/format';
import Toast from './../../components/Toast';
import {
  LogoutAccountAction,
  unregisterRefreshTokenAction,
  updateAvatarAction,
} from './../../redux/Account/actions';
import {getAccountSelector} from './../../redux/Account/selectors';
import {appScreens, screenAuth} from './../config-screen';
import ItemInfo from './components/ItemInfo';
import {styles} from './styles';

const isIOS = Platform.OS === 'ios';

class ProfileScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Tài khoản',
        icon: require('./../../assets/icons/ic-profile-32.png'),
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
      account: {},
      loadingBg: false,
      loadingAvt: false,
      loadingUpdateAvt: false,
      showReviewAvt: false,
      fileSource: null,
    };

    this.refToast = React.createRef();
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

  onChooseImage = async () => {
    const permission = await checkPermissionsPhoto();
    if (permission) {
      onChooseImageLibrary((fileSource) => {
        // Alert.alert('Thông báo', 'Bạn có muốn thay đổi ảnh đại diện mới ?', [
        //   {
        //     text: 'Hủy',
        //     style: 'destructive',
        //     onPress: () => {},
        //   },
        //   {
        //     text: 'Đồng ý',
        //     style: 'default',
        //     onPress: () => this._handleSaveChangeAvatar(fileSource),
        //   },
        // ]);
        this.setState({fileSource, showReviewAvt: true});
      });
    }
  };

  onTakePhoto = async () => {
    const permission = await checkPermissionsCamera();
    if (permission) {
      onTakePhotoCamera((fileSource) => {
        // Alert.alert('Thông báo', 'Bạn có muốn thay đổi ảnh đại diện mới ?', [
        //   {
        //     text: 'Hủy',
        //     style: 'destructive',
        //     onPress: () => {},
        //   },
        //   {
        //     text: 'Đồng ý',
        //     style: 'default',
        //     onPress: () => this._handleSaveChangeAvatar(fileSource),
        //   },
        // ]);
        this.setState({fileSource, showReviewAvt: true});
      });
    }
  };

  onDiscardChangeAvatar = () => {
    this.setState({showReviewAvt: false}, () => {
      this.setState({fileSource: null});
    });
  };

  onSubmitChangeAvatar = () => {
    if (this.state.fileSource) {
      this._handleSaveChangeAvatar(this.state.fileSource);
    }
  };

  _handleSaveChangeAvatar = async (fileImage) => {
    try {
      const imageResize = await ImageResizer.createResizedImage(
        fileImage.uri,
        fileImage.width / 3 > 300 ? fileImage.width / 3 : fileImage.width,
        fileImage.height / 3 > 300 ? fileImage.height / 3 : fileImage.height,
        'JPEG',
        90,
        0,
        undefined,
        false,
        {mode: 'contain', onlyScaleDown: false},
      );

      this.setState({loadingUpdateAvt: true});

      // const formData = new FormData();
      // formData.append('id', this.state.account.id);
      // formData.append('file', {
      //   name: imageResize.name,
      //   height: imageResize.height,
      //   width: imageResize.width,
      //   size: imageResize.size,
      //   type: 'image/jpeg',
      //   uri: isIOS ? imageResize.uri.replace('file://', '') : imageResize.uri,
      // });

      const imageUpload = {
        name: uuid.v4() + '_' + get(this.state.account, 'id', '0'),
        height: imageResize.height,
        width: imageResize.width,
        size: imageResize.size,
        type: 'image/jpeg',
        uri: isIOS ? imageResize.uri.replace('file://', '') : imageResize.uri,
      };
      const resImage = await makeUploadImage(imageUpload);

      // this.props.doUpdateAvatar(formData, {
      //   callbacksOnSuccess: () => {
      //     this.refToast.current.onShowToast('Cập nhật thành công !', 2000);
      //     this.setState({loadingUpdateAvt: false});
      //   },
      //   callbacksOnFail: () => {},
      // });
      const payload = {
        id: get(this.state.account, 'id', '0'),
        imageUrl: resImage.secure_url,
      };

      this.props.doUpdateAvatar(payload, {
        callbacksOnSuccess: () => {
          this.setState({loadingUpdateAvt: false, showReviewAvt: false});
          if (Platform.OS === 'ios') {
            Alert.alert('Thông báo', 'Cập nhật thành công');
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Cập nhật thành công',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              20,
            );
          }
        },
        callbacksOnFail: () => {},
      });
    } catch (error) {
      console.log(error.message);
      this.setState({loading: false}, () => {
        Alert.alert(
          'Thông báo !',
          'Lỗi không thể thực hiện. Vui lòng thử lại !',
        );
      });
    }
  };

  _goToScreen = debounce(() => {
    Navigation.push(this.props.componentId, {
      component: {
        name: appScreens.ProfileDetails.name,
        passProps: {
          parentComponentId: this.props.componentId,
        },
      },
    });
  }, 300);

  _handleLogout = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn đăng xuất ?', [
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: async () => {
          const tokenStorage = await getTokenToStorage();
          const payload = {token: get(tokenStorage, 'tokenRefresh', '')};
          this.props.doUnregisterRefreshToken(payload, {
            callbacksOnSuccess: () => {},
            callbacksOnFail: () => {},
          });
          await deleteTokenToStorage();
          await deleteAccountToStorage();
          await Navigation.setRoot(screenAuth);
          LogoutAccountAction();
        },
      },
      {
        text: 'Hủy',
        style: 'cancel',
        onPress: () => {},
      },
    ]);
  };

  render() {
    const {account} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View>
          {get(account, 'image') ? (
            <View style={{backgroundColor: '#dcdcdc'}}>
              <Image
                style={styles.imageBackground}
                source={{uri: get(account, 'image')}}
                onLoadStart={() => this.setState({loadingBg: true})}
                onLoad={() => this.setState({loadingBg: false})}
              />
              {this.state.loadingBg ? (
                <ActivityIndicator
                  size={'large'}
                  color={'red'}
                  style={styles.loadingBg}
                />
              ) : null}
            </View>
          ) : (
            <Image
              style={styles.imageBackground}
              source={require('./../../assets/images/background-1.jpg')}
            />
          )}
          <View style={styles.wrapAvatar}>
            {get(account, 'image') ? (
              <View>
                <Image
                  style={styles.avatar}
                  source={{uri: get(account, 'image')}}
                  onLoadStart={() => this.setState({loadingAvt: true})}
                  onLoad={() => this.setState({loadingAvt: false})}
                />
                {this.state.loadingAvt ? (
                  <ActivityIndicator color={'red'} style={styles.loadingAvt} />
                ) : null}
              </View>
            ) : (
              <Image
                style={styles.avatar}
                source={require('./../../assets/icons/avatar/5.jpg')}
              />
            )}
            <View style={styles.btnChangeAvatar}>
              <Menu key={'pop-menu-change-avatar'}>
                <MenuTrigger>
                  <MaterialIcons name={'edit'} size={20} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    style={styles.menuOption}
                    onSelect={debounce(this.onTakePhoto, 300)}>
                    <MaterialIcons name={'photo-camera'} size={25} />
                    <Text>Chụp ảnh</Text>
                  </MenuOption>
                  <View style={styles.divider} />
                  <MenuOption
                    style={styles.menuOption}
                    onSelect={debounce(this.onChooseImage, 300)}>
                    <MaterialIcons name={'photo-library'} size={25} />
                    <Text>Thư viện</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ItemInfo
              onPress={this._goToScreen}
              iconName={'person'}
              text={get(account, 'name', ' ')}
            />
            <ItemInfo
              onPress={this._goToScreen}
              iconName={'smartphone'}
              text={formatPhone(get(account, 'phone', ' '))}
            />
            <ItemInfo
              onPress={this._goToScreen}
              iconName={'email'}
              text={get(account, 'email', ' ')}
            />
          </ScrollView>
        </View>
        <View style={styles.wrapFooter}>
          <TouchableOpacity
            style={styles.btnLogout}
            activeOpacity={0.7}
            onPress={this._handleLogout}>
            <Text style={styles.titleLogout}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        {this.state.fileSource ? (
          <ModalBase visible={this.state.showReviewAvt}>
            <View style={styles.warpReviewAvt}>
              <Image
                source={{uri: this.state.fileSource.uri}}
                style={styles.imageReview}
              />
              <View style={styles.wrapBtnReviewAvt}>
                <TouchableOpacity
                  onPress={debounce(this.onDiscardChangeAvatar, 300)}
                  activeOpacity={1}
                  style={{
                    backgroundColor: '#F5D8D1',
                    flex: 1,
                    alignItems: 'center',
                    margin: 10,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#FF3600', marginVertical: 12}}>
                    Hủy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={debounce(this.onSubmitChangeAvatar, 300)}
                  activeOpacity={1}
                  style={{
                    backgroundColor: '#E2F0D9',
                    flex: 1,
                    alignItems: 'center',
                    margin: 10,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#3CA500', marginVertical: 12}}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ModalBase>
        ) : null}
        <Toast ref={this.refToast} />
        <Spinner visible={this.state.loadingUpdateAvt} />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  account: getAccountSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    doUpdateAvatar: (data, callbacks) => {
      dispatch(updateAvatarAction(data, callbacks));
    },
    doUnregisterRefreshToken: (data, callbacks) => {
      dispatch(unregisterRefreshTokenAction(data, callbacks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
