/* eslint-disable react/display-name */
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {useMessageReactions} from '../../hooks/useMessageReactions';
import {EmojiList} from './EmojiList';

const snapPoints = [300, 600];

export const ReactionPickerActionSheet = React.forwardRef((props, fRef) => {
  const {channel, message} = props;
  const {toggleReaction} = useMessageReactions(channel, message);
  const toggleReactionAndDismiss = (reactionType) => {
    fRef.current?.dismiss();
    toggleReaction(reactionType);
  };
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
          {backgroundColor: '#000000'},
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
      snapPoints={snapPoints}
      stackBehavior={'replace'}>
      <EmojiList toggleReaction={toggleReactionAndDismiss} />
    </BottomSheetModal>
  );
});
