import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from './SCText';

export const DateSeparator = ({message}) => {
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
        {moment(message.date).calendar(null, {
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

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
