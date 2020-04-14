import React from 'react';
import {MessageAvatar as StreamMessageAvatar} from 'stream-chat-react-native';

export const MessageAvatar = props => {
  return (
    <StreamMessageAvatar
      {...props}
      showAvatar={
        props.groupStyles[0] === 'single' || props.groupStyles[0] === 'top'
          ? true
          : false
      }
    />
  );
};