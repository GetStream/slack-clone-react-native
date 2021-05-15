import React from 'react';
import {Alert} from 'react-native';

export {default as useStreamChatTheme} from './useStreamChatTheme';
export {default as ChannelsStore} from './ChannelsStore';
export {default as AsyncStore} from './AsyncStore';
export {default as ChatClientStore} from './ChatClientStore';
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

export const getFastImageCompatibleUri = (uri) =>
  uri !== null && uri !== undefined && uri.includes('/') && uri.includes('.')
    ? uri
    : '';

export const SlackAppContext = React.createContext();

export const HEADER_HEIGHT = 55;
