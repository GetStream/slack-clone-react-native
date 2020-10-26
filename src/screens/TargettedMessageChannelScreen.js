import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Chat, Channel, MessageList} from 'stream-chat-react-native';
import {ChannelHeader} from '../components/ChannelHeader';
import {CustomKeyboardCompatibleView} from '../components/CustomKeyboardCompatibleView';
import {DateSeparator} from '../components/DateSeparator';
import {MessageSlack} from '../components/MessageSlack';
import {ChatClientService, useStreamChatTheme} from '../utils';

export const TargettedMessageChannelScreen = () => {
  const chatTheme = useStreamChatTheme();
  const navigation = useNavigation();
  const {
    params: {message = null},
  } = useRoute();
  const {colors} = useTheme();
  const chatClient = ChatClientService.getClient();
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
        // We are tricking Channel component from stream-chat-react-native into believing
        // that provided channel is initialized, so that it doesn't call .watch() on channel.
        _channel.initialized = true;
        setChannel(_channel);
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
          style={[
            styles.recentMessageLink,
            {
              backgroundColor: colors.primary,
            },
          ]}
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
    flexGrow: 1,
    flexShrink: 1,
  },
  recentMessageLink: {
    height: 60,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 20,
  },
  recentMessageLinkText: {
    alignSelf: 'center',
    color: '#1E90FF',
    fontSize: 15,
  },
});
