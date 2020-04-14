import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  SectionList,
} from 'react-native';

import {ChannelListItem} from './ChannelListItem';

export const ChannelList = ({client, changeChannel}) => {
  const {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    readChannels,
    oneOnOneConversations,
  } = useWatchedChannels(client, changeChannel);

  const renderChannelRow = (channel, isUnread) => {
    const isOneOnOneConversation =
      Object.keys(channel.state.members).length === 2;

    return (
      <ChannelListItem
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
        changeChannel={changeChannel}
        isOneOnOneConversation={isOneOnOneConversation}
        isUnread={isUnread}
        channel={channel}
        client={client}
        key={channel.id}
        currentUserId={client.user.id}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.inputSearchBox}
            placeholderTextColor="grey"
            placeholder="Jump to"
          />
        </View>

        <SectionList
          style={styles.sectionList}
          sections={[
            {
              title: 'Unread',
              id: 'unread',
              data: unreadChannels || [],
            },
            {
              title: 'Channels',
              data: readChannels || [],
            },
            {
              title: 'Direct Messages',
              data: oneOnOneConversations || [],
            },
          ]}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({item, section}) => {
            return renderChannelRow(item, section.id === 'unread');
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.groupTitleContainer}>
              <Text style={styles.groupTitle}>{title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const useWatchedChannels = (client, changeChannel) => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [oneOnOneConversations, setOneOnOneConversations] = useState([]);
  const [hasMoreChannels, setHasMoreChannels] = useState(true);
  const filters = {
    type: 'messaging',
    example: 'slack-demo',
    members: {
      $in: [client.user.id],
    },
  };

  const sort = {has_unread: -1, cid: -1};
  const options = {limit: 30, state: true};

  useEffect(() => {
    if (!hasMoreChannels) {
      return;
    }

    let offset = 0;
    const _unreadChannels = [];
    const _readChannels = [];
    const _oneOnOneConversations = [];

    /**
     * fetchChannels simply gets the channels from queryChannels endpoint
     * and sorts them by following 3 categories:
     *
     * - Unread channels
     * - Channels (read channels)
     * - Direct conversations/messages
     */
    async function fetchChannels() {
      const channels = await client.queryChannels(filters, sort, {
        ...options,
        offset,
      });

      offset = offset + channels.length;
      channels.forEach((c) => {
        if (c.countUnread() > 0) {
          _unreadChannels.push(c);
        } else if (Object.keys(c.state.members).length === 2) {
          _oneOnOneConversations.push(c);
        } else {
          _readChannels.push(c);
        }
      });

      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setOneOnOneConversations([..._oneOnOneConversations]);

      if (channels.length === options.limit) {
        fetchChannels();
      } else {
        setHasMoreChannels(false);
        setActiveChannelId(_readChannels[0].id);
        changeChannel(_readChannels[0].id);
      }
    }

    fetchChannels();
  }, [client]);

  useEffect(() => {
    function handleEvents(e) {
      if (e.type === 'message.new') {
        const cid = e.cid;

        // Check if the channel (which received new message) exists in group channels.
        const channelReadIndex = readChannels.findIndex(
          (channel) => channel.cid === cid,
        );

        if (channelReadIndex >= 0) {
          // If yes, then remove it from reacChannels list and add it to unreadChannels list
          const channel = readChannels[channelReadIndex];
          readChannels.splice(channelReadIndex, 1);
          setReadChannels([...readChannels]);
          setUnreadChannels([channel, ...unreadChannels]);
        }

        // Check if the channel (which received new message) exists in oneOnOneConversations list.
        const oneOnOneConversationIndex = oneOnOneConversations.findIndex(
          (channel) => channel.cid === cid,
        );
        if (oneOnOneConversationIndex >= 0) {
          // If yes, then remove it from oneOnOneConversations list and add it to unreadChannels list
          const channel = oneOnOneConversations[oneOnOneConversationIndex];
          oneOnOneConversations.splice(oneOnOneConversationIndex, 1);
          setOneOnOneConversations([...oneOnOneConversations]);
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

        if (Object.keys(channel.state.members).length === 2) {
          setOneOnOneConversations([channel, ...oneOnOneConversations]);
        } else {
          setReadChannels([channel, ...readChannels]);
        }
      }
    }

    client.on(handleEvents);

    return () => {
      client.off(handleEvents);
    };
  }, [client, readChannels, unreadChannels, oneOnOneConversations]);

  return {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    setUnreadChannels,
    readChannels,
    setReadChannels,
    oneOnOneConversations,
    setOneOnOneConversations,
  };
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  headerContainer: {
    padding: 10,
    marginRight: 10,
  },
  inputSearchBox: {
    backgroundColor: '#2e0a2f',
    padding: 10,
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1,
  },
  groupTitleContainer: {
    padding: 10,
    borderBottomColor: '#995d9a',
    borderBottomWidth: 0.3,
    marginBottom: 7,
  },
  groupTitle: {
    color: 'white',
    fontWeight: '100',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
});
