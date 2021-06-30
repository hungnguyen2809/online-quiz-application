/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {SCREEN_WIDTH} from '../../common/dimensionScreen';
import styles from './styles';

AlertNoti.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  position: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
};

AlertNoti.defaultProps = {
  onPress: () => {},
  onClose: () => {},
  position: 'top',
  color: 'red',
  backgroundColor: '#fff',
  title: 'Không có tiêu đề',
};

function AlertNoti(props) {
  const {
    visible,
    position,
    backgroundColor,
    color,
    title,
    onPress,
    onClose,
  } = props;
  const [widthView, setWidthView] = useState(0);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return visible ? (
    <View
      style={[
        styles.container,
        {backgroundColor, left: SCREEN_WIDTH / 2 - widthView / 2},
        position === 'top' ? {top: getStatusBarHeight() + 50} : {bottom: 10},
      ]}
      onLayout={(ev) => setWidthView(ev.nativeEvent.layout.width)}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.textMes, {color}]}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnClose} onPress={handleClose}>
        <Image
          style={styles.iconClose}
          source={require('./../../assets/icons/icons-multiply.png')}
        />
      </TouchableOpacity>
    </View>
  ) : null;
}

export default AlertNoti;
