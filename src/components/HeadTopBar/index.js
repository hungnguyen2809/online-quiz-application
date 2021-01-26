import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const isIOS = Platform.OS === 'ios';

class HeadTopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPressMenu}>
          <Image
            style={styles.iconsMenu}
            source={require('./../../assets/icons/menu.png')}
          />
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('./../../assets/icons/question_mark.png')}
        />
        <Text style={styles.title}>Online Quiz</Text>
      </View>
    );
  }
}

export default HeadTopBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: isIOS ? 45 : 5,
    padding: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    backgroundColor: '#18dcff',
    alignItems: 'center',
  },
  iconsMenu: {
    height: 26,
    width: 26,
  },
  logo: {
    width: 45,
    height: 45,
    marginLeft: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d35400',
    marginLeft: 25,
  },
});
