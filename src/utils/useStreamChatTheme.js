import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native-appearance';
import {vw} from 'stream-chat-react-native';

const maxWidth = vw(100) - 72;
const avatarSize = 40;

export default () => {
  const {colors: slackColors} = useTheme();
  const colorScheme = useColorScheme();
  const streamColors =
    colorScheme === 'dark'
      ? {
          accent_blue: '#005FFF',
          accent_green: '#20E070',
          accent_red: '#FF3742',
          bg_gradient_end: '#101214',
          bg_gradient_start: '#070A0D',
          black: '#FFFFFF',
          blue_alice: '#00193D',
          border: '#141924',
          grey: '#7A7A7A',
          grey_gainsboro: '#2D2F2F',
          grey_whisper: '#1C1E22',
          icon_background: '#FFFFFF',
          modal_shadow: '#000000',
          overlay: '#00000066', // 66 = 40% opacity
          overlay_dark: '#FFFFFFCC', // CC = 80% opacity
          shadow_icon: '#00000080', // 80 = 50% opacity
          targetedMessageBackground: '#302D22',
          transparent: 'transparent',
          white: slackColors.background,
          white_smoke: '#13151B',
          white_snow: slackColors.background,
        }
      : {
          accent_blue: '#005FFF',
          accent_green: '#20E070',
          accent_red: '#FF3742',
          bg_gradient_end: '#F7F7F7',
          bg_gradient_start: '#FCFCFC',
          black: '#000000',
          blue_alice: '#E9F2FF',
          border: '#00000014', // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
          grey: '#7A7A7A',
          grey_gainsboro: '#DBDBDB',
          grey_whisper: '#ECEBEB',
          icon_background: '#FFFFFF',
          modal_shadow: '#00000099', // 99 = 60% opacity; x=0, y= 1, radius=4
          overlay: '#00000033', // 33 = 20% opacity
          overlay_dark: '#00000099', // 99 = 60% opacity
          shadow_icon: '#00000040', // 40 = 25% opacity; x=0, y=0, radius=4
          targetedMessageBackground: '#FBF4DD', // dark mode = #302D22
          transparent: 'transparent',
          white: slackColors.background,
          white_smoke: '#F2F2F2',
          white_snow: slackColors.background,
        };

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
    colors: streamColors,
    messageInput: {
      container: {
        borderWidth: 0,
        padding: 0,
      },
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
          backgroundColor: streamColors.white_snow,
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
        replyContainer: {
          borderWidth: 0,
          height: 0,
          paddingTop: 0,
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
  const [chatStyle, setChatStyle] = useState(getChatStyle());

  useEffect(() => {
    setChatStyle(getChatStyle());
  }, [slackColors]);

  return chatStyle;
};
