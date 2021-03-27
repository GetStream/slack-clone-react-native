import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  offlineCircle: {
    backgroundColor: 'transparent',
    borderRadius: 100 / 2,
    height: 10,
    marginRight: 5,
    width: 10,
  },
  onlineCircle: {
    backgroundColor: '#117A58',
    borderRadius: 100 / 2,
    height: 10,
    marginRight: 5,
    width: 10,
  },
});

export const PresenceIndicator = ({backgroundTransparent = true, online}) => {
  const {colors} = useTheme();
  return (
    <View
      style={
        online
          ? styles.onlineCircle
          : [
              styles.offlineCircle,
              {
                backgroundColor: backgroundTransparent
                  ? 'transparent'
                  : colors.background,
                borderColor: colors.text,
                borderWidth: 1,
              },
            ]
      }
    />
  );
};
