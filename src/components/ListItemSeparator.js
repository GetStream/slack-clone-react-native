import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

export const ListItemSeparator = (styleProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        borderColor: colors.border,
        borderWidth: 0.5,
        width: '100%',
        ...styleProps,
      }}
    />
  );
};
