import ChatClientStore from './ChatClientStore';

const chatClient = ChatClientStore.client;
export const getChannelDraftKey = (channelId) =>
  `@slack-clone-draft-${chatClient.key}-${chatClient.user.id}-${channelId}`;
export const getUserDraftKey = () =>
  `@slack-clone-draft-${chatClient.key}-${chatClient.user.id}`;
