import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Platform, StyleSheet, Text} from 'react-native';
import {
  Chat,
  Channel,
  MessageList,
  KeyboardCompatibleView,
} from 'stream-chat-react-native';
import {ChannelHeader} from '../components/ChannelHeader';
import {DateSeparator} from '../components/DateSeparator';
import {MessageSlack} from '../components/MessageSlack';
import streamChatTheme from '../stream-chat-theme';

const CustomKeyboardCompatibleView = ({children}) => (
  <KeyboardCompatibleView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : -200}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
    {children}
  </KeyboardCompatibleView>
);
export function TargettedMessageChannelScreen({
  navigation,
  route: {
    params: {chatClient, message = null},
  },
}) {
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
          <Chat client={chatClient} style={streamChatTheme()}>
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
        <View
          style={{
            height: 60,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#F7F7F7',
            paddingTop: 20,
          }}>
          <Text
            style={{alignSelf: 'center', color: '#1E90FF', fontSize: 15}}
            onPress={() => {
              channel.initialized = false;
              navigation.navigate('ChannelScreen', {
                channelId: channel.id,
              });
            }}>
            Jump to recent message
          </Text>
        </View>
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
  touchableOpacityStyle: {
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#3F0E40',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 80,
  },
});
