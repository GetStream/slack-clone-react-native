import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {SCText} from '../SCText';
import {ChannelTitle} from './ChannelTitle';
import {UnreadCountBadge} from './UnreadCountBadge';

const styles = StyleSheet.create({
  channelTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  channelTitlePrefix: {
    fontSize: 22,
    fontWeight: '300',
    padding: 0,
  },
  container: {
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 40,
  },
});

export const GroupChannelItem = (props) => {
  const {channel, mode, onPress, titleStyle} = props;

  const showUnreadBadge = mode === 'list';

  return (
    <TouchableOpacity
      key={channel.id}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.channelTitleContainer}>
        <SCText style={[styles.channelTitlePrefix, titleStyle]}>#</SCText>
        <ChannelTitle channel={channel} titleStyle={titleStyle} />
      </View>
      {showUnreadBadge && <UnreadCountBadge channel={channel} mentionsOnly />}
    </TouchableOpacity>
  );
};
