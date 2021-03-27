import {useNavigation} from '@react-navigation/core';
import {useCallback, useEffect} from 'react';
import {useChatContext} from 'stream-chat-react-native';

import {
  AsyncStore,
  getChannelDisplayImage,
  getChannelDisplayName,
} from '../utils';

export const useDraftMessage = (currentMessage, channel) => {
  const navigation = useNavigation();
  const {client: chatClient} = useChatContext();

  const saveDraftMessage = useCallback(async () => {
    const storeObject = {
      channelId: channel.id,
      image: getChannelDisplayImage(channel),
      text: currentMessage,
      title: getChannelDisplayName(channel, true),
    };
    await AsyncStore.setItem(
      `@slack-clone-draft-${chatClient.user.id}-${channel.id}`,
      storeObject,
    );
  }, [currentMessage, channel?.id]);

  const getDraftMessageText = async (channelId) => {
    const draft = await AsyncStore.getItem(
      `@slack-clone-draft-${chatClient.user.id}-${channelId}`,
      null,
    );

    return draft?.text;
  };

  // If current user sends some message on channel, then assume that draft needs to be cleaned.
  useEffect(() => {
    const listener = (event) => {
      if (event.message.user.id === chatClient.user.id) {
        AsyncStore.removeItem(`@slack-clone-draft-${channel.id}`);
      }
    };

    channel?.on('message.new', listener);

    return () => {
      channel?.off('message.new', listener);
    };
  }, [channel?.id]);

  // Before user exists the screen, save the current message as draft
  useEffect(() => {
    navigation.addListener('beforeRemove', saveDraftMessage);

    return () => {
      navigation.removeListener('beforeRemove', saveDraftMessage);
    };
  }, [saveDraftMessage, channel?.id]);

  return {
    getDraftMessageText,
  };
};
