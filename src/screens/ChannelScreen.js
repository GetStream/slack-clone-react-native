import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Platform, StyleSheet} from 'react-native';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  KeyboardCompatibleView,
} from 'stream-chat-react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {ChannelHeader} from '../components/ChannelHeader';
import {DateSeparator} from '../components/DateSeparator';
import {InputBox} from '../components/InputBox';
import {MessageSlack} from '../components/MessageSlack';
import streamChatTheme from '../stream-chat-theme';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getChannelDisplayImage,
  getChannelDisplayName,
  theme,
  isDark,
  useStreamChatTheme,
} from '../utils';

const CustomKeyboardCompatibleView = ({children}) => (
  <KeyboardCompatibleView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : -200}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
    {children}
  </KeyboardCompatibleView>
);
export function ChannelScreen({
  route: {
    params: {chatClient, channelId = null},
  },
}) {
  const {colors} = useTheme();
  const chatStyles = useStreamChatTheme();
  const navigation = useNavigation();

  const [channel, setChannel] = useState(null);
  const [initialValue, setInitialValue] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [text, setText] = useState('');
  const goBack = () => {
    const storeObject = {
      channelId: channel.id,
      image: getChannelDisplayImage(channel),
      title: getChannelDisplayName(channel, true),
      text,
    };
    AsyncStorage.setItem(
      `@slack-clone-draft-${channelId}`,
      JSON.stringify(storeObject),
    );

    navigation.goBack();
  };

  useEffect(() => {
    const setDraftMessage = async () => {
      const draftStr = await AsyncStorage.getItem(
        `@slack-clone-draft-${channelId}`,
      );
      if (!draftStr) {
        setIsReady(true);
        return;
      }

      const draft = JSON.parse(draftStr);
      setInitialValue(draft.text);
      setText(draft.text);
      setIsReady(true);
    };
    if (!channelId) {
      navigation.goBack();
    } else {
      const _channel = chatClient.channel('messaging', channelId);
      setChannel(_channel);
      setDraftMessage();
    }
  }, [chatClient, channelId]);

  if (!isReady) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader goBack={goBack} channel={channel} />
        <View
          style={[
            styles.chatContainer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Chat client={chatClient} style={chatStyles}>
            <Channel
              channel={channel}
              doSendMessageRequest={async (cid, message) => {
                AsyncStorage.removeItem(`@slack-clone-draft-${channelId}`);
                setText('');
                return channel.sendMessage(message);
              }}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}>
              <MessageList
                Message={MessageSlack}
                DateSeparator={DateSeparator}
                onThreadSelect={thread => {
                  navigation.navigate('ThreadScreen', {
                    threadId: thread.id,
                    channelId: channel.id,
                  });
                }}
              />
              <MessageInput
                Input={InputBox}
                initialValue={initialValue}
                onChangeText={text => {
                  setText(text);
                }}
                additionalTextInputProps={{
                  placeholderTextColor: '#979A9A',
                  placeholder:
                    channel && channel.data.name
                      ? 'Message #' +
                        channel.data.name.toLowerCase().replace(' ', '_')
                      : 'Message',
                }}
              />
            </Channel>
          </Chat>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
