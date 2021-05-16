import {ChatClientStore} from './ChatClientStore';

const chatClient = ChatClientStore.client;

export const getChannelDisplayName = (
  channel,
  includeChannelPrefix = false,
  includeUserStatus = true,
) => {
  if (!channel) {
    return '#channel_name';
  }

  if (channel.name || (channel.data && channel.data.name)) {
    const name = channel.name || channel.data.name;
    return `${includeChannelPrefix ? '#' : ''} ${name
      .toLowerCase()
      .replace(' ', '_')}`;
  }

  if (!channel.state) {
    return 'Direct Messaging';
  }

  const otherMembers = Object.values(channel.state.members).filter(
    (m) => m.user.id !== chatClient.user.id,
  );

  if (otherMembers.length === 1) {
    return `${otherMembers[0].user.name || otherMembers[0].user.id}  ${
      includeUserStatus && otherMembers[0].user.status
        ? otherMembers[0].user.status
        : ''
    }`;
  }
  return otherMembers.map((m) => m.user.name).join(', ');
};

export const getChannelDisplayImage = (channel) => {
  if (!channel) {
    return null;
  }

  if (channel.data.image) {
    return channel.data.image;
  }

  const otherMembers = Object.values(channel.state.members).filter(
    (m) => m.user.id !== chatClient.user.id,
  );

  return otherMembers[0] && otherMembers[0].user.image;
};
