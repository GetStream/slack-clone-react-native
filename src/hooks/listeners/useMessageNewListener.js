import {useEffect} from 'react';

import {ChatClientStore} from '../../utils';

const chatClient = ChatClientStore.client;
export const useMessageNewListener = (
  readChannels,
  unreadChannels,
  dmConversations,
  setDMConversations,
  setReadChannels,
  setUnreadChannels,
) => {
  useEffect(() => {
    const handleEvent = (event) => {
      if (event.user.id === chatClient.user.id) {
        return;
      }

      const cid = event.cid;

      // Check if the channel (which received new message) exists in group channels.
      const channelReadIndex = readChannels.findIndex(
        (channel) => channel.cid === cid,
      );

      if (channelReadIndex >= 0) {
        // If yes, then remove it from readChannels list and add it to unreadChannels list
        const channel = readChannels[channelReadIndex];
        readChannels.splice(channelReadIndex, 1);
        setReadChannels([...readChannels]);
        setUnreadChannels([channel, ...unreadChannels]);
      }

      // Check if the channel (which received new message) exists in dmConversations list.
      const dmConversationIndex = dmConversations.findIndex(
        (channel) => channel.cid === cid,
      );

      if (dmConversationIndex >= 0) {
        // If yes, then remove it from dmConversations list and add it to unreadChannels list
        const channel = dmConversations[dmConversationIndex];
        dmConversations.splice(dmConversationIndex, 1);
        setDMConversations([...dmConversations]);
        setUnreadChannels([channel, ...unreadChannels]);
      }

      // Check if the channel (which received new message) already exists in unreadChannels.
      const channelUnreadIndex = unreadChannels.findIndex(
        (channel) => channel.cid === cid,
      );

      if (channelUnreadIndex >= 0) {
        const channel = unreadChannels[channelUnreadIndex];
        unreadChannels.splice(channelUnreadIndex, 1);
        setReadChannels([...readChannels]);
        setUnreadChannels([channel, ...unreadChannels]);
      }
    };

    chatClient.on('message.new', handleEvent);
    return () => chatClient.off('message.new', handleEvent);
  }, []);
};
