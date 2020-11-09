import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';

import {ChannelHeader} from '../components/ChannelHeader';
import {DateSeparator} from '../components/DateSeparator';
import {InputBox} from '../components/InputBox';
import {MessageSlack} from '../components/MessageSlack';
import {
  getChannelDisplayImage,
  getChannelDisplayName,
  useStreamChatTheme,
  ChatClientService,
  AsyncStore,
} from '../utils';
import {CustomKeyboardCompatibleView} from '../components/CustomKeyboardCompatibleView';

export function ChannelScreen() {
  const {colors} = useTheme();
  const {
    params: {channelId = null},
  } = useRoute();
  const chatStyles = useStreamChatTheme();
  const navigation = useNavigation();
  const chatClient = ChatClientService.getClient();
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
    AsyncStore.setItem(
      `@slack-clone-draft-${chatClient.user.id}-${channelId}`,
      storeObject,
    );

    navigation.goBack();
  };

  useEffect(() => {
    const setDraftMessage = async () => {
      const draft = await AsyncStore.getItem(
        `@slack-clone-draft-${chatClient.user.id}-
        ${channelId}`,
        null,
      );

      if (!draft) {
        setIsReady(true);
        return;
      }

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
  }, [channelId]);

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
                AsyncStore.removeItem(`@slack-clone-draft-${channelId}`);
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
