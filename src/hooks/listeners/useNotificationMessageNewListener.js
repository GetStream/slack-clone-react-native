import {useEffect} from 'react';

import {ChatClientStore} from '../../utils';

const chatClient = ChatClientStore.client;
export const useNotificationMessageNewListener = (
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

    chatClient.on('notification.message_new', handleEvent);
    return () => chatClient.off('notification.message_new', handleEvent);
  }, []);
};
