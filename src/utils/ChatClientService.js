export default {
  client: null,
  setClient: client => (this.client = client),
  getClient: () => this.client,
};
