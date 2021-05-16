import {useEffect} from 'react';

import {ChatClientStore} from '../../utils/ChatClientStore';

const chatClient = ChatClientStore.client;
export const useNotificationAddedToChannelListener = (
  setDMConversations,
  setReadChannels,
  setUnreadChannels,
) => {
  useEffect(() => {
    const handleEvent = async (event) => {
      if (event.channel?.id && event.channel?.type) {
        const channel = chatClient.channel('messaging', event.channel.id);
        await channel.watch();
        const isDM = channel.id.indexOf('!members-') === 0;
        const isUnread = channel.countUnread() > 0;
        if (isUnread) {
          setUnreadChannels((channels) => [channel, ...channels]);
        } else if (isDM) {
          setDMConversations((channels) => [channel, ...channels]);
        } else {
          setReadChannels((channels) => [channel, ...channels]);
        }
      }
    };

    chatClient.on('notification.added_to_channel', handleEvent);
    return () => chatClient.off('notification.added_to_channel', handleEvent);
  }, []);
};
