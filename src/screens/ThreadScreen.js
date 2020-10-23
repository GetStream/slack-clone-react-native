import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Platform, StyleSheet} from 'react-native';
import {
  Chat,
  Channel,
  KeyboardCompatibleView,
  Thread,
  Message as DefaultMessage,
} from 'stream-chat-react-native';

import {useNavigation, useTheme} from '@react-navigation/native';

import {MessageSlack} from '../components/MessageSlack';
import {
  getChannelDisplayName,
  useStreamChatTheme,
  ChatClientService,
  SCText,
  truncate,
} from '../utils';
import {ModalScreenHeader} from '../components/ModalScreenHeader';
import {InputBoxThread} from '../components/InputBoxThread';
import {SVGIcon} from '../components/SVGIcon';

const CustomKeyboardCompatibleView = ({children}) => (
  <KeyboardCompatibleView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : -200}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
    {children}
  </KeyboardCompatibleView>
);
export function ThreadScreen({
  route: {
    params: {channelId = null, threadId = null},
  },
}) {
  const {colors} = useTheme();
  const chatStyles = useStreamChatTheme();
  const chatClient = ChatClientService.getClient();
  const navigation = useNavigation();

  const [channel, setChannel] = useState(null);
  const [thread, setThread] = useState();
  const [sendMessageInChannel, setSendMessageInChannel] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getThread = async () => {
      const res = await chatClient.getMessage(threadId);
      setThread(res.message);
    };

    getThread();
  }, [chatClient, threadId]);

  useEffect(() => {
    if (!channelId) {
      navigation.goBack();
    } else {
      const _channel = chatClient.channel('messaging', channelId);
      setChannel(_channel);
      setIsReady(true);
    }
  }, [chatClient, channelId, threadId]);

  if (!isReady || !thread) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View style={styles.channelScreenContainer}>
        <ModalScreenHeader
          title={'Thread'}
          goBack={goBack}
          subTitle={truncate(getChannelDisplayName(channel, true), 35)}
        />
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
              thread={thread}
              doSendMessageRequest={async (cid, message) => {
                const newMessage = {
                  ...message,
                  show_in_channel: sendMessageInChannel,
                  parentMessageText: sendMessageInChannel
                    ? thread.text
                    : undefined,
                };
                return channel.sendMessage(newMessage);
              }}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}>
              <Thread
                additionalMessageInputProps={{
                  Input: props => (
                    <InputBoxThread
                      {...props}
                      setSendMessageInChannel={setSendMessageInChannel}
                    />
                  ),
                  additionalTextInputProps: {
                    placeholderTextColor: '#979A9A',
                    placeholder:
                      channel && channel.data.name
                        ? 'Message #' +
                          channel.data.name.toLowerCase().replace(' ', '_')
                        : 'Message',
                  },
                }}
                additionalMessageListProps={{
                  Message: MessageSlack,
                  DateSeparator: () => null,
                  HeaderComponent: () => {
                    return (
                      <>
                        <DefaultMessage
                          groupStyles={['single']}
                          message={thread}
                          Message={MessageSlack}
                          threadList
                        />
                        <View
                          style={[
                            styles.threadHeaderSeparator,
                            {
                              backgroundColor: colors.background,
                              borderTopColor: colors.border,
                              borderBottomColor: colors.border,
                            },
                          ]}>
                          {thread.reply_count > 0 ? (
                            <SCText>{thread.reply_count} replies</SCText>
                          ) : (
                            <View
                              style={styles.emptyThreadHeaderSeparatorContent}>
                              <SVGIcon type="threads" height="15" width="15" />
                              <SCText style={{marginLeft: 10}}>
                                reply in thread
                              </SCText>
                            </View>
                          )}
                        </View>
                      </>
                    );
                  },
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
  threadHeaderSeparator: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  emptyThreadHeaderSeparatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
