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
  truncate,
} from '../utils';
import {useTheme} from '@react-navigation/native';

import {NewMessageBubble} from '../components/NewMessageBubble';
import {ScreenHeader} from './ScreenHeader';
import {ChannelSearchButton} from '../components/ChannelSearchButton';
import {DirectMessagingConversationAvatar} from '../components/DirectMessagingConversationAvatar';
import {useNavigation} from '@react-navigation/native';
import {SCText} from '../components/SCText';

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
              <DirectMessagingConversationAvatar channel={item} />
              <View style={styles.messageDetailsContainer}>
                <SCText>{truncate(getChannelDisplayName(item), 45)}</SCText>
                <SCText style={styles.messagePreview}>
                  {lastMessage && lastMessage.user.id === chatClient.user.id
                    ? 'You:  '
                    : `${lastMessage.user.name}: `}
                  {truncate(lastMessage.text, 125)}
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
    marginRight: 10
  },
  messagePreview: {
    fontSize: 15,
    marginTop: 5,
  },
});
