import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {
  deleteAccountToStorage,
  getAccountToStorage,
} from './../../common/asyncStorage';
import {Navigation} from 'react-native-navigation';
import {appScreens, screenAuth} from './../config-screen';
import {styles} from './styles';
import {formatPhone} from './../../common/format';
import {
  LogoutAccountAction,
  LoginAccountAction,
} from './../../redux/Account/actions';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ItemInfo from './components/ItemInfo';
import {createStructuredSelector} from 'reselect';
import {LoginAccountActionSuccess} from './../../redux/Account/actions';
import {getAccountSelector} from './../../redux/Account/selectors';
import {get} from 'lodash';

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

  _handleSaveChangeAvatar = async (fileImage) => {
    try {
      // const image = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.images],
      // });
      // // console.log(image.name);
      // Alert.alert('Thông báo', 'Bạn có chắc muốn thay đổi ảnh đại diện ?', [
      //   {
      //     text: 'Đồng ý',
      //     style: 'destructive',
      //     onPress: () => {
      //       const data = new FormData();
      //       data.append('id', this.state.profile.id);
      //       data.append('image', image);
      //       // console.log('Imgae: ', image);
      //       // console.log("Data: ", data);
      //       this.setState({loading: true}, () => {
      //         setTimeout(async () => {
      //           const result = await POST2(
      //             URL_USER_AVATAR,
      //             data,
      //             this.state.profile.token,
      //           );
      //           // console.log(result.data.payload);
      //           await deleteAccountToStorage();
      //           await setAccountToStorage(result.data.payload);
      //           this.setState({loading: false}, () => {
      //             this._getAccountInfoStorage();
      //           });
      //         }, 2100);
      //       });
      //     },
      //   },
      //   {
      //     text: 'Hủy',
      //     style: 'cancel',
      //     onPress: () => null,
      //   },
      // ]);
      const formData = new FormData();
      formData.append('id', this.state.account.id);
      formData.append('image', fileImage);
    } catch (error) {
      // if (DocumentPicker.isCancel(error)) {
      //   return;
      // }
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
    // console.log('data: ', this.props.account);
    const {account} = this.state;
    return (
      <View style={styles.container}>
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
              text={get(account, 'name', '')}
            />
            <ItemInfo
              onPress={this._goToScreen}
              iconName={'smartphone'}
              text={formatPhone(get(account, 'phone', ''))}
            />
            <ItemInfo
              onPress={this._goToScreen}
              iconName={'email'}
              text={get(account, 'email', '')}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
