import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

import {getChannelDisplayName, truncate} from '../../utils';
import {SCText} from '../SCText';

const styles = StyleSheet.create({
  channelTitle: {
    flexDirection: 'row',
    fontSize: 17,
    marginLeft: 7,
    padding: 5
  },
  unreadChannelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 7,
    padding: 5,
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
