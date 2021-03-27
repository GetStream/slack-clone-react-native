import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  Copy,
  CurveLineLeftUp,
  Delete,
  Edit,
  MessageFlag,
  Mute,
  ThreadReply,
} from 'stream-chat-react-native';

import {ChatClientService} from '../../utils';
import {ActionListContainer} from './ActionListContainer';

const snapPoints = [300, 500];
export const MessageActionSheet = React.forwardRef((props, fRef) => {
  const {
    actionHandlers,
    message,
    openReactionPicker: propMessageReactionPicker,
  } = props;

  const chatClient = ChatClientService.getClient();
  const navigation = useNavigation();

  const openReactionPicker = () => {
    propMessageReactionPicker(message);
  };

  const callHandlerAndDismissSheet = (handler, ...args) => {
    fRef.current?.dismiss();
    handler?.(...args);
  };

  const goToShareMessageScreen = () => {
    navigation.navigate('Modals', {
      params: {
        message,
      },
      screen: 'ShareMessageScreen',
    });
  };

  const options = useMemo(() => {
    const options = [];

    if (message) {
      if (message.user.id === chatClient.user.id) {
        options.push({
          Icon: Edit,
          handler: callHandlerAndDismissSheet.bind(
            null,
            actionHandlers.editMessage,
          ),
          id: 'edit',
          title: 'Edit Message',
        });
        options.push({
          Icon: Delete,
          handler: callHandlerAndDismissSheet.bind(
            null,
            actionHandlers.deleteMessage,
          ),
          id: 'delete',
          title: 'Delete message',
        });
      }

      options.push({
        Icon: Copy,
        handler: callHandlerAndDismissSheet.bind(
          null,
          actionHandlers.copyMessage,
        ),
        id: 'copy',
        title: 'Copy Text',
      });

      options.push({
        Icon: ThreadReply,
        handler: callHandlerAndDismissSheet.bind(null),
        id: 'threadReply',
        title: 'Reply in Thread',
      });

      options.push({
        Icon: CurveLineLeftUp,
        handler: callHandlerAndDismissSheet.bind(null, goToShareMessageScreen),
        id: 'reply',
        title: 'Share Message',
      });
      options.push({
        Icon: Mute,
        handler: callHandlerAndDismissSheet.bind(null),
        id: 'mute',
        title: 'Mute/Unmute User',
      });
      options.push({
        Icon: MessageFlag,
        handler: callHandlerAndDismissSheet.bind(null),
        id: 'flag',
        title: 'Flag Message',
      });
    }

    return options;
  }, [message]);

  const renderBackdrop = useCallback((props) => {
    const opacityStyle = useAnimatedStyle(
      () => ({
        // 896 - max height of bottom sheet
        opacity: (800 - props.animatedPosition.value) / 896,
      }),
      [],
    );

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: '#000000',
            borderWidth: 1,
          },
          opacityStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            fRef.current?.dismiss();
          }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>
    );
  }, []);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={fRef}
      snapPoints={snapPoints}>
      <ActionListContainer
        actions={options}
        openReactionPicker={openReactionPicker}
        toggleReaction={callHandlerAndDismissSheet.bind(
          null,
          actionHandlers?.toggleReaction,
        )}
      />
    </BottomSheetModal>
  );
});

MessageActionSheet.displayName = 'messageActionSheet';
