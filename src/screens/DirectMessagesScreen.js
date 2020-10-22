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
  getChannelDisplayImage,
  getChannelDisplayName,
  SCText,
  theme,
  isDark,
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
        data={CacheService.getOneToOneConversations()}
        renderItem={({item}) => {
          const lastMessage =
            item.state.messages[item.state.messages.length - 1];
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
              <Image
                style={styles.messageUserImage}
                source={{
                  uri: getChannelDisplayImage(item),
                }}
              />
              <View style={styles.messageDetailsContainer}>
                <SCText>{getChannelDisplayName(item)}</SCText>
                <SCText style={styles.messagePreview}>
                  {lastMessage.user.id === chatClient.user.id
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
  messageUserImage: {
    height: 35,
    width: 35,
    borderRadius: 5,
    marginTop: 5,
  },
  messageDetailsContainer: {
    flex: 1,
    marginLeft: 12,
    marginBottom: 15,
  },
  messagePreview: {
    fontSize: 15,
    marginTop: 5,
  },
});
