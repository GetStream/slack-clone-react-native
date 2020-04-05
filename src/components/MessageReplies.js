import React from 'react';
import {Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const MessageReplies = ({
  message,
  isThreadList,
  channel,
  openThread,
  alignment,
  t,
}) => {
  if (isThreadList || !message.reply_count) {
    return null;
  }

  const replyAvatars = channel.state.threads[message.id].map(
    reply => reply.user.image,
  );
  return (
    <TouchableOpacity onPress={openThread}>
      {replyAvatars.map(avatar => (
        <Image source={avatar} style={styles.replyArrow} />
      ))}
      {message.reply_count} replies
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  replyArrow: {
    height: 30,
    width: 30,
  },
});
