/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {appScreens} from '../config-screen';
import {goToScreen} from '../MethodScreen';
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
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <Text>Chưa vẽ gì cả</Text> */}
          <TouchableOpacity
            onPress={() => {
              goToScreen(
                this.props.componentId,
                appScreens.ResultExamScreen.name,
              );
            }}>
            <Text>GO TO</Text>
          </TouchableOpacity>
        </View>
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
