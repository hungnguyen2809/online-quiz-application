/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeadTopBar from '../../components/HeadTopBar';
import {goToScreenWithPassProps} from './../MethodScreen';
import {appScreens} from './../config-screen';
import field from './fieldOfImplementation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from './../../common/Colors';

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
        backgroundColor: 'transparent',
      },
    };
  }

  constructor(props) {
    super(props);
  }

  _startExam = (data) => {
    goToScreenWithPassProps(
      this.props.componentId,
      appScreens.ChooseQuestionScreen.name,
      {
        dataPass: data,
        parentComponentId: this.props.componentId,
      },
    );
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this._startExam(item)}>
        <View style={styles.itemExam}>
          <Image style={styles.imageLabel} source={{uri: item.image}} />
          <View style={styles.wrapLabel}>
            <Text style={styles.titleExam}>{item.label}</Text>
          </View>
          <MaterialIcons
            name={'chevron-right'}
            size={30}
            color={Colors.PEACE}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        <FlatList
          style={{margin: 10}}
          data={field}
          renderItem={this.renderItem}
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    margin: 10,
    backgroundColor: '#dfe4ea',
    borderRadius: 5,
    shadowColor: '#dcdcdc',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    elevation: 5,
  },
  wrapLabel: {
    flex: 1,
    justifyContent: 'center',
  },
  titleExam: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  imageLabel: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});
