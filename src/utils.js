import React from 'react';
import {Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export const ChatClientService = {
  client: null,
  setClient: client => (this.client = client),
  getClient: () => this.client,
};

export const CacheService = {
  channels: [],
  getChannels: () => this.channels,
  directMessagingConversations: [],
  getDirectMessagingConversations: () => this.directMessagingConversations,
  oneToOneConversations: [],
  getOneToOneConversations: () => this.oneToOneConversations,
  recentConversations: [],
  getRecentConversations: () => this.recentConversations,
  members: [],
  initCache: (currentUser, channels, directMessagingConversations) => {
    this.channels = channels;
    this.directMessagingConversations = directMessagingConversations;
    const memberIds = [];
    this.oneToOneConversations = directMessagingConversations.filter(c => {
      const memberLength = Object.keys(c.state.members).length;

      if (memberLength === 2) {
        const otherMember = Object.values(c.state.members).find(
          m => m.user.id !== currentUser.id,
        );

        if (!this.members) {
          this.members = [];
        }

        if (memberIds.indexOf(otherMember.user.id) === -1) {
          memberIds.push(otherMember.user.id);
          this.members.push(otherMember.user);
        }

        return true;
      }
    });
    this.recentConversations = [
      ...this.channels,
      ...this.directMessagingConversations,
    ];

    this.recentConversations.sort((a, b) => {
      return a.state.last_message_at > b.state.last_message_at;
    });
  },
  getMembers: () => {
    return this.members;
  },
};

export const getChannelDisplayName = (channel, includePrefix = false) => {
  if (!channel) {
    return '#channel_name';
  }

  if (channel.name || (channel.data && channel.data.name)) {
    const name = channel.name || channel.data.name;
    return `${includePrefix ? '#' : ''} ${name
      .toLowerCase()
      .replace(' ', '_')}`;
  }

  if (!channel.state) {
    return 'Direct Messaging';
  }

  const chatClient = ChatClientService.getClient();
  const otherMembers = Object.values(channel.state.members).filter(
    m => m.user.id !== chatClient.user.id,
  );

  return otherMembers.map(m => m.user.name).join(', ');
};

export const getChannelDisplayImage = channel => {
  if (!channel) {
    return null;
  }

  if (channel.data.image) {
    return channel.data.image;
  }

  const chatClient = ChatClientService.getClient();
  const otherMembers = Object.values(channel.state.members).filter(
    m => m.user.id !== chatClient.user.id,
  );

  return otherMembers[0] && otherMembers[0].user.image;
};

export const AsyncStore = {
  getItem: async (key, defaultValue) => {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

export const addBorder = color => {
  return {
    borderColor: color || 'black',
    borderWidth: 1,
  };
};

export const SCText = props => {
  return (
    <Text
      style={{
        fontFamily: 'Lato-Regular',
        color: 'black',
        fontSize: 16,
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
};
