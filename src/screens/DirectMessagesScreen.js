import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  CacheService,
  ChatClientService,
  getChannelDisplayName,
  SCText,
  truncate,
} from '../utils';
import {useTheme} from '@react-navigation/native';

import {NewMessageBubble} from '../components/NewMessageBubble';
import {ScreenHeader} from './ScreenHeader';
import {ChannelSearchButton} from '../components/ChannelSearchButton';
import {useNavigation} from '@react-navigation/native';

export const DirectMessagesScreen = props => {
  const chatClient = ChatClientService.getClient();
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScreenHeader title="Direct Messages" />
      <ChannelSearchButton />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={CacheService.getDirectMessagingConversations()}
        renderItem={({item}) => {
          const lastMessage =
            item.state.messages[item.state.messages.length - 1];

          if (!lastMessage) {
            return null;
          }
          return (
            <TouchableOpacity
              style={[
                styles.listItemContainer,
                {
                  borderTopColor: colors.border,
                },
              ]}
              onPress={() => {
                navigation.navigate('ChannelScreen', {
                  channelId: item.id,
                });
              }}>
              <ChannelAvatar channel={item} />
              <View style={styles.messageDetailsContainer}>
                <SCText>{truncate(getChannelDisplayName(item), 45)}</SCText>
                <SCText style={styles.messagePreview}>
                  {lastMessage && lastMessage.user.id === chatClient.user.id
                    ? 'You:  '
                    : `${lastMessage.user.name}: `}
                  {lastMessage.text}
                </SCText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <NewMessageBubble />
    </View>
  );
};

const ChannelAvatar = ({channel}) => {
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
    <Image
      style={styles.avatarImage}
      source={{
        uri: otherMembers[0].user.image,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  messageDetailsContainer: {
    flex: 1,
    marginLeft: 25,
    marginBottom: 15,
  },
  messagePreview: {
    fontSize: 15,
    marginTop: 5,
  },

  stackedAvatarContainer: {
    height: 40,
    width: 40,
    marginTop: 5,
  },
  stackedAvatarTopImage: {
    position: 'absolute',
    borderWidth: 3,
    bottom: 0,
    right: 0,
  },
  stackedAvatarImage: {
    height: 28,
    width: 28,
    borderRadius: 5,
    // marginTop: 5,
  },
  avatarImage: {height: 40, width: 40, borderRadius: 5}
});
