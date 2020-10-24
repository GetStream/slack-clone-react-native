import React from 'react';
import {MessageSimple} from 'stream-chat-react-native';
import {MessageFooter} from './MessageFooter';
import {MessageText} from './MessageText';
import {MessageAvatar} from './MessageAvatar';
import {MessageHeader} from './MessageHeader';
import {UrlPreview} from './UrlPreview';
import {Giphy} from './Giphy';
import {MessageActionSheet} from './MessageActionSheet';
import ReactNativeHaptic from 'react-native-haptic';

export const MessageSlack = props => {
  if (props.message.deleted_at) {
    return null;
  }
  return (
    <MessageSimple
      {...props}
      forceAlign="left"
      ReactionList={null}
      onLongPress={() => {
        ReactNativeHaptic.generate('impact');
        props.showActionSheet();
      }}
      ActionSheet={MessageActionSheet}
      MessageAvatar={MessageAvatar}
      MessageHeader={MessageHeader}
      MessageFooter={MessageFooter}
      MessageText={MessageText}
      UrlPreview={UrlPreview}
      Giphy={Giphy}
      supportedReactions={[
        {
          icon: '👍',
          id: 'like',
        },
        {
          icon: '❤️️',
          id: 'love',
        },
        {
          icon: '😂',
          id: 'haha',
        },
        {
          icon: '😮',
          id: 'wow',
        },
        {
          icon: '😔',
          id: 'sad',
        },
        {
          icon: '😠',
          id: 'angry',
        },
        {
          id: 'e1',
          icon: '😆',
        },
        {
          id: 'e2',
          icon: '😅',
        },
        {
          id: 'e3',
          icon: '😂',
        },
        {
          id: 'e4',
          icon: '🤣',
        },
        {
          id: 'e5',
          icon: '☺️',
        },
        {
          id: 'e6',
          icon: '😊',
        },
        {
          id: 'e7',
          icon: '😇',
        },
        {
          id: 'e8',
          icon: '🙂',
        },
        {
          id: 'e9',
          icon: '🙃',
        },
        {
          id: 'e10',
          icon: '😉',
        },
        {
          id: 'e11',
          icon: '😌',
        },
        {
          id: 'e12',
          icon: '😍',
        },
        {
          id: 'e13',
          icon: '🥰',
        },
        {
          id: 'e14',
          icon: '😘',
        },
        {
          id: 'e15',
          icon: '😗',
        },
        {
          id: 'e16',
          icon: '😙',
        },
        {
          id: 'e17',
          icon: '😚',
        },
        {
          id: 'e18',
          icon: '😋',
        },
        {
          id: 'e19',
          icon: '😛',
        },
        {
          id: 'e20',
          icon: '😝',
        },
        {
          id: 'e21',
          icon: '😜',
        },
        {
          id: 'e22',
          icon: '🤪',
        },
        {
          id: 'e23',
          icon: '🤨',
        },
        {
          id: 'e24',
          icon: '🧐',
        },
        {
          id: 'e25',
          icon: '🤓',
        },
        {
          id: 'e26',
          icon: '😎',
        },
        {
          id: 'e27',
          icon: '🤩',
        },
        {
          id: 'e28',
          icon: '🥳',
        },
        {
          id: 'e29',
          icon: '😏',
        },
        {
          id: 'e30',
          icon: '😒',
        },
      ]}
    />
  );
};
