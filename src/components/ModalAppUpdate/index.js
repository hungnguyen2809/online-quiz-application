/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Modal from 'react-native-modal';
import {Colors} from '../../common/Colors';
const isIOS = Platform.OS === 'ios';

const ModalAppUpdate = (props) => {
  const {visible, progress = 0, onPressUpdate, disabled} = props;
  const [widthProgess, setWidthProgess] = useState(0);

  const handlePressUpdate = () => {
    if (onPressUpdate) {
      onPressUpdate();
    }
  };

  return (
    <Modal
      style={{borderRadius: 5}}
      animationIn={'fadeInDownBig'}
      isVisible={visible}
      backdropOpacity={0.2}
      useNativeDriver={!isIOS}
      useNativeDriverForBackdrop={!isIOS}>
      <View style={styles.container}>
        <Text style={styles.title}>Có bản cập nhật</Text>
        <View style={styles.hr} />
        <View style={styles.wrapUpdate}>
          <View>
            <Text>Tiến độ:</Text>
            <View
              style={styles.wrapProgess}
              onLayout={(ev) => {
                setWidthProgess(ev.nativeEvent.layout.width);
              }}>
              <View style={[styles.curProgess, {width: `${progress}%`}]}>
                <Text
                  style={[styles.textProgess, {left: widthProgess / 2 - 10}]}>
                  {progress || '0'}%
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.8}
            style={styles.btnUpdate}
            onPress={debounce(handlePressUpdate, 300)}>
            <Text style={styles.btnTitle}>Cập nhật ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAppUpdate;

ModalAppUpdate.propTypes = {
  visible: PropTypes.bool,
  progress: PropTypes.number,
  onPressUpdate: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    height: '35%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    margin: 10,
    textAlign: 'center',
    color: Colors.RED_ORANGE,
  },
  hr: {
    borderBottomColor: Colors.PEACE,
    borderBottomWidth: 1,
  },
  wrapUpdate: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'space-around',
  },
  btnUpdate: {
    backgroundColor: Colors.RADIANT_YELLOW,
    marginVertical: '5%',
    marginHorizontal: '10%',
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 6,
  },
  btnTitle: {
    color: Colors.ANTI_FLASH_WHITE,
    fontSize: 17,
  },
  wrapProgess: {
    borderWidth: 1,
    borderColor: '#7BBCE7',
    backgroundColor: '#009BFF',
    borderRadius: 6,
    height: 25,
  },
  curProgess: {
    backgroundColor: '#9ED3F5',
    borderRadius: 6,
    height: '100%',
  },
  textProgess: {
    position: 'absolute',
    color: '#0F3852',
    textAlign: 'center',
    marginVertical: 2,
  },
});
