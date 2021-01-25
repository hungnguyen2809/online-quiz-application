import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

class MenuLeftScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text> textInComponent </Text>
      </SafeAreaView>
    );
  }
}

export default MenuLeftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
