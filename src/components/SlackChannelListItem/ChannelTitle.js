import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {truncate} from '../../utils';
import {getChannelDisplayName} from '../../utils/channelUtils';
import {SCText} from '../SCText';

const styles = StyleSheet.create({
  channelTitle: {
    flexDirection: 'row',
    fontSize: 17,
    marginLeft: 7,
    padding: 5,
  },
  unreadChannelTitle: {
    fontSize: 16,
    marginLeft: 7,
    padding: 5,
    ...Platform.select({
      android: {
        fontWeight: 'bold',
      },
      ios: {
        fontWeight: '900',
      },
    }),
  },
});

export const ChannelTitle = (props) => {
  const {channel, titleStyle} = props;
  const {colors} = useTheme();
  const isUnread = channel.countUnread();

  return (
    <SCText
      style={
        isUnread
          ? [
              {
                color: colors.boldText,
              },
              styles.unreadChannelTitle,
              titleStyle,
            ]
          : [styles.channelTitle, {color: colors.textTitle}, titleStyle]
      }>
      {truncate(getChannelDisplayName(channel, false, true), 30)}
    </SCText>
  );
};
