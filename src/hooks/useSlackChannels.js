import {useEffect, useMemo, useState} from 'react';

import {CacheService, ChatClientService} from '../utils';

const sort = {
  has_unread: -1,
  last_message_at: -1,
};

const options = {
  limit: 10,
  offset: 0,
  state: true,
};

export const useSlackChannels = () => {
  const client = ChatClientService.getClient();
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [dmConversations, setDMConversations] = useState([]);

  // Base filter
  const filters = useMemo(
    () => ({
      example: 'slack-demo',
      members: {
        $in: [client.user.id],
      },
      name: {
        $ne: '',
      },
      type: 'messaging',
    }),
    [client.user.id],
  );

  const dmFilters = useMemo(
    () => ({
      example: 'slack-demo',
      members: {
        $in: [client.user.id],
      },
      name: '',
      type: 'messaging',
    }),
    [client.user.id],
  );

  useEffect(() => {
    const _unreadChannels = [];
    const _readChannels = [];
    const _dmConversations = [];

    const fetchChannels = async () => {
      // Query channels where name is not empty.
      const channels = await client.queryChannels(filters, sort, options);

      channels.forEach((c) => {
        if (c.countUnread() > 0) {
          console.log('found one unread');
          _unreadChannels.push(c);
        } else {
          _readChannels.push(c);
        }
      });

      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setDMConversations([..._dmConversations]);

      // Cache the data so that it can be used on other screens.
      CacheService.setChannels(channels);
    };

    const fetchDMConversations = async () => {
      // Query channels where name is empty - direct messaging conversations
      const directMessagingChannels = await client.queryChannels(
        dmFilters,
        sort,
        options,
      );

      directMessagingChannels.forEach((c) => {
        if (c.countUnread() > 0) {
          _unreadChannels.push(c);
        } else {
          _dmConversations.push(c);
        }
      });

      // Sort as per last received message.
      _unreadChannels.sort((a, b) =>
        a.state.last_message_at > b.state.last_message_at ? -1 : 1,
      );

      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setDMConversations([..._dmConversations]);

      // Cache the data so that it can be used on other screens.
      CacheService.setDMConversations(directMessagingChannels);
    };

    async function init() {
      await fetchChannels();
      await fetchDMConversations();

      CacheService.loadRecentAndOneToOne();
    }

    init();
  }, []);

  useEffect(() => {
    function handleEvents(e) {
      if (e.type === 'message.new') {
        if (e.user.id === client.user.id) {
          return;
        }
        if (client.user.id === 'vishal') {
          console.log('message.new');
        }

        const cid = e.cid;

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
      }

      if (e.type === 'message.read') {
        if (e.user.id !== client.user.id) {
          return;
        }

        if (client.user.id === 'vishal') {
          console.log('message.red');
        }

        const cid = e.cid;
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
      }
    }

    client.on(handleEvents);

    return () => {
      client.off(handleEvents);
    };
  }, [client, readChannels, unreadChannels, dmConversations]);

  return {
    activeChannelId,
    dmConversations,
    readChannels,
    setActiveChannelId,
    setDMConversations,
    setReadChannels,
    setUnreadChannels,
    unreadChannels,
  };
};
