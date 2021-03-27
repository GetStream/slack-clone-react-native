import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SCText} from './SCText';

export const JumpToButton = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Modals', {
          screen: 'JumpToSearchScreen',
        });
      }}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}>
      <SCText>Jump to</SCText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0.5,
    elevation: 10,
    margin: 15,
    padding: 10,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
});
