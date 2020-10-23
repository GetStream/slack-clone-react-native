import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SCText, theme, isDark} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';

export const ChannelSearchButton = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ChannelSearchScreen', {channelsOnly: false});
      }}
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.background,
          shadowColor: colors.shadow,
        },
      ]}>
      <SCText>Jump to</SCText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 10,
    borderRadius: 8,
    padding: 10,
  },
});
