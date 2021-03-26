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
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAccountSelector} from '../../redux/Account/selectors';
import {debounce, get, isEmpty, trim} from 'lodash';
import moment from 'moment';

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
    this.refInputName = React.createRef();

    this.state = {
      keyboardShow: false,
      showModalDate: false,
      account: {},
      accountUpdating: {},
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
    if (get(this.props.account, 'size') !== 0) {
      const {account} = this.props;
      this.setState({account, accountUpdating: account});
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const {account} = nextProps;
      if (this.props.account !== nextProps.account) {
        this.setState({account, accountUpdating: account});
      }
    }
  }

  onChangeName = (value, item) => {
    const dataUpdate = {
      ...item,
      name: value,
    };
    this.setState({accountUpdating: dataUpdate});
  };

  onChangePhone = (value, item) => {
    const dataUpdate = {
      ...item,
      phone: value,
    };
    this.setState({accountUpdating: dataUpdate});
  };

  onChangeAddress = (value, item) => {
    const dataUpdate = {
      ...item,
      address: value,
    };
    this.setState({accountUpdating: dataUpdate});
  };

  onChangeBirthDay = (date, item) => {
    const dataUpdate = {
      ...item,
      birtday: date,
    };
    this.setState({accountUpdating: dataUpdate});
  };

  onCancelUpdate = () => {
    this.setState({accountUpdating: this.state.account});
  };

  render() {
    const {accountUpdating} = this.state;

    return (
      <View style={styles.container}>
        <HeaderBar
          onPressButtonLeft={this._goBackScreen}
          title={'Cập nhật thông tin'}
        />
        <TouchableWithoutFeedback onPress={this._onDismissKeybroad}>
          <View style={styles.content}>
            <View style={{alignItems: 'center'}}>
              {get(accountUpdating, 'image') ? (
                <Image
                  style={styles.avatar}
                  source={{uri: get(accountUpdating, 'image')}}
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={require('./../../assets/icons/avatar/5.jpg')}
                />
              )}
            </View>
            <View style={styles.wrapItem}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <ItemEdit
                  ref={this.refInputName}
                  iconName={'person'}
                  placeholder={'Họ tên'}
                  value={get(accountUpdating, 'name', '')}
                  onChangeText={(text) =>
                    this.onChangeName(text, accountUpdating)
                  }
                />
                <ItemEdit
                  iconName={'smartphone'}
                  placeholder={'Điện thoại'}
                  keyboardType={'phone-pad'}
                  value={get(accountUpdating, 'phone', '')}
                  onChangeText={(text) =>
                    this.onChangePhone(text, accountUpdating)
                  }
                />
                <ItemEdit
                  modedate={true}
                  iconName={'date-range'}
                  placeholder={'Ngày sinh'}
                  value={get(accountUpdating, 'birtday', null)}
                  onPressDate={() => this.refModalDate.current.onOpenModal()}
                />
                <ItemEdit
                  iconName={'location-on'}
                  placeholder={'Địa chỉ'}
                  value={get(accountUpdating, 'address', '')}
                  onChangeText={(text) =>
                    this.onChangeAddress(text, accountUpdating)
                  }
                />
              </ScrollView>
            </View>
            {!this.state.keyboardShow ? (
              <View style={styles.footer}>
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.textSubmit}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={debounce(this.onCancelUpdate, 200)}>
                  <Text style={styles.textSubmit}>Hủy bỏ</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <ModalDate
          ref={this.refModalDate}
          date={
            accountUpdating.birtday !== null
              ? new Date(moment(get(accountUpdating, 'birtday')))
              : new Date()
          }
          mode={'date'}
          locale={'vi'}
          onDateChange={(newDate) =>
            this.onChangeBirthDay(newDate, accountUpdating)
          }
        />
      </View>
    );
  }

  componentWillUnmount() {
    this.eventKeybroadShow && this.eventKeybroadShow.remove();
    this.eventKeybroadHide && this.eventKeybroadHide.remove();
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailsScreen);
