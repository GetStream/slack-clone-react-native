import {theme, isDark} from './utils';

const streamChatTheme = () => {
  return {
    'messageList.dateSeparator.date': 'color: black;',
    'messageList.dateSeparator.container': 'margin-top: 10; margin-bottom: 5;',
    'message.avatarWrapper.spacer': 'height: 0;',
    'message.content.container':
      'flex: 1; align-items: stretch; max-width: 320px; padding-top: 0; border-radius: 0;',
    'message.content.textContainer': `align-self: stretch; padding-top: 0;margin-top: 0;border-color: ${
      isDark() ? '#1E1D21' : 'white'
    };width: 100%`,
    'message.container': 'margin-bottom: 0; margin-top: 0',
    'message.avatarWrapper.container': 'align-self: flex-start',
    'avatar.image': 'border-radius: 5px;',
    'message.card.container':
      'border-top-left-radius: 8px; border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px',
    'message.gallery.single':
      'border-top-left-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-left: 5px; width: 95%',
    'message.gallery.galleryContainer':
      'border-top-left-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-left: 5px; width: 95%',
    'message.replies.messageRepliesText': 'color: #0064c2',
    'message.content.markdown': {
      text: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: isDark() ? '#CECED2' : 'black',
      },
    },
  };
};

export default streamChatTheme;
