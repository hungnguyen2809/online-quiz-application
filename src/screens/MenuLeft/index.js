/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenNavigate} from './../config-screen';

const isIOS = Platform.OS === 'ios';

const ButtonMenu = (props) => {
  const {actived, title, onPress, available} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wapperButton, {borderLeftWidth: actived ? 5 : 0}]}>
      <Text style={styles.textButton}>{title}</Text>
      {available && (
        <Ionicons name={'cloud-download-outline'} size={20} color={'#20bf6b'} />
      )}
    </TouchableOpacity>
  );
};

class MenuLeftScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageHome: true,
      pageMath: false,
      pageEnglish: false,
    };

    this.pages = {
      home: {
        id: 1,
        name: 'Trang chủ',
      },
      math: {
        id: 2,
        name: 'Toán học',
      },
      english: {
        id: 3,
        name: 'Tiếng anh',
      },
    };
  }

  _onGoToPage = (pageId) => {
    if (pageId === this.pages.home.id) {
      this.setState({
        pageHome: true,
        pageMath: false,
        pageEnglish: false,
      });
    } else if (pageId === this.pages.math.id) {
      this.setState({
        pageHome: false,
        pageMath: true,
        pageEnglish: false,
      });
    } else if (pageId === this.pages.english.id) {
      this.setState({
        pageHome: false,
        pageMath: false,
        pageEnglish: true,
      });
    }
  };

  onSignOut = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn đăng xuất ?', [
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: () => {
          Navigation.setRoot(screenNavigate);
        },
      },
      {
        text: 'Không',
        style: 'cancel',
        onPress: () => null,
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              style={styles.avatar}
              source={require('./../../assets/icons/user-non-avatar.png')}
            />
            <TouchableOpacity>
              <Ionicons name={'settings'} size={25} />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameUser}>Nguyễn Văn Hùng</Text>
        </View>
        <View style={styles.actions}>
          <ButtonMenu
            title={this.pages.home.name}
            actived={this.state.pageHome}
            onPress={() => {
              this._onGoToPage(this.pages.home.id);
            }}
          />
          <View style={{height: 20}} />
          <ButtonMenu
            title={this.pages.math.name}
            actived={this.state.pageMath}
            available={true}
            onPress={() => {
              this._onGoToPage(this.pages.math.id);
            }}
          />
          <ButtonMenu
            title={this.pages.english.name}
            actived={this.state.pageEnglish}
            available={true}
            onPress={() => {
              this._onGoToPage(this.pages.english.id);
            }}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.onSignOut}>
            <Text style={styles.textSignout}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MenuLeftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#dff9fb',
    paddingTop: isIOS ? 45 : 10,
    paddingBottom: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#45aaf2',
  },
  nameUser: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actions: {
    backgroundColor: '#fff',
    flex: 8,
    padding: 10,
  },
  wapperButton: {
    padding: 10,
    borderBottomColor: '#fa8231',
    borderBottomWidth: 2,
    borderLeftColor: '#26de81',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textButton: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: '#dcdcdc',
    borderTopWidth: 2,
    marginBottom: isIOS ? 30 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignout: {
    fontSize: 20,
    padding: 8,
    color: '#eb3b5a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
