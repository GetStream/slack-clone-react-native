import React, {useEffect, useState} from 'react';
import {Alert, Text, Appearance} from 'react-native';
import {useTheme} from '@react-navigation/native';

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
    this.directMessagingConversations = [...directMessagingConversations];
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
          this.members.push({...otherMember.user, channelId: c.id});
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

  if (otherMembers.length === 1) {
    return `${otherMembers[0].user.name}  ${
      otherMembers[0].user.status ? otherMembers[0].user.status : ''
    }`;
  }
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
  const {colors} = useTheme();
  const style = Array.isArray(props.style)
    ? [
        {
          fontFamily: 'Lato-Regular',
          color: colors.text,
          fontSize: 16,
        },
        ...props.style,
      ]
    : {
        fontFamily: 'Lato-Regular',
        color: colors.text,
        fontSize: 16,
        ...props.style,
      };
  return <Text style={style}>{props.children}</Text>;
};

const colorScheme = Appearance.getColorScheme();

export const theme = {
  dark: Appearance.getColorScheme() === 'dark',
};
export const isDark = () => Appearance.getColorScheme() === 'dark';

export const useStreamChatTheme = () => {
  const {colors} = useTheme();
  const getChatStyle = () => {
    return {
      'messageList.dateSeparator.date': 'color: black;',
      'messageInput.container': `border-top-color: #979A9A; border-top-width: 0.4px; backgroundColor: ${
        colors.background
      }; margin: 0; border-radius: 0;`,
      'messageInput.sendButtonIcon': 'height: 20px; width: 20px;',
      'messageInput.attachButtonIcon': 'height: 20px; width: 20px;',
      'messageInput.inputBox': `font-size: 15px; color: ${colors.text}`,
      'thread.newThread': 'display: none',
      'messageList.dateSeparator.container':
        'margin-top: 10; margin-bottom: 5;',
      'typingIndicator.text': `color: ${colors.text};`,
      'message.avatarWrapper.spacer': 'height: 0;',
      'message.content.container':
        'flex: 1; align-items: stretch; max-width: 320px; padding-top: 0; border-radius: 0;',
      'message.content.textContainer':
        'align-self: stretch; padding-top: 0;margin-top: 0;border-color: transparent;width: 100%',
      'message.container': 'margin-bottom: 0; margin-top: 0',
      'message.avatarWrapper.container': 'align-self: flex-start',
      'avatar.image': 'border-radius: 5px;',
      'message.card.container':
        'border-top-left-radius: 8px; border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px',
      'message.gallery.single':
        'border-top-left-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-left: 5px; width: 95%',
      'message.gallery.galleryContainer':
        'border-top-left-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-left: 5px; width: 95%',
      'message.replies.messageRepliesText': 'color: #0064c2',
      'message.content.markdown': {
        text: {
          fontSize: 16,
          fontFamily: 'Lato-Regular',
          color: colors.text,
        },
      },
    };
  };
  const [chatStyle, setChatStyle] = useState(getChatStyle());

  useEffect(() => {
    setChatStyle(getChatStyle());
  }, [colors]);

  return chatStyle;
};

export const notImplemented = () => {
  Alert.alert('This feature has not been implementd');
};

export const truncate = (input, length, end = '...') => {
  if (input.length > length) {
    return `${input.substring(0, length - end.length)}${end}`;
  }
  return input;
};
