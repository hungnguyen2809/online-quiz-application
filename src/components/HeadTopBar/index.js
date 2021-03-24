import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

class HeadTopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.wrapHeader, {paddingTop: getStatusBarHeight()}]}>
        <View style={styles.container}>
          {this.props.onPressButtonLeft ? (
            <TouchableOpacity
              style={{marginRight: 22}}
              onPress={this.props.onPressButtonLeft}>
              <Image
                style={styles.iconsMenu}
                source={require('./../../assets/icons/menu.png')}
              />
            </TouchableOpacity>
          ) : null}
          <Image
            style={styles.logo}
            source={require('./../../assets/icons/question_mark.png')}
          />
          <Text style={styles.title}>Online Quiz</Text>
        </View>
      </View>
    );
  }
}

export default HeadTopBar;

const styles = StyleSheet.create({
  wrapHeader: {
    backgroundColor: '#18dcff',
  },
  container: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsMenu: {
    height: 26,
    width: 26,
  },
  logo: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d35400',
    marginLeft: 25,
  },
});
