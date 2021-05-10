/* eslint-disable sort-keys-fix/sort-keys-fix */
export default {
  oneToOneConversations: [],
  recentConversations: [],
  _channels: [],

  set channels(channels) {
    this._channels = channels;
    this.loadRecentAndOneToOne();
  },

  get channels() {
    return this._channels || [];
  },

  set dmConversations(dmConversations) {
    this.dms = dmConversations;
    this.loadRecentAndOneToOne();
  },

  get dmConversations() {
    return this.dms || [];
  },

  loadRecentAndOneToOne() {
    this.oneToOneConversations = this.dmConversations.filter((c) => {
      const memberLength = Object.keys(c.state.members).length;

      if (memberLength === 2) {
        return true;
      }

      return false;
    });
    this.recentConversations = [...this.channels, ...this.dmConversations];

    this.recentConversations.sort(
      (a, b) => a.state.last_message_at > b.state.last_message_at,
    );
  },
};
