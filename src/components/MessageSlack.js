import React from 'react';
import {MessageSimple} from 'stream-chat-react-native';
import {MessageFooter} from './MessageFooter';
import {MessageText} from './MessageText';
import {MessageAvatar} from './MessageAvatar';
import {MessageHeader} from './MessageHeader';
import {UrlPreview} from './UrlPreview';
import {Giphy} from './Giphy';

export const MessageSlack = props => {
  if (props.message.deleted_at) {
    return null;
  }
  return (
    <MessageSimple
      {...props}
      forceAlign="left"
      ReactionList={null}
      MessageAvatar={MessageAvatar}
      MessageHeader={MessageHeader}
      MessageFooter={MessageFooter}
      MessageText={MessageText}
      UrlPreview={UrlPreview}
      Giphy={Giphy}
    />
  );
};