import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'stream-chat-react-native';

import {truncate} from '../utils';
import {MessageUserBar} from './MessageHeader';
import {SCText} from './SCText';

export const MessageTextWithContext = (props) => {
  const {message, renderText} = props;

  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <>
      {message.attachments.length === 0 && <MessageUserBar {...props} />}
      {message.show_in_channel && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThreadScreen', {
              channelId: message.cid.slice(message.cid.findIndex(':') + 1),
              threadId: message.parent_id,
            });
          }}
          style={{
            marginBottom: 10,
          }}>
          <SCText
            style={{
              color: colors.dimmedText,
            }}>
            replied to a thread:{' '}
            <SCText
              style={{
                color: colors.linkText,
              }}>
              {message.parentMessageText
                ? truncate(message.parentMessageText, 70, '...')
                : 'click to go'}
            </SCText>
          </SCText>
        </TouchableOpacity>
      )}
      {renderText({
        colors: Colors,
        markdownStyles: {
          // link: {
          //   color: 'blue',
          //   fontSize: 25,
          // },
          inlineCode: {
            color: 'red',
            fontWeight: '200',
          },

          mentions: {
            fontWeight: '700',
          },
          // unfortunately marginVertical doesn't override the defaults for these within the 3rd party lib
          paragraph: {
            marginBottom: 0,
            marginTop: 0,
          },

          paragraphCenter: {
            marginBottom: 0,
            marginTop: 0,
          },
          paragraphWithImage: {
            marginBottom: 0,
            marginTop: 0,
          },
          text: {
            color: colors.text,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          },
        },
        message,
      })}
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  const {message: prevMessage, onlyEmojis: prevOnlyEmojis} = prevProps;
  const {message: nextMessage, onlyEmojis: nextOnlyEmojis} = nextProps;

  const messageTextEqual = prevMessage.text === nextMessage.text;
  if (!messageTextEqual) return false;

  const onlyEmojisEqual = prevOnlyEmojis === nextOnlyEmojis;
  if (!onlyEmojisEqual) return false;

  const mentionedUsersEqual =
    prevMessage.mentioned_users?.length ===
      nextMessage.mentioned_users?.length &&
    (nextMessage.mentioned_users?.length === 0 ||
      (prevMessage.mentioned_users?.length &&
        nextMessage.mentioned_users?.length &&
        prevMessage.mentioned_users[0].name ===
          nextMessage.mentioned_users[0].name));
  if (!mentionedUsersEqual) return false;

  return true;
};

const MemoizedMessageTextContainer = React.memo(
  MessageTextWithContext,
  areEqual,
);

export const MessageText = (props) => {
  const {message, renderText} = props;

  return (
    <MemoizedMessageTextContainer message={message} renderText={renderText} />
  );
};
