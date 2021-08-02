/* eslint-disable react-native/no-inline-styles */
import {debounce, get, trim} from 'lodash';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../common/Colors';
import {SCREEN_WIDTH} from '../../common/dimensionScreen';
import {getTimeFromNow} from '../../common/format';
import {getAccountSelector} from '../../redux/Account/selectors';
import {updatePostCommentAction} from '../../redux/Post/actions';

PostItemComment.propTypes = {
  row: PropTypes.object,
  onRemoveItem: PropTypes.func,
};

function PostItemComment(props) {
  const {row, onRemoveItem} = props;
  const dispatch = useDispatch();
  const account = useSelector(getAccountSelector());

  const [loadingAvt, setLoadingAvt] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  const [editCmt, setEditCmt] = useState(false);
  const [textCommnet, setTextComment] = useState('');
  const [laodingUpdate, setLoadingUpdate] = useState(false);

  React.useEffect(() => {
    setTextComment(get(row, 'comment', ''));
  }, [row]);

  const onRecallComment = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn thu hồi câu trả lời ?', [
      {
        style: 'default',
        text: 'Đồng ý',
        onPress: () => {
          const payload = {
            id_post_cmt: get(row, 'id_cmt'),
            comment: 'nội dung bất kỳ',
            image: '',
            status: 0, //1 là cập nhật, 0 là xóa
          };
          dispatch(
            updatePostCommentAction(payload, {
              callbackOnSuccess: () => {
                onRemoveItem && onRemoveItem(row);
              },
              callbackOnFail: () => {},
            }),
          );
        },
      },
      {
        style: 'destructive',
        text: 'Hủy bỏ',
        onPress: () => {},
      },
    ]);
  };

  const onEditComment = () => {
    setEditCmt(!editCmt);
  };

  const onChangeTextEditCmt = (text) => {
    setTextComment(text);
  };

  const onCancelRecallComment = () => {
    onEditComment();
    setTextComment(get(row, 'comment', ''));
  };

  const onSaveNewComment = () => {
    if (!trim(textCommnet)) {
      Alert.alert('Thông báo', 'Bạn chưa nhập nội dung');
      return;
    }
    const payload = {
      id_post_cmt: get(row, 'id_cmt'),
      comment: trim(textCommnet),
      image: get(row, 'image') || '',
      status: 1, //1 là cập nhật, 0 là xóa
    };
    setLoadingUpdate(true);
    dispatch(
      updatePostCommentAction(payload, {
        callbackOnSuccess: () => {
          setLoadingUpdate(false);
          setEditCmt(false);
        },
        callbackOnFail: () => {
          setLoadingUpdate(false);
        },
      }),
    );
  };

  return (
    <View>
      <View style={styles.wrapHeader}>
        {get(row, 'avatar', null) ? (
          <View>
            <Image
              style={styles.avatar}
              source={{uri: get(row, 'avatar')}}
              onLoadStart={() => setLoadingAvt(true)}
              onLoad={() => setLoadingAvt(false)}
            />
            {loadingAvt ? (
              <ActivityIndicator color={'red'} style={styles.loadingAvt} />
            ) : null}
          </View>
        ) : (
          <Image
            style={styles.avatar}
            source={require('./../../assets/icons/avatar/5.jpg')}
          />
        )}
        <View style={{marginLeft: 10, flex: 1}}>
          <Text
            allowFontScaling={false}
            style={styles.textName}
            numberOfLines={1}>
            {get(row, 'name', '')}
          </Text>
          <Text allowFontScaling={false} style={styles.textTime}>
            {getTimeFromNow(get(row, 'date_create', ''))}
          </Text>
        </View>
        {get(account, 'id', -1) === get(row, 'id_user_cmt', -2) ? (
          <Menu key={'pop-menu-edit'}>
            <MenuTrigger>
              <MateriaIcon name={'more-vert'} size={20} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={debounce(onEditComment, 200)}>
                <Text>Chỉnh sửa</Text>
              </MenuOption>
              <View style={styles.dividerMemu} />
              <MenuOption onSelect={debounce(onRecallComment, 200)}>
                <Text>Thu hồi</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        ) : null}
      </View>
      <View
        style={{
          marginLeft: 30,
          borderBottomColor: '#dcdcdc',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        {editCmt ? (
          <View style={styles.wrapEditCmt}>
            <TextInput
              style={styles.textInputEdit}
              value={textCommnet}
              onChangeText={onChangeTextEditCmt}
              multiline={true}
              maxLength={150}
              editable={!laodingUpdate}
            />
            {laodingUpdate ? (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginRight: 10,
                }}>
                <ActivityIndicator size={'small'} color={Colors.LEVEL_E} />
              </View>
            ) : (
              <View style={styles.wrapBtnEdit}>
                <TouchableOpacity
                  style={[{backgroundColor: Colors.AMOUR}, styles.btnEdit]}
                  onPress={debounce(onCancelRecallComment, 200)}>
                  <Text style={{color: 'white'}}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {backgroundColor: Colors.CLEAR_CHILL},
                    styles.btnEdit,
                  ]}
                  onPress={debounce(onSaveNewComment, 200)}>
                  <Text style={{color: 'white'}}>Lưu</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <Text style={{lineHeight: 24}}>{textCommnet || ''}</Text>
        )}
        {get(row, 'image', null) ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignSelf: 'flex-start'}}
              onPress={() => setShowImageView(true)}>
              <Image
                style={styles.imageCommnet}
                source={{uri: get(row, 'image')}}
                onLoadStart={() => setLoadingImage(true)}
                onLoad={() => setLoadingImage(false)}
              />
            </TouchableOpacity>
            {loadingImage ? (
              <ActivityIndicator color={'red'} style={styles.loadingImage} />
            ) : null}
          </View>
        ) : null}
      </View>
      {get(row, 'image', null) ? (
        <ImageView
          images={[{uri: get(row, 'image')}]}
          visible={showImageView}
          imageIndex={0}
          onRequestClose={() => setShowImageView(false)}
        />
      ) : null}
    </View>
  );
}

export default PostItemComment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 7,
    marginBottom: 10,
  },
  wrapHeader: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.CLEAR_CHILL,
  },
  loadingAvt: {position: 'absolute', top: 10, left: 10},
  textTime: {fontSize: 13},
  textName: {lineHeight: 20, fontSize: 15},
  wrapContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  textContent: {
    fontSize: 15,
    lineHeight: 24,
  },
  textMore: {
    color: Colors.CLEAR_CHILL,
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
  },
  imageCommnet: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    marginTop: 5,
    backgroundColor: '#a4b0be',
    borderRadius: 5,
  },
  loadingImage: {
    position: 'absolute',
    top: SCREEN_WIDTH / 4 - 5,
    left: SCREEN_WIDTH / 4 - 10,
  },
  dividerMemu: {height: 1, width: '100%', backgroundColor: Colors.PEACE},
  textInputEdit: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.PEACE,
    textAlignVertical: 'top',
    borderRadius: 5,
    marginBottom: 10,
    maxHeight: 70,
    minHeight: 50,
  },
  wrapBtnEdit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnEdit: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});
