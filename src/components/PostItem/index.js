/* eslint-disable react-native/no-inline-styles */
import {get, size} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../common/Colors';
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import {getTimeFromNow} from '../../common/format';

PostItem.propTypes = {
  row: PropTypes.object.isRequired,
  account: PropTypes.object,
  onDetailPost: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  row: {},
  account: {},
  onDetailPost: () => {},
};

function PostItem(props) {
  const {row, onDetailPost, account} = props;
  const [loadingAvt, setLoadingAvt] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleNavigatePost = () => {
    onDetailPost && onDetailPost(row);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapHeader}>
        {get(row, 'avatar') ? (
          <>
            <Image
              style={styles.avatar}
              source={{uri: get(row, 'avatar')}}
              onLoadStart={() => setLoadingAvt(true)}
              onLoad={() => setLoadingAvt(false)}
            />
            {loadingAvt ? (
              <ActivityIndicator color={'red'} style={styles.loadingAvt} />
            ) : null}
          </>
        ) : (
          <Image
            style={styles.avatar}
            source={require('./../../assets/icons/avatar/5.jpg')}
          />
        )}
        <View
          style={{
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{width: '100%'}}>
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
        </View>
        {get(account, 'id', -1) === get(row, 'id_user', -2) ? (
          <TouchableOpacity>
            <MateriaIcon name={'more-vert'} size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.wrapContent}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleNavigatePost}>
          <Text
            style={styles.textContent}
            allowFontScaling={false}
            numberOfLines={5}>
            {get(row, 'content', '')}
          </Text>
          {size(get(row, 'content_qes', '')) > 230 ? (
            <Text style={styles.textMore}>Xem thêm</Text>
          ) : null}
        </TouchableOpacity>
        {get(row, 'image', null) ? (
          <View>
            <Image
              style={styles.imagePost}
              source={{uri: get(row, 'image')}}
              onLoadStart={() => setLoadingImage(true)}
              onLoad={() => setLoadingImage(false)}
            />
            {loadingImage ? (
              <ActivityIndicator
                color={'red'}
                style={styles.loadingImagePost}
              />
            ) : null}
          </View>
        ) : null}
        <View style={styles.divider} />
        <TouchableOpacity activeOpacity={0.8} onPress={handleNavigatePost}>
          <Text>1 câu trả lời</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  loadingAvt: {position: 'absolute', top: 13, left: 13},
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
  imagePost: {
    width: 150,
    height: 150,
    marginTop: 5,
    backgroundColor: '#a4b0be',
  },
  loadingImagePost: {
    position: 'absolute',
    top: 150 / 2,
    left: 150 / 2 - 10,
  },
});
