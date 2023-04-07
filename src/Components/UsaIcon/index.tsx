import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
const usaIcon = require('../../Assets/usa.png');

export const UsaIcon = () => {
  return <Avatar.Image source={usaIcon} size={30} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {backgroundColor: '#0d2b51', marginRight: 6},
});
