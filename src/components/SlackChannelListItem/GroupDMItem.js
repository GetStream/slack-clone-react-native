import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {SCText} from '../SCText';
import {ChannelTitle} from './ChannelTitle';
import {UnreadCountBadge} from './UnreadCountBadge';

const styles = StyleSheet.create({
  channelRow: {
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
    padding: 3,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
  },
  channelTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  groupDMMemberCountPrefix: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    height: 13,
    textAlign: 'center',
    width: 13,
  },
});

export const GroupDMItem = (props) => {
  const {channel, mode, onPress, titleStyle} = props;

  const showPrefix = mode === 'list' || mode === 'search';
  const showUnreadBadge = mode === 'list';

  // If its a oneOnOneConversation, then we need to display the name of the other user.
  // For this purpose, we need to find out, among two members of this channel,
  // which one is current user and which one is the other one.
  const memberCount = channel.data.member_count;

  return (
    <TouchableOpacity
      key={channel.id}
      onPress={onPress}
      style={styles.channelRow}>
      <View style={styles.channelTitleContainer}>
        {showPrefix && (
          <SCText style={styles.groupDMMemberCountPrefix}>
            {/* -1 to exclude yourself */}
            {memberCount - 1}
          </SCText>
        )}
        <ChannelTitle channel={channel} titleStyle={titleStyle} />
      </View>
      {showUnreadBadge && <UnreadCountBadge channel={channel} />}
    </TouchableOpacity>
  );
};
