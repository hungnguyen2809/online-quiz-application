/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {isEqual} from 'lodash';
import {backToLastScreen} from './../MethodScreen';
import {getAccountToStorage} from './../../common/asyncStorage';
import FieldInfo from './components/FieldInfo';
import {convertDate} from './../../common/formatDate';
import ModalDateTime from '../../components/ModalDateTime';
import {styles} from './styles';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
    this.oldProfile = null;

    this.modelDateTime = React.createRef();
  }

  _onGoBack = () => {
    backToLastScreen(this.props.componentId);
  };

  _getAccountInfoStorage = async () => {
    const account = await getAccountToStorage();
    if (account) {
      this.oldProfile = {...account};
      this.setState({profile: account});
    }
  };

  _onDateChange = (date) => {
    // console.log('Date', date);
    this.setState((prevState) => {
      return {
        profile: {...prevState.profile, birtday: date},
      };
    });
  };

  componentDidMount() {
    this._getAccountInfoStorage();
  }

  _handleSaveChangeProfile = () => {
    if (isEqual(this.state.profile, this.oldProfile)) {
      Alert.alert('Thông báo !', 'Không có sự thay đổi mới nào !.');
    }
  };

  render() {
    const {profile} = this.state;
    return profile ? (
      <View style={styles.container}>
        <View style={styles.content}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('./../../assets/images/photo-background.jpeg')}>
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={this._onGoBack}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('./../../assets/icons/arrow.png')}
                />
              </TouchableOpacity>
            </View>
            <LinearGradient style={{flex: 1}} colors={['transparent', 'gray']}>
              <View style={styles.wapperinfo}>
                <Image
                  style={styles.avatar}
                  source={require('./../../assets/icons/user-non-avatar.png')}
                />
                <Text style={styles.titleName}>{profile.name}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.wapperEdit}>
          <ScrollView contentContainerStyle={{paddingBottom: 30}}>
            {/* <FieldInfo
              title={'Họ tên:'}
              placeholder={'Nội dung ...'}
              value={profile.name}
            /> */}
            <FieldInfo
              title={'Email:'}
              placeholder={'Nội dung ...'}
              editable={false}
              value={profile.email}
            />
            <FieldInfo
              title={'Số điện thoại:'}
              placeholder={'Nội dung ...'}
              value={profile.phone}
              maxLength={20}
              keyboardType={'numeric'}
            />
            <FieldInfo
              title={'Ngày sinh:'}
              placeholder={'Nội dung ...'}
              datetime={true}
              value={convertDate(profile.birtday)}
              onOpenModalDate={() => this.modelDateTime.current.onOpenModal()}
            />
            <FieldInfo
              title={'Địa chỉ'}
              placeholder={'Nội dung ...'}
              value={profile.address}
            />
            <TouchableOpacity
              style={styles.btnSave}
              onPress={this._handleSaveChangeProfile}>
              <Text style={styles.titleSave}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <ModalDateTime
          ref={this.modelDateTime}
          date={new Date(profile.birtday)}
          mode={'date'}
          locale={'vi'}
          onDateChange={this._onDateChange}
        />
      </View>
    ) : null;
  }
}

export default ProfileScreen;
