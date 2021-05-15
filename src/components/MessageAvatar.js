import React from 'react';
import {Image} from 'react-native';
import {
  makeImageCompatibleUrl,
  useMessageContext,
} from 'stream-chat-react-native';

import {Spacer} from './Spacer';

const randomImageBaseUrl = 'https://getstream.io/random_png/';
const getInitials = (fullName) =>
  fullName
    .split(' ')
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join(' ');
const avatarSize = 40;

export const MessageAvatar = () => {
  const {groupStyles, message} = useMessageContext();
  if (groupStyles[0] === 'single' || groupStyles[0] === 'top') {
    return (
      <Image
        source={{
          uri: message.user.image
            ? makeImageCompatibleUrl(message.user.image)
            : `${randomImageBaseUrl}${
                message.user.name
                  ? `?name=${getInitials(message.user.name)}&size=${avatarSize}`
                  : ''
              }`,
        }}
        style={{
          borderRadius: 5,
          height: avatarSize,
          marginRight: 10,
          width: avatarSize,
        }}
      />
    );
  }

  return <Spacer width={50} />;
};
