import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './../styles';

const ItemInfo = ({iconName, text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.wrapInfor}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcons name={iconName} size={23} color={'#a4b0be'} />
        <Text style={styles.titleInfor}>{text}</Text>
      </View>
      <MaterialIcons name={'chevron-right'} size={20} color={'#a4b0be'} />
    </TouchableOpacity>
  );
};

export default ItemInfo;
