// For details about these configs, please check:
// https://github.com/GetStream/stream-chat-test-data-cli/blob/master/config.js.template
module.exports = {
  // ============================================================================
  //          Set your API key and secret here
  // ============================================================================

  apiKey: '',
  secret: '',

  // ============================================================================
  // ============================================================================

  baseUrl: 'https://chat-us-east-1.stream-io-api.com',
  channelType: 'messaging',
  serverSideUser: 'vishal',
  channelIdPrefix: 'slack-clone',

  customProperties: {
    name: ''
  },
  appUsers: [
    {
      id: 'vishal',
      name: 'Vishal Narkhede',
      image: 'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-dae0b1606590-512',
    },
    {
      id: 'lucas',
      name: 'Lucas Correia',
      image: 'https://ca.slack-edge.com/T02RM6X6B-U01SY0N0S59-c8e4c3e01368-512',
    },
    {
      id: 'tommaso',
      name: 'Tommaso Barbugli',
      image: 'https://ca.slack-edge.com/T02RM6X6B-U02U7SJP4-0f65a5997877-512',
    },
    {
      id: 'neil',
      name: 'Neil',
      image: 'https://ca.slack-edge.com/T02RM6X6B-U01173D1D5J-0dead6eea6ea-512',
    },
    {
      id: 'nick',
      name: 'Nick Parson',
      image: 'https://ca.slack-edge.com/T02RM6X6B-U10BF2R9R-2e7377522518-512',
    },
    {
      id: 'thierry',
      name: 'Thierry Schellenbach',
      image: 'https://ca.slack-edge.com/T02RM6X6B-U02RM6X6D-g28a1278a98e-512',
    },
    {
      id: 'ben',
      name: 'Ben Golden',
      image: 'https://ca.slack-edge.com/T02RM6X6B-U01AXAF23MG-f57403a3cb0d-512',
    },
  ],
  createUsers: true,
  numberOfGroupChannel: 10,
  createOneToOneConversations: true,
  channelNames: [],

  numberOfMessagesPerChannel: 20,
  maxNumberOfAttachmentsPerMessage: 6,
  attachmentFrequency: 10,
  urlFrequency: 7,
  reactionFrequency: 4,
  threadReplyFrequency: 5,
  truncateBeforeAddingNewMessages: true,
  reactions: ['like', 'love', 'haha', 'wow', 'sad'],
  urls: [
    'https://www.youtube.com/watch?v=ceGLEhahLKQ',
    'https://reactnative.dev/',
    'https://shorturl.at/hmyKM',
    'https://www.youtube.com/watch?v=3oGLuM_--Uo&t=13s',
    'https://shorturl.at/mBUY7',
    'https://github.com/GetStream/slack-clone-react-native/',
    'https://www.youtube.com/watch?v=tQ7T530Q7aU',
  ],
  language: 'en',
};
