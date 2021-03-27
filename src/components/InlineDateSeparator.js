import {useTheme} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from './SCText';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});

export const InlineDateSeparator = ({date}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.border,
        },
      ]}>
      <SCText style={styles.date}>
        {dayjs(date).calendar(null, {
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          sameDay: '[Today]',
          sameElse: 'DD/MM/YYYY',
        })}
      </SCText>
    </View>
  );
};
