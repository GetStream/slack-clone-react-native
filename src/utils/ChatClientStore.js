import {API_KEY} from '@env';
import {StreamChat} from 'stream-chat';

export default {
  get client() {
    return StreamChat.getInstance(API_KEY, {
      timeout: 10000,
    });
  },
};
