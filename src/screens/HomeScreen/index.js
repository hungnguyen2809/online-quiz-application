import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HeadTopBar from '../../components/HeadTopBar';
import AchievementUser from './components/AchievementUser';
import RatingUser from './components/RatingUser';

class HomeScreen extends Component {
  static options(props) {
    return {
      topBar: {
        visible: false,
      },
      bottomTab: {
        text: 'Trang chủ',
        icon: require('./../../assets/icons/ic-home.png'),
      },
      statusBar: {
        drawBehind: true,
        backgroundColor: 'transparent',
      },
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadTopBar />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Bảng xếp hạng:</Text>
              <RatingUser rate={1} />
              <RatingUser rate={2} />
              <RatingUser rate={3} />
            </View>
            <View style={styles.card}>
              <Text style={styles.titleCard}>Hoàn thành:</Text>
              <AchievementUser name={'Toán học'} process={0.3} />
              <AchievementUser name={'Tiếng anh'} process={0.8} />
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
