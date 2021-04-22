/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import HeadTopBar from '../../components/HeadTopBar';
import {backToLastScreen} from '../MethodScreen';

class ResultExamScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTabs: {
        visible: false,
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

  onGoBackScreen = () => {
    backToLastScreen(this.props.componentId);
  };

  _renderSubComponentButtonLeft = () => {
    return (
      <TouchableOpacity key={'btn'} onPress={this.onGoBackScreen}>
        <Image
          style={{width: 25, height: 25}}
          source={require('./../../assets/icons/icons-left.png')}
        />
      </TouchableOpacity>
    );
  };

  render() {
    let subComponentButtonLeft = [];
    subComponentButtonLeft.push(this._renderSubComponentButtonLeft());

    return (
      <View style={styles.container}>
        <HeadTopBar subComponentButtonLeft={subComponentButtonLeft} />
        <View style={{flex: 1}}>
          <Text> textInComponent </Text>
        </View>
      </View>
    );
  }
}

export default ResultExamScreen;
