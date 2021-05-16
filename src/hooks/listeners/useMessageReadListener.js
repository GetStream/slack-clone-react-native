import {useEffect} from 'react';

import {ChatClientStore} from '../../utils';

const chatClient = ChatClientStore.client;
export const useMessageReadListener = (
  readChannels,
  unreadChannels,
  dmConversations,
  setDMConversations,
  setReadChannels,
  setUnreadChannels,
) => {
  useEffect(() => {
    const handleEvent = (event) => {
      if (event.user.id !== chatClient.user.id) {
        return;
      }

      const cid = event.cid;
      // get channel index
      const channelIndex = unreadChannels.findIndex(
        (channel) => channel.cid === cid,
      );

      if (channelIndex < 0) {
        return;
      }

      // get channel from channels
      const channel = unreadChannels[channelIndex];

      unreadChannels.splice(channelIndex, 1);
      setUnreadChannels([...unreadChannels]);

      if (!channel.data.name) {
        setDMConversations([channel, ...dmConversations]);
      } else {
        setReadChannels([channel, ...readChannels]);
      }
    };

    chatClient.on('message.read', handleEvent);
    return () => chatClient.off('message.read', handleEvent);
  }, [readChannels, unreadChannels, dmConversations]);
};
