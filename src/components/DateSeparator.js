import React from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {SCText} from '../utils';
import {useTheme} from '@react-navigation/native';

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
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY',
        })}
      </SCText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
  },
  date: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 12,
  },

});
