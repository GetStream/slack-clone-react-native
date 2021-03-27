/* eslint-disable babel/no-invalid-this */
import ChatClientService from './ChatClientService';

export default {
  channels: [],
  directMessagingConversations: [],
  getChannels: () => this.channels,
  getDirectMessagingConversations: () => this.directMessagingConversations,
  getMembers: () => this.members,
  getOneToOneConversations: () => this.oneToOneConversations,
  getRecentConversations: () => this.recentConversations,
  loadRecentAndOneToOne: () => {
    const chatClient = ChatClientService.getClient();
    const memberIds = [];

    this.oneToOneConversations = this.directMessagingConversations.filter(
      (c) => {
        const memberLength = Object.keys(c.state.members).length;

        if (memberLength === 2) {
          const otherMember = Object.values(c.state.members).find(
            (m) => m.user.id !== chatClient.user.id,
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

        return false;
      },
    );
    this.recentConversations = [
      ...this.channels,
      ...this.directMessagingConversations,
    ];

    this.recentConversations.sort(
      (a, b) => a.state.last_message_at > b.state.last_message_at,
    );
  },
  members: [],
  oneToOneConversations: [],
  recentConversations: [],
  setChannels: (channels) => {
    this.channels = channels;
  },
  setDMConversations: (directMessagingConversations) => {
    this.directMessagingConversations = directMessagingConversations;
  },
};
