import React from 'react';
import {Image} from 'react-native';
import {
  makeImageCompatibleUrl,
  useMessageContext,
} from 'stream-chat-react-native';

import {Spacer} from './Spacer';

export const MessageAvatar = () => {
  const {groupStyles, message} = useMessageContext();

  if (groupStyles[0] === 'single' || groupStyles[0] === 'top') {
    return (
      <Image
        source={{
          uri: makeImageCompatibleUrl(message.user.image),
        }}
        style={{
          borderRadius: 5,
          height: 40,
          marginRight: 10,
          width: 40,
        }}
      />
    );
  }

  return <Spacer width={50} />;
};
