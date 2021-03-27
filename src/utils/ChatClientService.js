/* eslint-disable babel/no-invalid-this */
export default {
  client: null,
  getClient: () => this.client,
  setClient: (client) => (this.client = client),
};
