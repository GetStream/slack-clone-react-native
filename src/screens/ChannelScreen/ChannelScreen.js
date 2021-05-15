import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Channel,
  MessageInput,
  MessageList,
  MessageSimple,
  useMessageContext,
} from 'stream-chat-react-native';

import {CustomKeyboardCompatibleView} from '../../components/CustomKeyboardCompatibleView';
import {Gallery} from '../../components/Gallery';
import {Giphy} from '../../components/Giphy';
import {InlineDateSeparator} from '../../components/InlineDateSeparator';
import {InlineUnreadIndicator} from '../../components/InlineUnreadIndicator';
import {InputBox} from '../../components/InputBox';
import {MessageActionSheet} from '../../components/MessageActionSheet/MessageActionSheet';
import {MessageAvatar} from '../../components/MessageAvatar';
import {MessageFooter} from '../../components/MessageFooter';
import {MessageHeader} from '../../components/MessageHeader';
import {MessageRepliesAvatars} from '../../components/MessageRepliesAvatars';
import {MessageText} from '../../components/MessageText';
import {ReactionPickerActionSheet} from '../../components/ReactionPickerActionSheet/ReactionPickerActionSheet';
import {RenderNothing} from '../../components/RenderNothing';
import {UrlPreview} from '../../components/UrlPreview';
import {useDraftMessage} from '../../hooks/useDraftMessage';
import {ChatClientStore} from '../../utils';
import {supportedReactions} from '../../utils/supportedReactions';
import {ChannelHeader} from './ChannelHeader';

const styles = StyleSheet.create({
  channelScreenContainer: {flexDirection: 'column', height: '100%'},
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
  touchableOpacityStyle: {
    alignItems: 'center',
    backgroundColor: '#3F0E40',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 1,
    bottom: 80,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },
});

const MessageWithoutDeleted = (props) => {
  const {message} = useMessageContext();
  if (message.type === 'deleted') {
    return null;
  }
  return <MessageSimple {...props} />;
};

export const ChannelScreen = () => {
  const {colors} = useTheme();
  const {
    params: {channel: paramChannel, channelId = null, messageId = null},
  } = useRoute();
  const navigation = useNavigation();
  const chatClient = ChatClientStore.client;

  const [channel, setChannel] = useState(null);
  const [draftText, setDraftText] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [text, setText] = useState('');
  const [actionSheetData, setActionSheetData] = useState(null);
  const [reactionPickerData, setReactionPickerData] = useState(null);
  const actionSheetRef = useRef(null);
  const reactionPickerRef = useRef(null);
  const messageListRef = useRef(null);
  const {getDraftMessageText} = useDraftMessage(text, channel);

  const additionalTextInputProps = useMemo(
    () => ({
      placeholder:
        channel && channel.data.name
          ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
          : 'Message',
      placeholderTextColor: '#979A9A',
    }),
    [channel.id],
  );

  /**
   * When `openReactionPicker` is called from MessageFooter,
   * it will give you access to corresponding message.
   *
   * @param {*} toggleReactionHandler
   */
  const openReactionPicker = (message) => {
    setReactionPickerData({
      channel,
      message,
    });
    actionSheetRef.current?.dismiss();
    reactionPickerRef.current?.present();
  };

  const onChangeText = (text) => {
    setText(text);
  };

  /**
   * Open slack type actionsheet on long press.
   */
  const onLongPressMessage = ({actionHandlers, message}) => {
    setActionSheetData({
      actionHandlers,
      channelId: channel.id,
      message,
      openReactionPicker,
    });
    actionSheetRef.current?.present();
  };

  const openThread = (thread) => {
    navigation.navigate('ThreadScreen', {
      channelId: channel.id,
      threadId: thread.id,
    });
  };

  const renderMessageFooter = (props) => (
    <MessageFooter
      {...props}
      openReactionPicker={openReactionPicker}
      scrollToMessage={scrollToMessage}
    />
  );

  const scrollToMessage = (messageId) => {
    const messages = channel.state.messages;
    const indexOfParentInMessageList = messages?.findIndex(
      (message) => message?.id === messageId,
    );
    if (messageListRef.current) {
      /**
       * Since the flatlist is inverted, we need to calculate the index from most recent message
       */
      messageListRef.current.scrollToIndex({
        index: messages.length - indexOfParentInMessageList - 1,
      });
    }
  };
  const setFlatListRef = (ref) => {
    messageListRef.current = ref;
  };

  useEffect(() => {
    const init = async () => {
      if (!channelId && !paramChannel) {
        navigation.goBack();
        return;
      }

      if (paramChannel && paramChannel.initialized) {
        setChannel(paramChannel);
      } else {
        const newChannel = chatClient.channel('messaging', channelId);
        setChannel(newChannel);
      }

      const draft = await getDraftMessageText(channelId || paramChannel.id);

      if (!draft) {
        setIsReady(true);
        return;
      }

      setDraftText(draft);
      setText(draft);
      setIsReady(true);
    };

    init();
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
        <ChannelHeader channel={channel} goBack={navigation.goBack} />
        <View
          style={[
            styles.chatContainer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Channel
            additionalTextInputProps={additionalTextInputProps}
            animatedLongPress={false}
            channel={channel}
            DateHeader={RenderNothing}
            forceAlignMessages={'left'}
            Gallery={Gallery}
            Giphy={Giphy}
            initialScrollToFirstUnreadMessage
            initialValue={draftText}
            InlineDateSeparator={InlineDateSeparator}
            InlineUnreadIndicator={InlineUnreadIndicator}
            Input={InputBox}
            InputButtons={RenderNothing}
            KeyboardCompatibleView={CustomKeyboardCompatibleView}
            maxTimeBetweenGroupedMessages={4000}
            MessageAvatar={MessageAvatar}
            MessageDeleted={RenderNothing}
            MessageFooter={renderMessageFooter}
            MessageHeader={MessageHeader}
            messageId={messageId}
            MessageRepliesAvatars={MessageRepliesAvatars}
            MessageSimple={MessageWithoutDeleted}
            MessageText={MessageText}
            onChangeText={onChangeText}
            onLongPressMessage={onLongPressMessage}
            onPressInMessage={RenderNothing}
            ReactionList={RenderNothing}
            Reply={RenderNothing}
            ScrollToBottomButton={RenderNothing}
            supportedReactions={supportedReactions}
            UrlPreview={UrlPreview}>
            <MessageList
              onThreadSelect={openThread}
              setFlatListRef={setFlatListRef}
            />
            <MessageInput />
          </Channel>
          <MessageActionSheet {...actionSheetData} ref={actionSheetRef} />
          <ReactionPickerActionSheet
            {...reactionPickerData}
            ref={reactionPickerRef}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
