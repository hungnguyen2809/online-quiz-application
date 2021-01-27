import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TimeClock from './TimeClock';

const isIOS = Platform.OS === 'ios';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.time}>
          <Image
            style={styles.iconClock}
            source={require('./../../../assets/icons/clock.png')}
          />
          <TimeClock onFinishTime={this.props.onFinishTime} />
        </View>
        <TouchableOpacity onPress={this.props.onPressFinish}>
          <Text style={styles.textBtnFinish}>Nộp bài</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: isIOS ? 45 : 5,
    backgroundColor: '#1e90ff',
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconClock: {
    height: 35,
    width: 35,
    tintColor: '#fff',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBtnFinish: {
    fontSize: 17,
    color: '#f1f2f6',
    fontWeight: '700',
  },
});
