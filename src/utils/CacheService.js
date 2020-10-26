import ChatClientService from './ChatClientService';

export default {
  channels: [],
  getChannels: () => this.channels,
  directMessagingConversations: [],
  getDirectMessagingConversations: () => this.directMessagingConversations,
  oneToOneConversations: [],
  getOneToOneConversations: () => this.oneToOneConversations,
  recentConversations: [],
  getRecentConversations: () => this.recentConversations,
  members: [],
  setDirectMessagingConversations: directMessagingConversations => {
    this.directMessagingConversations = directMessagingConversations;
  },
  setChannels: channels => {
    this.channels = channels;
  },
  loadRecentAndOneToOne: () => {
    const chatClient = ChatClientService.getClient();
    const memberIds = [];

    this.oneToOneConversations = this.directMessagingConversations.filter(c => {
      const memberLength = Object.keys(c.state.members).length;

      if (memberLength === 2) {
        const otherMember = Object.values(c.state.members).find(
          m => m.user.id !== chatClient.user.id,
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
