import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-react-native';

import {CustomKeyboardCompatibleView} from '../../components/CustomKeyboardCompatibleView';
import {InputBox} from '../../components/InputBox';
import {MessageAvatar} from '../../components/MessageAvatar';
import {MessageFooter} from '../../components/MessageFooter';
import {MessageHeader} from '../../components/MessageHeader';
import {MessageRepliesAvatars} from '../../components/MessageRepliesAvatars';
import {MessageText} from '../../components/MessageText';
import {ModalScreenHeader} from '../../components/ModalScreenHeader';
import {UrlPreview} from '../../components/UrlPreview';
import {getSupportedReactions} from '../../utils/supportedReactions';
import {UserSearch} from './UserSearch/UserSearch';

const styles = StyleSheet.create({
  channelScreenContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  chatContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
const supportedReactions = getSupportedReactions();
const getMessageInputPlaceholderText = (channel) => {
  channel && channel.data.name
    ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
    : 'Start a new message';
};

const getChannelUsingMembers = async (client, members) => {
  // Create a channel with selected users (as members)
  const newChannel = client.channel('messaging', {
    example: 'slack-demo',
    members,
    name: '',
  });
  await newChannel.watch();
};

export const NewMessageScreen = () => {
  const selectedUsers = useRef([]);
  const [channel, setChannel] = useState(null);
  const navigation = useNavigation();
  const {client: chatClient} = useChatContext();
  // eslint-disable-next-line no-unused-vars
  const [focusOnSearch, setFocusOnSearch] = useState(true);
  const {colors} = useTheme();

  const additionalTextInputProps = useMemo(
    () => ({
      /**
       * When message input is focused, switch to channel with selected members.
       */
      onFocus: async () => {
        setFocusOnSearch(false);
        const newChannel = await getChannelUsingMembers([
          ...selectedUsers.current.map((t) => t.id),
          chatClient.user.id,
        ]);
        setChannel(newChannel);
      },

      placeholder: getMessageInputPlaceholderText(channel),
      placeholderTextColor: colors.dimmedText,
    }),
    [channel],
  );

  /**
   * As soon as we send a message, navigate to ChannelScreen.
   *
   * @param {*} channelId
   * @param {*} message
   * @returns
   */
  const sendMessageAndNavigateToChannel = async (channelId, message) => {
    const res = await channel.sendMessage(message);
    navigation.navigate('ChannelScreen', {
      channelId: channel.id,
    });
    return res;
  };

  /**
   * Keep track of selected users, when user is remove or added to selected users.
   * @param {*} updatedUsers
   */
  const onUsersChange = (updatedUsers) => {
    selectedUsers.current = updatedUsers;
  };

  useEffect(() => {
    const dummyChannel = chatClient.channel('messaging', 'empty');

    // Channel component starts watching the channel, if its not initialized.
    // So this is kind of a ugly hack to trick it into believing that we have initialized the channel already,
    // so it won't make a call to channel.watch() internally.
    dummyChannel.initialized = true;
    setChannel(dummyChannel);
  }, [chatClient]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%',
      }}>
      <View style={styles.channelScreenContainer}>
        <ModalScreenHeader goBack={navigation.goBack} title='New Message' />
        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
          }}>
          <Channel
            additionalTextInputProps={additionalTextInputProps}
            channel={channel}
            doSendMessageRequest={sendMessageAndNavigateToChannel}
            forceAlignMessages={'left'}
            Input={InputBox}
            KeyboardCompatibleView={CustomKeyboardCompatibleView}
            MessageAvatar={MessageAvatar}
            MessageDeleted={() => null}
            MessageFooter={MessageFooter}
            MessageHeader={MessageHeader}
            MessageRepliesAvatars={MessageRepliesAvatars}
            MessageText={MessageText}
            onLongPressMessage={() => null}
            onPressInMessage={() => null}
            ReactionList={() => null}
            supportedReactions={supportedReactions}
            UrlPreview={UrlPreview}>
            <UserSearch
              onFocus={setFocusOnSearch.bind(null, true)}
              onUsersChange={onUsersChange}
            />
            {focusOnSearch && <MessageList />}
            <MessageInput />
          </Channel>
        </View>
      </View>
    </SafeAreaView>
  );
};
