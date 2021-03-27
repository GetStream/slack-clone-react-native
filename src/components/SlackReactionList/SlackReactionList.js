import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useChannelContext, useMessageContext} from 'stream-chat-react-native';

import {useMessageReactions} from '../../hooks/useMessageReactions';
import {supportedReactionsByType} from '../../utils/supportedReactions';
import {SVGIcon} from '../SVGIcon';
import {ReactionItem} from './ReactionItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reactionPickerContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export const SlackReactionList = (props) => {
  const {openReactionPicker} = props;
  const {channel} = useChannelContext();
  const {message} = useMessageContext();
  const {dark} = useTheme();

  const {
    ownReactionTypes,
    reactionCounts,
    reactionsByType,
    toggleReaction,
  } = useMessageReactions(channel, message);

  if (!reactionsByType || Object.keys(reactionsByType).length === 0) {
    return null;
  }

  const renderReactionItem = (type) => {
    const Icon = supportedReactionsByType[type].Icon;
    const count = reactionCounts[type];
    const isOwnReaction = ownReactionTypes.indexOf(type) > -1;

    return (
      <ReactionItem
        count={count}
        Icon={Icon}
        isOwnReaction={isOwnReaction}
        key={type}
        onPress={() => toggleReaction(type)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {Object.keys(reactionsByType).map(renderReactionItem)}
      <TouchableOpacity
        onPress={openReactionPicker}
        style={[
          styles.reactionPickerContainer,
          {
            backgroundColor: dark ? '#313538' : '#F0F0F0',
          },
        ]}>
        <SVGIcon height='18' type='emoji' width='18' />
      </TouchableOpacity>
    </View>
  );
};
