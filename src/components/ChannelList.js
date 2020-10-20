import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  SectionList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CacheService} from '../utils';

import {ChannelListItem} from './ChannelListItem';
import ThreadsIcon from '../images/channel-list/threads.svg';
export const ChannelList = ({client, changeChannel, navigation}) => {
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
    <View style={styles.container}>
      <SectionList
        style={styles.sectionList}
        sections={[
          {
            title: '',
            id: 'menu',
            data: [
              {
                id: 'threads',
                title: 'Threads',
                icon: <ThreadsIcon height="16" width="16" />,
                handler: () => null,
              },
              {
                id: 'drafts',
                title: 'Drafts',
                handler: () => navigation.navigate('DraftsScreen'),
              },
            ],
          },
          {
            title: 'Unread',
            id: 'unread',
            data: unreadChannels || [],
          },
          {
            title: 'Channels',
            data: readChannels || [],
            clickHandler: () => {
              navigation.navigate('ChannelSearchScreen', {
                channelsOnly: true,
              });
            },
          },
          {
            title: 'Direct Messages',
            data: oneOnOneConversations || [],
            clickHandler: () => {
              navigation.navigate('NewMessageSearchScreen');
            },
          },
        ]}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item, section}) => {
          if (section.id === 'menu') {
            return (
              <TouchableOpacity
                onPress={() => {
                  item.handler && item.handler();
                }}
                style={{
                  ...styles.channelRow,
                }}>
                <View style={styles.channelTitleContainer}>
                  {item.icon ? (
                    item.icon
                  ) : (
                    <Text style={styles.channelTitlePrefix}>✎</Text>
                  )}
                  <Text style={styles.channelTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }
          return renderChannelRow(item, section.id === 'unread');
        }}
        renderSectionHeader={({section: {title, data, id, clickHandler}}) => {
          if (data.length === 0 || id === 'menu') {
            return null;
          }

          return (
            <View style={styles.groupTitleContainer}>
              <Text style={styles.groupTitle}>{title}</Text>
              <Text
                onPress={() => {
                  clickHandler && clickHandler();
                }}
                style={{
                  textAlignVertical: 'center',
                  fontSize: 20,
                }}>
                +
              </Text>
            </View>
          );
        }}
      />
    </View>
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
      channels.forEach(c => {
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

      CacheService.initCache(
        client.user,
        [..._readChannels],
        [..._oneOnOneConversations],
      );

      if (channels.length === options.limit) {
        fetchChannels();
      } else {
        setHasMoreChannels(false);
        setActiveChannelId(_readChannels[0].id);
        // changeChannel(_readChannels[0].id);
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
          channel => channel.cid === cid,
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
          channel => channel.cid === cid,
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
          channel => channel.cid === cid,
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
          channel => channel.cid === cid,
        );
        if (channelIndex < 0) {
          return;
        }

        // get channel from channels
        const channel = unreadChannels[channelIndex];

        unreadChannels.splice(channelIndex, 1);
        setUnreadChannels([...unreadChannels]);

        if (!channel.data.name) {
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
const textStyles = {
  fontFamily: 'Lato-Regular',
  color: 'black',
  fontSize: 16,
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  headerContainer: {
    margin: 10,
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputSearchBox: {
    backgroundColor: 'white',
    padding: 10,
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1,
  },
  groupTitleContainer: {
    paddingTop: 14,
    marginLeft: 10,
    marginRight: 10,
    // borderBottomColor: '#995d9a',
    // borderBottomWidth: 0.3,
    backgroundColor: 'white',
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  channelRow: {
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginRight: 5,
  },
  channelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelTitle: {
    padding: 5,
    fontWeight: '300',
    paddingLeft: 10,
    ...textStyles,
  },
  channelTitlePrefix: {
    fontWeight: '300',
    padding: 1,
    ...textStyles,
  },
});
