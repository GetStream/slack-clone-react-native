import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';

export const SCText = (props) => {
  const {colors} = useTheme();
  const {onPress, style: propStyle} = props;
  const style = Array.isArray(propStyle)
    ? [
        {
          color: colors.text,
          fontFamily: 'Lato-Regular',
          fontSize: 16,
        },
        ...propStyle,
      ]
    : {
        color: colors.text,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        ...propStyle,
      };
  return (
    <Text onPress={onPress} style={style}>
      {props.children}
    </Text>
  );
};
