import ChatClientService from "./ChatClientService";

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
