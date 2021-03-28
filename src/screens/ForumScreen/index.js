import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeadTopBar from './../../components/HeadTopBar';

class ForumScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Hỏi đáp',
        icon: require('./../../assets/icons/ic-star_half_empty.png'),
      },
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
      },
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        <Text>Chưa vẽ gì cả</Text>
      </View>
    );
  }
}

export default ForumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
