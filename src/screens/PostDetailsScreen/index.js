/* eslint-disable react-native/no-inline-styles */
import {get} from 'lodash';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import PostItemComment from '../../components/PostItemComment';
import {backToLastScreen} from '../MethodScreen';
import {styles} from './styles';

class PostDetailsScreen extends Component {
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
      loadingAvt: false,
      showKeybroad: false,
      heightKeybroad: 0,
      textComment: '',
      fileSource: null,
    };

    this.keyBroadHide = null;
    this.keyBroadShow = null;
  }

  componentDidMount() {
    this.onRegisterEventKeybroad();
  }

  componentWillUnmount() {
    this.keyBroadHide && this.keyBroadHide.remove();
    this.keyBroadShow && this.keyBroadShow.remove();
  }

  onRegisterEventKeybroad = () => {
    this.keyBroadShow = Keyboard.addListener('keyboardDidShow', (ev) => {
      this.setState({
        showKeybroad: true,
        heightKeybroad: ev.endCoordinates.height - 10,
      });
    });
    this.keyBroadHide = Keyboard.addListener('keyboardDidHide', (ev) => {
      this.setState({showKeybroad: false, heightKeybroad: 0});
    });
  };

  onBackScreen = () => {
    backToLastScreen(this.props.componentId);
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

  onSubmitSendComment = () => {};

  render() {
    const {row} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <TouchableOpacity onPress={this.onBackScreen} style={styles.btnBack}>
            <Image
              style={{width: 25, height: 25}}
              source={require('./../../assets/icons/arrow.png')}
            />
          </TouchableOpacity>
          {get(row, 'image') ? (
            <>
              <Image
                style={styles.avatar}
                source={{uri: get(row, 'image')}}
                onLoadStart={() => this.setState({loadingAvt: true})}
                onLoad={() => this.setState({loadingAvt: false})}
              />
              {this.state.loadingAvt ? (
                <ActivityIndicator color={'red'} style={styles.loadingAvt} />
              ) : null}
            </>
          ) : (
            <Image
              style={styles.avatar}
              source={require('./../../assets/icons/avatar/5.jpg')}
            />
          )}
          <View style={{marginLeft: 10}}>
            <Text
              allowFontScaling={false}
              style={styles.textName}
              numberOfLines={1}>
              Nguyễn Văn Hùng
            </Text>
            <Text allowFontScaling={false} style={styles.textTime}>
              1 giờ
            </Text>
          </View>
        </View>
        <View style={styles.wrapContent}>
          <FlatList
            ListHeaderComponent={
              <>
                <Text style={styles.textContent}>
                  Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van
                  Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen
                  Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung
                  Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van
                  Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen
                  Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung
                  Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van
                  Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung
                </Text>
                <View style={styles.divider} />
                <Text>Trả lời:</Text>
              </>
            }
            data={[1, 2, 3, 4, 5, 6, 7, 9]}
            renderItem={() => <PostItemComment />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.state.fileSource ? (
          <View style={{marginLeft: 10}}>
            <Image
              style={{width: 80, height: 80}}
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
        <View
          style={[
            styles.wrapFooter,
            {
              marginBottom: Platform.select({
                ios: this.state.showKeybroad ? this.state.heightKeybroad : 0,
                android: 5,
              }),
            },
          ]}>
          <TextInput
            multiline={true}
            style={styles.textInput}
            placeholder={'Nhập nội dung'}
            onChangeText={(text) => this.setState({textComment: text})}
            returnKeyType={'done'}
          />
          <View style={styles.wrapBtnFooter}>
            <TouchableOpacity onPress={this.onChooseImage}>
              <Image
                style={{width: 23, height: 23}}
                source={require('./../../assets/icons/icons-camera.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSubmitSendComment}>
              <Image
                style={{width: 30, height: 30}}
                source={require('./../../assets/icons/icons-sent.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default PostDetailsScreen;
