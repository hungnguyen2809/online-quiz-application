import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class HeadTopbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default HeadTopbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
