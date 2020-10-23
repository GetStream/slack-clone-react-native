import React from 'react';
import {Alert} from 'react-native';

export {default as useStreamChatTheme} from './useStreamChatTheme';
export {default as ChatClientService} from './ChatClientService';
export {default as CacheService} from './CacheService';
export {default as AsyncStore} from './AsyncStore';
export {getChannelDisplayImage, getChannelDisplayName} from './ChannelUtils';
export {USERS, USER_TOKENS} from './ChatUsers';

export const notImplemented = () => {
  Alert.alert('This feature has not been implementd');
};

export const truncate = (input, length, end = '...') => {
  if (input.length > length) {
    return `${input.substring(0, length - end.length)}${end}`;
  }
  return input;
};

export const ChatUserContext = React.createContext();
