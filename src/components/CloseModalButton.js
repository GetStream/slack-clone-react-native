import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SCText} from './SCText';

export const styles = StyleSheet.create({
  hamburgerIcon: {
    fontSize: 27,
  },
});

export const CloseModalButton = ({goBack}) => (
  <TouchableOpacity
    onPress={() => {
      goBack && goBack();
    }}>
    <SCText style={styles.hamburgerIcon}>x</SCText>
  </TouchableOpacity>
);
