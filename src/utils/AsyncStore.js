import AsyncStorage from '@react-native-community/async-storage';

import ChatClientStore from './ChatClientStore';

export default {
  flushGetRequests: () => AsyncStorage.flushGetRequests(),
  getAllKeys: () => AsyncStorage.getAllKeys(),
  getItem: async (key, defaultValue) => {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  },
  multiGet: (keys) => AsyncStorage.multiGet(keys),
  removeItem: (key) => AsyncStorage.removeItem(key),
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

const chatClient = ChatClientStore.client;

export const getChannelDraftKey = (channelId) =>
  `@slack-clone-draft-${chatClient.key}-${chatClient.user.id}-${channelId}`;

export const getUserDraftKey = () =>
  `@slack-clone-draft-${chatClient.key}-${chatClient.user.id}`;

export const getRecentSearchesKey = () =>
  `@slack-clone-recent-searches-${chatClient.key}-${chatClient.user.id}`;
