/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import HeadTopBar from './../../components/HeadTopBar';
import {backToLastScreen} from './../MethodScreen';
import {styles} from './styles';
import ItemQuestion from './components/ItemQuestion';
import {SCREEN_WIDTH} from './../../common/dimensionScreen';
import {goToScreenWithPassProps} from './../MethodScreen';
import {appScreens} from './../config-screen';
import debounce from 'lodash.debounce';

class ChooseQuestionScreen extends Component {
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

    this.state = {
      dataSource: [1, 2, 3],
    };

    this.layoutProvider = new LayoutProvider(
      (index) => {
        return 'LAYOUT';
      },
      (type, dim, index) => {
        switch (type) {
          case 'LAYOUT':
            dim.width = SCREEN_WIDTH;
            dim.height = 100;
            break;
          default:
            dim.width = SCREEN_WIDTH;
            dim.height = 0;
            break;
        }
      },
    );
  }

  onStartExample = (data) => {
    goToScreenWithPassProps(
      this.props.parentComponentId,
      appScreens.ExamQuestions.name,
      {
        dataPass: data,
        parentComponentId: this.props.parentComponentId,
      },
    );
  };

  _layoutProvider = () => {
    return this.layoutProvider;
  };

  _dataProviderFacetory = () => {
    const dataProvier = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(this.state.dataSource);

    return dataProvier;
  };

  _renderRendererItem = (type, item) => {
    switch (type) {
      case 'LAYOUT':
        return (
          <ItemQuestion
            islocal={true}
            onPresStart={debounce(() => this.onStartExample(item), 300)}
          />
        );
      default:
        return null;
    }
  };

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
    const dataProvider = this._dataProviderFacetory();
    const layoutProvider = this._layoutProvider();

    return (
      <View style={styles.container}>
        <HeadTopBar subComponentButtonLeft={subComponentButtonLeft} />
        <View style={{flex: 1}}>
          <RecyclerListView
            canChangeSize={true}
            forceNonDeterministicRendering={true}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={this._renderRendererItem}
          />
        </View>
      </View>
    );
  }
}

export default ChooseQuestionScreen;
