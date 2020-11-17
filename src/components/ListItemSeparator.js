import React from 'react';
import {View} from 'react-native';

import {useTheme} from '@react-navigation/native';

export const ListItemSeparator = () => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        borderColor: colors.border,
        borderWidth: 0.5,
        width: '100%'
      }}
    />
  );
};
