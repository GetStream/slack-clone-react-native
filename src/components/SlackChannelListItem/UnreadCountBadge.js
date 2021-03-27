import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from '../SCText';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
  },
  count: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
    paddingVertical: 2,
    textAlign: 'center',
    width: 28,
  },
});

export const UnreadCountBadge = (props) => {
  const {channel, mentionsOnly} = props;
  const unreadMentionsCount = channel.countUnreadMentions();
  const unreadCount = channel.countUnread();

  if (unreadCount === 0 || (mentionsOnly && unreadMentionsCount === 0))
    return null;

  const unreadMentionsCountText =
    unreadMentionsCount > 9 ? '9+' : unreadMentionsCount;
  const unreadCountText = unreadCount > 9 ? '9+' : unreadCount;
  return (
    <View style={styles.container}>
      <SCText style={styles.count}>
        {mentionsOnly ? unreadMentionsCountText : unreadCountText}
      </SCText>
    </View>
  );
};
