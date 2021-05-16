import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Channel, Chat, MessageList} from 'stream-chat-react-native';

import {CustomKeyboardCompatibleView} from '../components/CustomKeyboardCompatibleView';
import {DateSeparator} from '../components/DateSeparator';
import {MessageSlack} from '../components/MessageSlack';
import useStreamChatTheme from '../hooks/useStreamChatTheme';
import {ChatClientStore} from '../utils';
import {ChannelHeader} from './ChannelScreen/ChannelHeader';

export const TargettedMessageChannelScreen = () => {
  const chatTheme = useStreamChatTheme();
  const navigation = useNavigation();
  const {
    params: {message = null},
  } = useRoute();
  const {colors} = useTheme();
  const chatClient = ChatClientStore.client;

  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initChannel = async () => {
      if (!message) {
        navigation.goBack();
      } else {
        const nChannel = chatClient.channel('messaging', message.channel.id);
        await nChannel.query({
          messages: {id_lte: message.id, limit: 10},
        });
        // We are tricking Channel component from stream-chat-react-native into believing
        // that provided channel is initialized, so that it doesn't call .watch() on channel.
        nChannel.initialized = true;
        setChannel(nChannel);
      }
    };
    initChannel();
  }, [message]);

  if (!channel) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader channel={channel} goBack={navigation.goBack} />
        <View style={styles.chatContainer}>
          <Chat client={chatClient} style={chatTheme}>
            <Channel
              channel={channel}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}>
              <MessageList
                additionalFlatListProps={{
                  onEndReached: () => null,
                }}
                DateSeparator={DateSeparator}
                Message={MessageSlack}
              />
            </Channel>
          </Chat>
        </View>
        <TouchableOpacity
          onPress={() => {
            channel.initialized = false;
            navigation.navigate('ChannelScreen', {
              channelId: channel.id,
            });
          }}
          style={[
            styles.recentMessageLink,
            {
              backgroundColor: colors.primary,
            },
          ]}>
          <Text style={styles.recentMessageLinkText}>
            Jump to recent message
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  channelScreenContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  channelScreenSaveAreaView: {
    backgroundColor: '#F7F7F7',
  },
  chatContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  recentMessageLink: {
    alignSelf: 'center',
    height: 60,
    paddingTop: 20,
    width: '100%',
  },
  recentMessageLinkText: {
    alignSelf: 'center',
    color: '#1E90FF',
    fontSize: 15,
  },
});
