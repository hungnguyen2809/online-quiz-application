import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import _ from 'lodash';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.areaOne}>
          <TouchableOpacity onPress={this.props.onPressButtonLeft}>
            <Image
              style={styles.icon}
              source={require('./../../assets/icons/arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.areaTwo}>
          <Text style={styles.textHeader}>{this.props.title}</Text>
        </View>
        <View style={styles.areaThree}>
          {this.props.onPressButtonRight
            ? _.map(this.props.onPressButtonRight, (item) => {
                return item;
              })
            : null}
        </View>
      </View>
    );
  }
}

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight() + 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  areaOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaTwo: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '600',
  },
  areaThree: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
