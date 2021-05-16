import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useChannelContext, useMessageContext} from 'stream-chat-react-native';

import {Reply} from './Reply';
import {SlackReactionList} from './SlackReactionList/SlackReactionList';

const styles = StyleSheet.create({
  reactionListContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginTop: 5,
  },
  reactionPickerContainer: {
    borderRadius: 10,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 6,
  },
});

const MessageFooterWithContext = React.memo((props) => {
  const {
    channel,
    loadChannelAtMessage,
    message,
    openReactionPicker: propOpenReactionPicker,
    scrollToMessage,
    setTargetedMessage,
  } = props;

  const navigation = useNavigation();
  const {colors} = useTheme();
  const messageId = message?.id;

  const goToMessage = (message) => {
    if (channel.cid === message.cid) {
      try {
        scrollToMessage(message.id);
        setTargetedMessage(message.id);
      } catch (_) {
        /**
         * scrollToMessage will fail if parent message is not within the windowSize of FlatList
         * In that case simply reload the channel at given message.
         */
        loadChannelAtMessage({messageId: message.id});
      }
    } else {
      navigation.setParams({
        // cid -> `${channelType}:${channelId}`
        channelId: message.cid.replace('messaging:', ''),
        messageId,
      });
    }
  };

  const openReactionPicker = useCallback(() => {
    propOpenReactionPicker(message);
  }, [messageId]);

  return (
    <View style={styles.reactionListContainer}>
      <View
        style={{
          borderLeftColor: colors.borderThick,
          borderLeftWidth: 5,
        }}>
        <Reply
          message={message.parent_shared_message}
          onPress={() => goToMessage(message.parent_shared_message)}
        />
      </View>
      <SlackReactionList openReactionPicker={openReactionPicker} />
    </View>
  );
});

export const MessageFooter = (props) => {
  const {openReactionPicker, scrollToMessage} = props;
  const {
    channel,
    loadChannelAtMessage,
    setTargetedMessage,
  } = useChannelContext();

  const {message} = useMessageContext();

  return (
    <MessageFooterWithContext
      channel={channel}
      loadChannelAtMessage={loadChannelAtMessage}
      message={message}
      openReactionPicker={openReactionPicker}
      scrollToMessage={scrollToMessage}
      setTargetedMessage={setTargetedMessage}
    />
  );
};
