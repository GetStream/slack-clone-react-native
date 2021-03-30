import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const BottomSheetBackground = () => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {backgroundColor: colors.background},
      ]}></View>
  );
};
