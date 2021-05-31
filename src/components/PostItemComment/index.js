/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../common/Colors';
import {get} from 'lodash';
import {useState} from 'react';

PostItemComment.propTypes = {
  row: PropTypes.object,
};

function PostItemComment(props) {
  const {row} = props;
  const [loadingAvt, setLoadingAvt] = useState(false);

  return (
    <View>
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
      <View
        style={{
          marginLeft: 30,
          borderBottomColor: '#dcdcdc',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <Text style={{lineHeight: 24}}>
          Không có gì đâu nhé Không có gì đâu nhé Không có gì đâu nhé Không có
          gì đâu nhé Không có gì đâu nhé
        </Text>
        <Image
          style={{width: 200, height: 200, borderRadius: 3}}
          source={require('./../../assets/images/photo-background.jpeg')}
        />
      </View>
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
