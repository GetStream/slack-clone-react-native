import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const ChannelListView = ({client, setActiveChannel}) => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [oneOnOneConversations, setOneOnOneConversations] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreChannels, setHasMoreChannels] = useState(true);
  const filters = {
    type: 'messaging',
    example: 'slack-7',
    members: {
      $in: [client.user.id],
    },
  };

  const sort = {has_unread: -1};
  const options = {limit: 30, state: true};

  useEffect(() => {
    if (!hasMoreChannels) {
      return;
    }
    let offset = 0;
    const _unreadChannels = [];
    const _readChannels = [];
    const _oneOnOneConversations = [];

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

      if (channels.length === options.limit) {
        fetchChannels();
      } else {
        setHasMoreChannels(false);
        setActiveChannelId(_readChannels[0].id);
        setActiveChannel(_readChannels[0].id);
      }
    }

    fetchChannels();
  }, [client]);

  useEffect(() => {
    function handleEvents(e) {
      if (e.type === 'message.new') {
        const cid = e.cid;
        // get channel index
        const channelReadIndex = readChannels.findIndex(
          channel => channel.cid === cid,
        );
        const channelUnreadIndex = unreadChannels.findIndex(
          channel => channel.cid === cid,
        );
        const oneOnOneConversationIndex = oneOnOneConversations.findIndex(
          channel => channel.cid === cid,
        );
        let channel;
        if (channelReadIndex >= 0) {
          channel = readChannels[channelReadIndex];
          readChannels.splice(channelReadIndex, 1);
          setReadChannels([...readChannels]);
        } else if (oneOnOneConversationIndex >= 0) {
          channel = oneOnOneConversations[oneOnOneConversationIndex];
          oneOnOneConversations.splice(oneOnOneConversationIndex, 1);
          setOneOnOneConversations([...oneOnOneConversations]);
        } else if (channelUnreadIndex >= 0) {
          channel = unreadChannels[channelUnreadIndex];
          unreadChannels.splice(channelUnreadIndex, 1);
          setReadChannels([...readChannels]);
        }
        setUnreadChannels([channel, ...unreadChannels]);
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
        // set new channel state
        if (this._unmounted) {
          return;
        }

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
  return (
    <SafeAreaView>
      <View style={channelListStyles.container}>
        <View style={channelListStyles.headerContainer}>
          <TextInput
            style={channelListStyles.inputSearchBox}
            placeholderTextColor="grey"
            placeholder="Jump to"
            inlineImageLeft="search_icon"
          />
        </View>
        <ScrollView style={channelListStyles.scrollView}>
          <View style={channelListStyles.groupTitleContainer}>
            <Text style={channelListStyles.groupTitle}>Unreads</Text>
          </View>
          {unreadChannels &&
            unreadChannels.map(c => {
              return (
                <ChannelRow
                  activeChannelId={activeChannelId}
                  setActiveChannelId={setActiveChannelId}
                  setActiveChannel={setActiveChannel}
                  isOneOnOneConversation={
                    Object.keys(c.state.members).length === 2
                  }
                  isUnread={true}
                  channel={c}
                  client={client}
                  key={c.id}
                />
              );
            })}
          <View style={channelListStyles.groupTitleContainer}>
            <Text style={channelListStyles.groupTitle}>Channels</Text>
          </View>
          {readChannels &&
            readChannels.map(c => {
              return (
                <ChannelRow
                  activeChannelId={activeChannelId}
                  setActiveChannelId={setActiveChannelId}
                  setActiveChannel={setActiveChannel}
                  isOneOnOneConversation={false}
                  isUnread={false}
                  channel={c}
                  client={client}
                  key={c.id}
                />
              );
            })}
          <View style={channelListStyles.groupTitleContainer}>
            <Text style={channelListStyles.groupTitle}>Direct Messages</Text>
          </View>
          {oneOnOneConversations &&
            oneOnOneConversations.map(c => {
              return (
                <ChannelRow
                  activeChannelId={activeChannelId}
                  setActiveChannelId={setActiveChannelId}
                  setActiveChannel={setActiveChannel}
                  isOneOnOneConversation={true}
                  isUnread={false}
                  channel={c}
                  client={client}
                  key={c.id}
                />
              );
            })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const ChannelRow = ({
  setActiveChannelId,
  setActiveChannel,
  isOneOnOneConversation,
  isUnread,
  channel,
  activeChannelId,
  client,
}) => {
  let otherUserId;
  let ChannelPrefix = null;
  let ChannelTitle = null;
  let countUnreadMentions = channel.countUnreadMentions();
  if (isOneOnOneConversation) {
    const currentUserId = client.user.id;
    const memberIds = Object.keys(channel.state.members);
    otherUserId = memberIds[0] === currentUserId ? memberIds[1] : memberIds[0];
    ChannelPrefix = channel.state.members[otherUserId].user.online ? (
      <PresenceIndicator online={true} />
    ) : (
      <PresenceIndicator online={false} />
    );

    ChannelTitle = (
      <Text
        style={
          isUnread
            ? channelListStyles.unreadChannelTitle
            : channelListStyles.channelTitle
        }>
        {channel.state.members[otherUserId].user.name}
      </Text>
    );
  } else {
    ChannelPrefix = <Text style={channelListStyles.channelTitlePrefix}>#</Text>;
    ChannelTitle = (
      <Text
        style={
          isUnread
            ? channelListStyles.unreadChannelTitle
            : channelListStyles.channelTitle
        }>
        {channel.data.name && channel.data.name.toLowerCase().replace(' ', '_')}
      </Text>
    );
  }

  return (
    <TouchableOpacity
      key={channel.id}
      onPress={() => {
        setActiveChannelId(channel.id);
        setActiveChannel(channel.id);
      }}
      style={{
        ...channelListStyles.channelRow,
        backgroundColor: activeChannelId === channel.id ? '#0676db' : undefined,
      }}>
      <View style={channelListStyles.channelTitleContainer}>
        {ChannelPrefix}
        {ChannelTitle}
      </View>
      {countUnreadMentions > 0 && (
        <View style={channelListStyles.unreadMentionsContainer}>
          <Text style={channelListStyles.unreadMentionsText}>
            {channel.countUnreadMentions()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
var PresenceIndicator = ({online}) => {
  return (
    <View
      style={
        online ? channelListStyles.onlineCircle : channelListStyles.offlineCircle
      }
    />
  );
};

const textStyles = {
  fontFamily: 'Lato-Regular',
  color: 'white',
  fontSize: 18,
};
const channelListStyles = StyleSheet.create({
  onlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'green',
  },
  offlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    borderColor: 'white',
    borderWidth: 0.3,
    backgroundColor: 'transparent',
  },
  container: {
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  },
  headerContainer: {
    padding: 10,
    marginRight: 10,
  },
  inputSearchBox: {
    backgroundColor: '#2e0a2f',
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    flexShrink: 1,
  },
  channelRow: {
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginRight: 5,
  },
  activeChannelRow: {
    backgroundColor: '#0476BB',
  },
  channelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadChannelTitle: {
    marginLeft: 3,
    fontWeight: 'bold',
    padding: 5,
    ...textStyles,
  },
  channelTitle: {
    padding: 5,
    fontWeight: '300',
    paddingLeft: 10,
    ...textStyles,
  },
  channelTitlePrefix: {
    fontWeight: '300',
    ...textStyles,
  },
  onlineDot: {
    fontSize: 9,
  },
  offlineDot: {
    color: 'white',
    fontWeight: '300',
    fontSize: 10,
  },
  unreadMentionsContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 20,
  },
  unreadMentionsText: {
    color: 'white',
    padding: 3,
    paddingRight: 6,
    paddingLeft: 6,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'Lato-Regular',
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
