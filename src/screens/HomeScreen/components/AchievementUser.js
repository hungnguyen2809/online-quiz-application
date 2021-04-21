import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class AchievementUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const percent = Math.floor(this.props.process * 100);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.name}: {percent}%
        </Text>
        <View style={styles.wapperProcess}>
          <View style={[styles.process, {width: `${percent}%`}]} />
        </View>
      </View>
    );
  }
}

export default AchievementUser;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    margin: 5,
  },
  wapperProcess: {
    height: 6,
    backgroundColor: '#ced6e0',
    borderRadius: 4,
  },
  process: {
    height: 6,
    backgroundColor: '#2ed573',
    borderRadius: 4,
  },
});
