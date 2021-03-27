import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useChatContext} from 'stream-chat-react-native';

import {PresenceIndicator} from '../PresenceIndicator';
import {ChannelTitle} from './ChannelTitle';
import {UnreadCountBadge} from './UnreadCountBadge';

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    height: 17,
    width: 17,
  },
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
});

export const OneOnOneDMItem = (props) => {
  const {channel, mode, onPress, titleStyle} = props;
  const {client} = useChatContext();

  // If its a oneOnOneConversation, then we need to display the name of the other user.
  // For this purpose, we need to find out, among two members of this channel,
  // which one is current user and which one is the other one.
  const members = Object.values(channel.state.members);
  const otherMember = members.find((m) => m.user_id !== client.user.id);

  const showAvatar = mode === 'search';
  const showUnreadBadge = mode === 'list';

  return (
    <TouchableOpacity
      key={channel.id}
      onPress={onPress}
      style={styles.channelRow}>
      <View style={styles.channelTitleContainer}>
        {showAvatar ? (
          <Image
            source={{
              uri: otherMember.user.image,
            }}
            style={styles.avatar}
          />
        ) : (
          <PresenceIndicator online={otherMember.user.online} />
        )}
        <ChannelTitle channel={channel} titleStyle={titleStyle} />
        {/* If the other user is online, then show the green presence indicator next to his name */}
        {showAvatar && <PresenceIndicator online={otherMember?.user?.online} />}
      </View>
      {
        showUnreadBadge &&
        <UnreadCountBadge channel={channel} />
      }
    </TouchableOpacity>
  );
};
