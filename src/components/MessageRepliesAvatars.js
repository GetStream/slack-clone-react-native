import React from 'react';
import {Image, View} from 'react-native';

export const MessageRepliesAvatars = ({message}) => {
  const avatars = message.thread_participants;

  return (
    <View style={{flexDirection: 'row', marginTop: 5}}>
      {avatars.map((user) => (
        <Image
          key={user.image}
          source={{
            uri: user.image,
          }}
          style={{
            borderRadius: 4,
            height: 20,
            marginLeft: 2,
            width: 20,
          }}
        />
      ))}
    </View>
  );
};
