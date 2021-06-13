/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../common/Colors';
import {get} from 'lodash';
import {useState} from 'react';
import {getTimeFromNow} from '../../common/format';
import {SCREEN_WIDTH} from '../../common/dimensionScreen';
import MateriaIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {getAccountSelector} from '../../redux/Account/selectors';
import ImageView from 'react-native-image-viewing';

PostItemComment.propTypes = {
  row: PropTypes.object,
};

function PostItemComment(props) {
  const {row} = props;
  const account = useSelector(getAccountSelector());
  const [loadingAvt, setLoadingAvt] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [showImageView, setShowImageView] = useState(false);

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
          <TouchableOpacity>
            <MateriaIcon name={'more-vert'} size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          marginLeft: 30,
          borderBottomColor: '#dcdcdc',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <Text style={{lineHeight: 24}}>{get(row, 'comment', '')}</Text>
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
});
