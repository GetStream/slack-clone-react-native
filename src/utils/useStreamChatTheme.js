import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {vw} from 'stream-chat-react-native';

const maxWidth = vw(100) - 72;
const avatarSize = 40;
export default () => {
  const {colors} = useTheme();
  const getChatStyle = () => ({
    avatar: {
      container: {
        borderRadius: 7,
        height: avatarSize,
        width: avatarSize,
      },
      image: {
        borderRadius: 0,
        height: avatarSize,
        width: avatarSize,
      },
      imageContainer: {},
    },
    messageSimple: {
      avatarWrapper: {
        spacer: {
          height: 0,
          width: avatarSize,
        },
      },
      card: {
        container: {
          width: maxWidth,
        },
      },
      container: {
        alignItems: 'flex-start',
        marginBottom: 0,
      },
      content: {
        container: {
          borderWidth: 0,
          paddingTop: 0,
          width: maxWidth,
        },
        containerInner: {
          backgroundColor: colors.white,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderWidth: 0,
          marginLeft: 0,
        },
        deletedContainerInner: {
          borderWidth: 0,
        },
        textContainer: {
          borderWidth: 0,
          marginLeft: 0,
          maxWidth,
          paddingHorizontal: 3,
          width: maxWidth,
        },
        wrapper: {width: maxWidth},
      },
      gallery: {
        galleryContainer: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        galleryItemColumn: {
          flexDirection: 'row',
        },
        image: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: 50,
          width: 50,
        },
        imageContainer: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: 50,
          width: 50,
        },
      },
      giphy: {
        container: {
          width: maxWidth,
        },
      },
    },
    // Override reply so the reuse of message style does not overflow text in the message input
    reply: {
      textContainer: {
        maxWidth: undefined,
        width: undefined,
      },
    },
  });
  // return {
  //   'loadingIndicator.loadingText': `color: ${colors.text}`,
  //   'messageList.dateSeparator.date': 'color: black;',
  //   'messageInput.container': `border-top-color: #979A9A; border-top-width: 0.4px; backgroundColor: ${
  //     colors.background
  //   }; margin: 0; border-radius: 0;`,
  //   'messageInput.sendButtonIcon': 'height: 20px; width: 20px;',
  //   'messageInput.attachButtonIcon': 'height: 20px; width: 20px;',
  //   'messageInput.inputBox': `font-size: 15px; color: ${colors.text}`,
  //   'messageInput.fileUploadPreview.filenameText': `color: ${colors.text}`,
  //   'messageInput.fileUploadPreview.attachmentContainerView': `border-color: ${
  //     colors.border
  //   }`,
  //   'messageInput.suggestions.container': `background-color: ${
  //     colors.background
  //   }`,
  //   'messageInput.suggestions.mention.name': `color: ${colors.text}`,
  //   'messageInput.suggestions.title': `color: ${colors.text}`,
  //   'messageInput.suggestions.command.title': `color: ${colors.text}`,
  //   'messageInput.suggestions.command.args': `color: ${colors.text}`,
  //   'messageInput.suggestions.command.description': `color: ${colors.text}`,
  //   'thread.newThread': 'display: none',
  //   'messageList.dateSeparator.container':
  //     'margin-top: 10; margin-bottom: 5;',
  //   'messageList.typingIndicatorContainer': 'height: 30',
  //   'typingIndicator.container': `backgroundColor: ${colors.background};`,
  //   'typingIndicator.text': `color: ${colors.text};font-size: 12px`,
  //   'message.file.container': `background-color: ${
  //     colors.background
  //   }; border-color: ${colors.border}; border-width: 1px`,
  //   'message.file.title': `color: ${colors.text}`,
  //   'message.file.size': `color: ${colors.text}`,
  //   'message.reactionPicker.container': 'justify-content: flex-end;',
  //   'message.reactionPicker.containerView':
  //     'width: 100%; height: 100px; flex-wrap: wrap; border-radius: 0; padding-bottom: 20px;',
  //   'message.reactionPicker.emoji': 'font-size: 30px;margin: 5px;',
  //   'message.avatarWrapper.spacer': 'height: 0;',
  //   'message.content.container':
  //     'flex: 1; align-items: stretch; max-width: 320px; padding-top: 0; border-radius: 0;',
  //   'message.content.textContainer':
  //     'align-self: stretch; padding-top: 0;margin-top: 0;border-color: transparent;width: 100%',
  //   'message.container': 'margin-bottom: 0; margin-top: 0',
  //   'message.avatarWrapper.container': 'align-self: flex-start',
  //   'avatar.image': 'border-radius: 5px;',
  //   'message.card.container':
  //     'border-top-left-radius: 8px; border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px',
  //   'message.gallery.single':
  //     'border-top-left-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-left: 5px; width: 95%',
  //   'message.gallery.galleryContainer':
  //     'border-top-left-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-left: 5px; width: 95%',
  //   'message.replies.messageRepliesText': 'color: #0064c2',
  // };
  const [chatStyle, setChatStyle] = useState(getChatStyle());

  useEffect(() => {
    setChatStyle(getChatStyle());
  }, [colors]);

  return chatStyle;
};
