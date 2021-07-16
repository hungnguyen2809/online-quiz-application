import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import {screenAuth, screenMain} from './src/screens/config-screen';
import {getTokenToStorage} from './src/common/asyncStorage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showLottie: true};
  }

  componentDidMount() {
    SplashScreen.hide();
    setTimeout(() => {
      this.setState({showLottie: false}, this.onCheckAuthentication);
    }, 1500);
  }

  onCheckAuthentication = async () => {
    const res = await getTokenToStorage();
    if (res) {
      await Navigation.setRoot(screenMain);
    } else {
      await Navigation.setRoot(screenAuth);
    }
  };

  render() {
    return this.state.showLottie ? (
      <LottieView
        source={require('./src/assets/animated/question-mark.json')}
        autoPlay
        loop
      />
    ) : (
      <View style={styles.container} />
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
