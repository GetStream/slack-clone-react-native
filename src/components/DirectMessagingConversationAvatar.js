import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {ChatClientService} from '../utils';
import {useTheme} from '@react-navigation/native';
import {PresenceIndicator} from './ChannelListItem';

export const DirectMessagingConversationAvatar = ({channel}) => {
  const chatClient = ChatClientService.getClient();
  const {colors} = useTheme();
  const otherMembers = Object.values(channel.state.members).filter(
    m => m.user.id !== chatClient.user.id,
  );
  if (otherMembers.length >= 2) {
    return (
      <View style={styles.stackedAvatarContainer}>
        <Image
          style={styles.stackedAvatarImage}
          source={{
            uri: otherMembers[0].user.image,
          }}
        />
        <Image
          style={[
            styles.stackedAvatarImage,
            styles.stackedAvatarTopImage,
            {
              borderColor: colors.background,
            },
          ]}
          source={{
            uri: otherMembers[1].user.image,
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.avatarImage}>
      <Image
        style={styles.avatarImage}
        source={{
          uri: otherMembers[0].user.image,
        }}
      />
      <View
        style={[
          styles.presenceIndicatorContainer,
          {
            borderColor: colors.background,
          },
        ]}>
        <PresenceIndicator
          online={otherMembers[0].user.online}
          backgroundTransparent={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stackedAvatarContainer: {
    height: 45,
    width: 45,
    marginTop: 5,
  },
  stackedAvatarTopImage: {
    position: 'absolute',
    borderWidth: 3,
    bottom: 0,
    right: 0,
  },
  stackedAvatarImage: {
    height: 31,
    width: 31,
    borderRadius: 5,
    // marginTop: 5,
  },
  avatarImage: {height: 45, width: 45, borderRadius: 5},
  presenceIndicatorContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderWidth: 3,
    borderRadius: 100 / 2,
  },
});
