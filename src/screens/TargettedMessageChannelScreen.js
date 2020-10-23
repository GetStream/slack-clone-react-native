import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Chat, Channel, MessageList} from 'stream-chat-react-native';
import {ChannelHeader} from '../components/ChannelHeader';
import {CustomKeyboardCompatibleView} from '../components/CustomKeyboardCompatibleView';
import {DateSeparator} from '../components/DateSeparator';
import {MessageSlack} from '../components/MessageSlack';
import {useStreamChatTheme} from '../utils';

export function TargettedMessageChannelScreen({
  navigation,
  route: {
    params: {chatClient, message = null},
  },
}) {
  const chatTheme = useStreamChatTheme();
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    const initChannel = async () => {
      if (!message) {
        navigation.goBack();
      } else {
        const _channel = chatClient.channel('messaging', message.channel.id);
        const res = await _channel.query({
          messages: {limit: 10, id_lte: message.id},
        });
        console.warn(res);
        _channel.initialized = true;
        setChannel(_channel);
      }
    };
    initChannel();
  }, [chatClient, message]);

  return (
    <SafeAreaView style={styles.channelScreenSaveAreaView}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader
          navigation={navigation}
          channel={channel}
          client={chatClient}
        />
        <View style={styles.chatContainer}>
          <Chat client={chatClient} style={chatTheme}>
            <Channel
              channel={channel}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}>
              <MessageList
                Message={MessageSlack}
                DateSeparator={DateSeparator}
                additionalFlatListProps={{
                  onEndReached: () => null,
                }}
              />
            </Channel>
          </Chat>
        </View>
        <TouchableOpacity
          style={styles.recentMessageLink}
          onPress={() => {
            channel.initialized = false;
            navigation.navigate('ChannelScreen', {
              channelId: channel.id,
            });
          }}>
          <Text style={styles.recentMessageLinkText}>
            Jump to recent message
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  channelScreenSaveAreaView: {
    backgroundColor: '#F7F7F7',
  },
  channelScreenContainer: {flexDirection: 'column', height: '100%'},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  chatContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
  recentMessageLink: {
    height: 60,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  recentMessageLinkText: {
    alignSelf: 'center',
    color: '#1E90FF',
    fontSize: 15,
  },
});
