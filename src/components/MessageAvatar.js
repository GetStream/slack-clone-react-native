import React from 'react';
import {
  MessageAvatar as StreamMessageAvatar,
  useMessageContext,
} from 'stream-chat-react-native';

export const MessageAvatar = (props) => {
  const {groupStyles, message} = useMessageContext();

  return (
    <StreamMessageAvatar
      {...props}
      showAvatar={
        message.quoted_message ||
        groupStyles[0] === 'single' ||
        groupStyles[0] === 'top' ||
        message.reply_count > 0
          ? true
          : false
      }
    />
  );
};
