import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export const SCText = props => {
  const {colors} = useTheme();
  const style = Array.isArray(props.style)
    ? [
        {
          fontFamily: 'Lato-Regular',
          color: colors.text,
          fontSize: 16,
        },
        ...props.style,
      ]
    : {
        fontFamily: 'Lato-Regular',
        color: colors.text,
        fontSize: 16,
        ...props.style,
      };
  return <Text style={style}>{props.children}</Text>;
};
