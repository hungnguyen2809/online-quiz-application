import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {styles} from './styles';
import HeaderBar from './components/HeaderBar';
import ItemEdit from './components/ItemEdit';
import ModalDate from './../../components/ModalDateTime';

class ProfileDetailsScreen extends Component {
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
      },
    };
  }

  constructor(props) {
    super(props);
    this.eventKeybroadShow = null;
    this.eventKeybroadHide = null;
    this.refModalDate = React.createRef();

    this.state = {
      keyboardShow: false,
      showModalDate: false,
    };
  }

  _goBackScreen = () => {
    Navigation.pop(this.props.componentId);
  };

  _registerEventKeyboard = () => {
    this.eventKeybroadShow = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboardShow: true});
    });
    this.eventKeybroadHide = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboardShow: false});
    });
  };

  _onDismissKeybroad = () => {
    if (this.state.keyboardShow) {
      Keyboard.dismiss();
    }
  };

  componentDidMount() {
    this._registerEventKeyboard();
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar
          onPressButtonLeft={this._goBackScreen}
          title={'Cập nhật thông tin'}
        />
        <TouchableWithoutFeedback onPress={this._onDismissKeybroad}>
          <View style={styles.content}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={styles.avatar}
                source={require('./../../assets/icons/avatar/5.jpg')}
              />
            </View>
            <View style={styles.wrapItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <ItemEdit iconName={'person'} placeholder={'Họ tên'} />
                <ItemEdit
                  iconName={'smartphone'}
                  placeholder={'Điện thoại'}
                  keyboardType={'phone-pad'}
                />
                <ItemEdit
                  modedate
                  iconName={'date-range'}
                  placeholder={'Ngày sinh'}
                  value={''}
                  onPressDate={() => this.refModalDate.current.onOpenModal()}
                />
                <ItemEdit iconName={'location-on'} placeholder={'Địa chỉ'} />
              </ScrollView>
            </View>
            {!this.state.keyboardShow ? (
              <View style={styles.footer}>
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.textSubmit}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <ModalDate
          ref={this.refModalDate}
          date={new Date()}
          mode={'date'}
          locale={'vi'}
          onDateChange={(newDate) => console.log(newDate)}
        />
      </View>
    );
  }

  componentWillUnmount() {
    this.eventKeybroadShow && this.eventKeybroadShow.remove();
    this.eventKeybroadHide && this.eventKeybroadHide.remove();
  }
}

export default ProfileDetailsScreen;
