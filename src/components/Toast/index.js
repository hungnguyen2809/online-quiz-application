import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Dimensions, Platform, StyleSheet, Text} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;

const isIOS = Platform.OS === 'ios';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
    };
    this.animateOpacityValue = new Animated.Value(0);
    this.messageToast = '';
  }

  onShowToast(message = '', duration = 3500) {
    this.messageToast = message;
    this.setState({showToast: true}, () => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        this._onHideToast(duration);
      });
    });
  }

  _onHideToast(duration) {
    this.timeID = setTimeout(() => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        this.setState({showToast: false});
        clearTimeout(this.timeID);
      });
    }, duration);
  }

  // onStopToast(callback = () => {}) {
  //   this.timeID && clearTimeout(this.timeID);
  //   this.setState({showToast: false}, () => {
  //     if (typeof callback !== 'undefined') {
  //       callback();
  //     }
  //   });
  // }

  render() {
    const bottom = isIOS ? 30 : 10;
    const top = isIOS ? 40 : 10;
    return this.state.showToast ? (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: this.props.backgroundColor,
            opacity: this.animateOpacityValue,
          },
          this.props.position === 'bottom' ? {bottom: bottom} : {top: top},
        ]}>
        <Text style={[styles.text, {color: this.props.color}]}>
          {this.messageToast}
        </Text>
      </Animated.View>
    ) : null;
  }

  componentWillUnmount() {
    if (this.timeID) {
      clearTimeout(this.timeID);
    }
  }
}

Toast.propTypes = {
  backgroundColor: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  color: PropTypes.string,
};

Toast.defaultProps = {
  backgroundColor: '#666666',
  color: '#fff',
  position: 'bottom',
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH - 50,
    height: isIOS ? 45 : 42,
    marginHorizontal: 25,
    position: 'absolute',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    fontSize: 15,
  },
});
