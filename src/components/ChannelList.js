import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  CacheService,
  ChatClientService,
  SCText,
  theme,
  isDark,
  notImplemented,
} from '../utils';

import {ChannelListItem} from './ChannelListItem';
import {useNavigation, useTheme} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';

export const ChannelList = () => {
  const client = ChatClientService.getClient();
  const navigation = useNavigation();
  const {colors} = useTheme();

  const changeChannel = channelId => {
    navigation.navigate('ChannelScreen', {
      channelId,
    });
  };
  const {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    readChannels,
    directMessagingConversations,
  } = useWatchedChannels(client);

  const renderChannelRow = (channel, isUnread) => {
    return (
      <ChannelListItem
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
        changeChannel={changeChannel}
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.sectionList}
        sections={[
          {
            title: '',
            id: 'menu',
            data: [
              {
                id: 'threads',
                title: 'Threads',
                icon: <SVGIcon height="14" width="14" type="threads" />,
                handler: notImplemented,
              },
              {
                id: 'drafts',
                title: 'Drafts',
                icon: <SVGIcon height="14" width="14" type="drafts" />,
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
            data: directMessagingConversations || [],
            clickHandler: () => {
              navigation.navigate('NewMessageScreen');
            },
          },
        ]}
        keyExtractor={(item, index) => item.id + index}
        SectionSeparatorComponent={props => {
          return <View style={{height: 5}} />;
        }}
        renderItem={({item, section}) => {
          if (section.id === 'menu') {
            return (
              <TouchableOpacity
                onPress={() => {
                  item.handler && item.handler();
                }}
                style={styles.channelRow}>
                <View style={styles.channelTitleContainer}>
                  {item.icon}
                  <SCText style={styles.channelTitle}>{item.title}</SCText>
                </View>
              </TouchableOpacity>
            );
          }
          return renderChannelRow(item, section.id === 'unread');
        }}
        stickySectionHeadersEnabled
        renderSectionHeader={({section: {title, data, id, clickHandler}}) => {
          if (data.length === 0 || id === 'menu') {
            return null;
          }

          return (
            <View
              style={[
                styles.groupTitleContainer,
                {
                  backgroundColor: colors.background,
                  borderTopColor: colors.border,
                  borderTopWidth: 1,
                },
              ]}>
              <SCText style={styles.groupTitle}>{title}</SCText>
              {clickHandler && (
                <TouchableOpacity
                  onPress={() => {
                    clickHandler && clickHandler();
                  }}
                  style={styles.groupTitleRightButton}>
                  <SCText style={styles.groupTitleRightButtonText}>+</SCText>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const useWatchedChannels = client => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [
    directMessagingConversations,
    setDirectMessagingConversations,
  ] = useState([]);
  const filters = {
    type: 'messaging',
    example: 'slack-demo',
    members: {
      $in: [client.user.id],
    },
  };

  const sort = {has_unread: -1, last_message_at: -1};
  const options = {limit: 30, offset: 0, state: true};

  useEffect(() => {
    const _unreadChannels = [];
    const _readChannels = [];
    const _directMessagingConversations = [];

    /**
     * fetchChannels simply gets the channels from queryChannels endpoint
     * and sorts them by following 3 categories:
     *
     * - Unread channels
     * - Channels (read channels)
     * - Direct conversations/messages
     */
    const fetchChannels = async () => {
      const channels = await client.queryChannels(
        {
          ...filters,
          name: {
            $ne: '',
          },
        },
        sort,
        options,
      );

      channels.forEach(c => {
        if (c.countUnread() > 0) {
          _unreadChannels.push(c);
        } else {
          _readChannels.push(c);
        }
      });

      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setDirectMessagingConversations([..._directMessagingConversations]);
    };

    const fetchDirectMessagingConversations = async () => {
      const directMessagingChannels = await client.queryChannels(
        {
          ...filters,
          name: '',
        },
        sort,
        options,
      );

      directMessagingChannels.forEach(c => {
        if (c.countUnread() > 0) {
          _unreadChannels.push(c);
        } else {
          _directMessagingConversations.push(c);
        }
      });
      setUnreadChannels([..._unreadChannels]);
      setReadChannels([..._readChannels]);
      setDirectMessagingConversations([..._directMessagingConversations]);
    };

    async function init() {
      await fetchChannels();
      await fetchDirectMessagingConversations();

      CacheService.initCache(
        client.user,
        [..._readChannels],
        [..._directMessagingConversations],
      );
    }

    init();
  }, [client]);

  useEffect(() => {
    function handleEvents(e) {
      if (e.type === 'message.new') {
        if (e.user.id === client.user.id) {
          return;
        }

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

        // Check if the channel (which received new message) exists in directMessagingConversations list.
        const oneOnOneConversationIndex = directMessagingConversations.findIndex(
          channel => channel.cid === cid,
        );
        if (oneOnOneConversationIndex >= 0) {
          // If yes, then remove it from directMessagingConversations list and add it to unreadChannels list
          const channel =
            directMessagingConversations[oneOnOneConversationIndex];
          directMessagingConversations.splice(oneOnOneConversationIndex, 1);
          setDirectMessagingConversations([...directMessagingConversations]);
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
          setDirectMessagingConversations([
            channel,
            ...directMessagingConversations,
          ]);
        } else {
          setReadChannels([channel, ...readChannels]);
        }
      }
    }

    client.on(handleEvents);

    return () => {
      client.off(handleEvents);
    };
  }, [client, readChannels, unreadChannels, directMessagingConversations]);

  return {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    setUnreadChannels,
    readChannels,
    setReadChannels,
    directMessagingConversations,
    setDirectMessagingConversations,
  };
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupTitle: {
    fontSize: 14,
  },
  groupTitleRightButton: {
    textAlignVertical: 'center',
  },
  groupTitleRightButtonText: {
    fontSize: 25,
  },
  channelRow: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
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
    paddingLeft: 10,
  },
  channelTitlePrefix: {
    fontWeight: '300',
    padding: 1,
  },
});
