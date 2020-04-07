import React from 'react';
import {MessageAvatar as StreamMessageAvatar} from 'stream-chat-react-native';

export const MessageAvatar = props => {
  return (
    <StreamMessageAvatar
      {...props}
      style={
        props.groupStyles[0] === 'single' || props.groupStyles[0] === 'top'
          ? {
            'message.avatarWrapper.container': 'align-self: flex-start',
            'avatar.image': 'border-radius: 5;',
          }
          : {'message.avatarWrapper.spacer': 'height: 0; width:0;'}
      }
      showAvatar={
        props.groupStyles[0] === 'single' || props.groupStyles[0] === 'top'
          ? true
          : false
      }
    />
  );
};
