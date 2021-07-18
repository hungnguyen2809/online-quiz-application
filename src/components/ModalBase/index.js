import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const isIOS = Platform.OS === 'ios';

const ModalBase = (props) => {
  const {visible, onCloseModal, children, styleView = {}} = props;

  const onDismissModal = () => {
    onCloseModal && onCloseModal();
  };

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      swipeDirection={['down']}
      useNativeDriver={!isIOS}
      useNativeDriverForBackdrop={!isIOS}
      onSwipeComplete={onDismissModal}
      {...props}>
      <View style={[styles.container, {...styleView}]}>
        {children || <Text>No thing</Text>}
      </View>
    </Modal>
  );
};

export default ModalBase;

ModalBase.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.element,
  onCloseModal: PropTypes.func,
  propsBase: PropTypes.object,
};

ModalBase.defaultProps = {
  propsBase: {},
  onCloseModal: () => {},
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '80%',
    borderRadius: 5,
  },
});
