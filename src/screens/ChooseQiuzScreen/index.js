/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeadTopBar from '../../components/HeadTopBar';
import {openMenuLeft, goToScreen} from './../MethodScreen';
import {appScreens} from './../config-screen';
import {SCREEN_WIDTH} from './../../common/dimensionScreen';

class ChooseQiuzScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Làm bài',
        icon: require('./../../assets/icons/ic-edit_property.png'),
      },
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent'
      }
    }
  }

  constructor(props) {
    super(props);
  }

  _handleOpenMemu = () => {
    openMenuLeft(this.props.componentId);
  };

  _startExam = () => {
    goToScreen(this.props.componentId, appScreens.ExamQuestions);
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={this._startExam}>
        <View style={styles.itemExam}>
          <Text style={styles.titleExam}>Đề số: {index + 1}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar onPressMenu={this._handleOpenMemu} />
        <FlatList
          style={{margin: 10}}
          data={[1, 2, 3]}
          renderItem={this.renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default ChooseQiuzScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemExam: {
    width: SCREEN_WIDTH / 2 - 30,
    height: 100,
    margin: 10,
    backgroundColor: '#dfe4ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#dcdcdc',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    elevation: 5,
  },
  titleExam: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
