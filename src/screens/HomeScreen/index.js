import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HeadTopBar from '../../components/HeadTopBar';
import AchievementUser from './components/AchievementUser';
import RatingUser from './components/RatingUser';

import {openMenuLeft} from './../MethodScreen';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  _handleOpenMemu = () => {
    openMenuLeft(this.props.componentId);
  };

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar onPressMenu={this._handleOpenMemu} />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Bảng xếp hạng:</Text>
              <RatingUser rate={1} />
              <RatingUser rate={2} />
              <RatingUser rate={3} />
            </View>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Thành tích:</Text>
              <AchievementUser name={'Toán học'} process={0.3} />
              <AchievementUser name={'Tiếng anh'} process={0.9} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe4ea',
  },
  content: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  titleCard: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
