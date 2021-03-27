import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Colors,
  useChannelContext,
  useThreadContext,
} from 'stream-chat-react-native';

import {truncate} from '../utils';
import {MessageUserBar} from './MessageHeader';
import {SCText} from './SCText';

export const MessageText = (props) => {
  const {colors} = useTheme();
  const {message} = props;
  const {thread} = useThreadContext();
  const {channel} = useChannelContext();
  const navigation = useNavigation();
  return (
    <>
      {message.attachments.length === 0 && <MessageUserBar {...props} />}
      {message.show_in_channel && !thread && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThreadScreen', {
              channelId: channel.id,
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

      {props.renderText({
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
