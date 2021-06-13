/* eslint-disable react-native/no-inline-styles */
import {get, isEmpty, trim} from 'lodash';
import debounce from 'lodash.debounce';
import React, {Component} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Spinner from 'react-native-loading-spinner-overlay';
import {Navigation} from 'react-native-navigation';
import uuid from 'react-native-uuid';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeUploadImage} from '../../api/createApiService';
import {onToastAlert} from '../../common/validate';
import HeaderBar from '../../components/HeaderBar';
import {createNewPostAction} from '../../redux/Post/actions';
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
        style: 'dark',
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      fileSource: null,
      textDes: '',
      loading: false,
    };
  }

  componentDidMount() {}

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

  _onSubmitCreatePost = async () => {
    const textDes = trim(this.state.textDes);
    if (isEmpty(textDes)) {
      onToastAlert('Bạn chưa nhập nội dung bài viết');
    }
    this.setState({loading: true});

    try {
      let resImage = null;
      if (this.state.fileSource) {
        const imageResize = await ImageResizer.createResizedImage(
          this.state.fileSource.uri,
          this.state.fileSource.width / 3 > 600
            ? this.state.fileSource.width / 3
            : this.state.fileSource.width,
          this.state.fileSource.height / 3 > 600
            ? this.state.fileSource.height / 3
            : this.state.fileSource.height,
          'JPEG',
          95,
          0,
          undefined,
          false,
          {mode: 'contain', onlyScaleDown: false},
        );
        const imageUpload = {
          name: uuid.v4(),
          height: imageResize.height,
          width: imageResize.width,
          size: imageResize.size,
          type: 'image/jpeg',
          uri:
            Platform.OS === 'ios'
              ? imageResize.uri.replace('file://', '')
              : imageResize.uri,
        };
        resImage = await makeUploadImage(imageUpload);
      }

      const payload = {
        id_user: get(this.props.account, 'id', null),
        content: textDes,
        image: resImage ? resImage.secure_url : null,
      };

      this.props.doCreateNewPost(payload, {
        callbackOnSuccess: () => {
          this.props.onRefreshPost && this.props.onRefreshPost();
          this.setState({loading: false, textDes: ''});
          this._goBackScreen();
        },
        callbackOnFail: () => {
          this.setState({loading: false});
        },
      });
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi', error.message);
      this.setState({loading: false});
    }
  };

  _renderSubButtonright = () => {
    return (
      <TouchableOpacity
        key={'btn_send'}
        onPress={debounce(this._onSubmitCreatePost, 300)}>
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
          title={'Tạo bài viết'}
        />
        <View style={styles.wrapInputDes}>
          <TextInput
            value={this.state.textDes}
            multiline={true}
            style={styles.textInput}
            placeholder={'Nhập nội dung'}
            returnKeyType={'done'}
            onChangeText={(text) => {
              this.setState({textDes: text});
            }}
            maxLength={1000}
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
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => {
  return {
    doCreateNewPost: (payload, callbacks) => {
      dispatch(createNewPostAction(payload, callbacks));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateScreen);
