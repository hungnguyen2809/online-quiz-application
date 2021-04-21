/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {get, isEmpty, toString} from 'lodash';
import {deleteAccountToStorage} from './../../common/asyncStorage';
import {Navigation} from 'react-native-navigation';
import {appScreens, screenAuth} from './../config-screen';
import {styles} from './styles';
import {formatPhone} from './../../common/format';
import {
  LogoutAccountAction,
  updateAvatarAction,
} from './../../redux/Account/actions';
import {getAccountSelector} from './../../redux/Account/selectors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ItemInfo from './components/ItemInfo';
import Toast from './../../components/Toast';

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
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      account: {},
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

  _handleChooseImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        Alert.alert('Thông báo', 'Bạn có muốn thay đổi ảnh đại diện mới ?', [
          {
            text: 'Hủy',
            style: 'destructive',
            onPress: () => {},
          },
          {
            text: 'Đồng ý',
            style: 'default',
            onPress: () => this._handleSaveChangeAvatar(response),
          },
        ]);
      },
    );
  };

  _handleSaveChangeAvatar = (fileImage) => {
    try {
      const formData = new FormData();
      formData.append('id', this.state.account.id);
      formData.append('file', {
        name: fileImage.fileName,
        type: fileImage.type,
        uri: isIOS ? fileImage.uri.replace('file://', '') : fileImage.uri,
      });

      this.props.doUpdateAvatar(formData, {
        callbacksOnSuccess: () => {
          this.refToast.current.onShowToast('Cập nhật thành công !', 2000);
        },
        callbacksOnFail: () => {},
      });
    } catch (error) {
      this.setState({loading: false}, () => {
        Alert.alert(
          'Thông báo !',
          'Lỗi không thể thực hiện. Vui lòng thử lại !',
        );
      });
    }
  };

  _goToScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: appScreens.ProfileDetails.name,
        passProps: {
          parentComponentId: this.props.componentId,
        },
      },
    });
  };

  _handleLogout = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn đăng xuất ?', [
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: async () => {
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
    // console.log('data: ', account);
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View>
          {get(account, 'image') ? (
            <Image
              style={styles.imageBackground}
              source={{uri: get(account, 'image')}}
            />
          ) : (
            <Image
              style={styles.imageBackground}
              source={require('./../../assets/images/background-1.jpg')}
            />
          )}
          <View style={styles.wrapAvatar}>
            {get(account, 'image') ? (
              <Image
                style={styles.avatar}
                source={{uri: get(account, 'image')}}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('./../../assets/icons/avatar/5.jpg')}
              />
            )}
            <View style={styles.btnChangeAvatar}>
              <TouchableOpacity onPress={this._handleChooseImage}>
                <MaterialIcons name={'edit'} size={20} />
              </TouchableOpacity>
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
        <Toast ref={this.refToast} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
