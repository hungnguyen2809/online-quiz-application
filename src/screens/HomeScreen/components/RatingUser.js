/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from '../../../common/format';

// const iconsRating = {
//   _1st: require('./../../../assets/icons/1st_place_medal.png'),
//   _2nd: require('./../../../assets/icons/2nd_place_medal.png'),
//   _3rd: require('./../../../assets/icons/3rd_place_medal.png'),
// };

class RatingUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {rate, row} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 10,
          }}>
          <Image
            style={styles.avatar}
            source={
              _.get(row, 'image')
                ? {uri: _.get(row, 'image')}
                : require('./../../../assets/icons/avatar/5.jpg')
            }
          />
          <View>
            <Text
              style={[
                styles.nameUser,
                {
                  color:
                    rate === 1 ? '#eb2f06' : rate === 2 ? '#4cd137' : '#e1b12c',
                },
              ]}>
              {_.get(row, 'name')}
            </Text>
            <Text style={styles.point}>
              Điểm số: {formatNumber(_.get(row, 'total_point'))}
            </Text>
          </View>
        </View>
        {/* <View style={{flex: 1}}>
          <Image
            style={styles.iconsRate}
            source={
              rate === 1
                ? iconsRating._1st
                : rate === 2
                ? iconsRating._2nd
                : iconsRating._3rd
            }
          />
        </View> */}
      </View>
    );
  }
}

export default RatingUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 2,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderWidth: 2,
    borderColor: '#45aaf2',
  },
  nameUser: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  iconsRate: {
    width: 25,
    height: 25,
  },
  point: {
    marginLeft: 10,
    marginTop: 5,
  },
});
