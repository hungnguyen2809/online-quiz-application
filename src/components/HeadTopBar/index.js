/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import _ from 'lodash';

class HeadTopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, subComponentButtonLeft} = this.props;
    return (
      <View style={[styles.wrapHeader, {paddingTop: getStatusBarHeight()}]}>
        <View style={styles.container}>
          {subComponentButtonLeft
            ? _.map(subComponentButtonLeft, (item) => {
                return item;
              })
            : null}
          <Image
            style={[styles.logo, {marginLeft: subComponentButtonLeft ? 22 : 0}]}
            source={require('./../../assets/images/logo.png')}
          />
          <Text style={styles.title}>{title ? title : 'Online Quiz'}</Text>
        </View>
      </View>
    );
  }
}

{
  /* <TouchableOpacity
  style={{marginRight: 22}}
  onPress={this.props.onPressButtonLeft}>
  <Image
    style={styles.iconsMenu}
    source={require('./../../assets/icons/menu.png')}
  />
</TouchableOpacity>; */
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
    width: 40,
    height: 40,
    borderRadius: 6,
    marginBottom: 5,
    borderColor: '#eee',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d35400',
    marginLeft: 20,
  },
});
