/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Navigation} from 'react-native-navigation';
import HeaderBar from '../../components/HeaderBar';
import {styles} from './styles';

class PostCreateScreen extends Component {
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
      fileSource: null,
      textDes: '',
    };
  }

  _goBackScreen = () => {
    Navigation.pop(this.props.componentId);
  };

  onChooseImage = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        (response) => {
          if (response.didCancel) {
            return;
          }
          this.setState({fileSource: response});
        },
      );
    } catch (error) {
      Alert.alert('Thông báo !', 'Lỗi không thể chọn ảnh. Vui lòng thử lại !');
    }
  };

  _renderSubButtonright = () => {
    return (
      <TouchableOpacity key={'btn_send'}>
        <Image
          style={{width: 30, height: 30}}
          source={require('./../../assets/icons/icons-sent.png')}
        />
      </TouchableOpacity>
    );
  };

  render() {
    let subButtonRight = [];
    subButtonRight.push(this._renderSubButtonright());

    return (
      <View style={styles.container}>
        <HeaderBar
          onPressButtonLeft={this._goBackScreen}
          onPressButtonRight={subButtonRight}
          title={'Tạo câu hỏi'}
        />
        <View style={styles.wrapInputDes}>
          <TextInput
            multiline={true}
            style={styles.textInput}
            placeholder={'Nhập nội dung'}
            returnKeyType={'done'}
            onChangeText={(text) => {
              this.setState({textDes: text});
            }}
            maxLength={200}
          />
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={this.onChooseImage}
              style={styles.btnChooseImage}>
              <Text>Chọn ảnh</Text>
              <Image
                style={{width: 20, height: 20, marginLeft: 5}}
                source={require('./../../assets/icons/icons-camera.png')}
              />
            </TouchableOpacity>
            {this.state.fileSource ? (
              <View style={{marginLeft: 10, marginTop: 10}}>
                <Image
                  style={{width: 100, height: 100}}
                  source={{uri: this.state.fileSource.uri}}
                />
                <TouchableOpacity
                  style={styles.btnTrashImage}
                  onPress={() => this.setState({fileSource: null})}>
                  <Image
                    style={{width: 20, height: 20, tintColor: '#fff'}}
                    source={require('./../../assets/icons/icons-delete_trash.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

export default PostCreateScreen;
