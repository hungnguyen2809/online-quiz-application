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

PostItem.propTypes = {
  row: PropTypes.object.isRequired,
  onDetailPost: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  row: {},
  onDetailPost: () => {},
};

function PostItem(props) {
  const {row, onDetailPost} = props;
  const [loadingAvt, setLoadingAvt] = useState(false);

  const handleNavigatePost = () => {
    onDetailPost && onDetailPost(row);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapHeader}>
        {get(row, 'image') ? (
          <>
            <Image
              style={styles.avatar}
              source={{uri: get(row, 'image')}}
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
        <TouchableOpacity activeOpacity={0.8} onPress={handleNavigatePost}>
          <Text
            style={styles.textContent}
            allowFontScaling={false}
            numberOfLines={5}>
            Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung
            Nguyen Van Hung Nguyen Van Hung Nguyen Van Nguyen Van Hung Nguyen
            Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van Hung Nguyen Van
            Hung Nguyen Van Hung Nguyen Van Hung
          </Text>
          {size(get(row, 'content_qes', '')) > 230 ? (
            <Text style={styles.textMore}>Xem thêm</Text>
          ) : null}
          <View style={styles.divider} />
          <Text>1 câu trả lời</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostItem;

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
});
