import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {SVGIcon} from './SVGIcon';
import {useTheme} from '@react-navigation/native';
import {ReactionPicker} from './ReactionPicker';

export const MessageFooter = props => {
  const {dark} = useTheme();
  const {openReactionPicker} = props;
  return (
    <View style={styles.reactionListContainer}>
      {props.message.latest_reactions &&
        props.message.latest_reactions.length > 0 &&
        renderReactions(
          props.message.latest_reactions,
          props.message.own_reactions,
          props.supportedReactions,
          props.message.reaction_counts,
          props.handleReaction,
        )}

      <ReactionPicker {...props} />

      {props.message.latest_reactions &&
        props.message.latest_reactions.length > 0 && (
          <TouchableOpacity
            onPress={openReactionPicker}
            style={[
              styles.reactionPickerContainer,
              {
                backgroundColor: dark ? '#313538' : '#F0F0F0',
              },
            ]}>
            <SVGIcon height="18" width="18" type="emoji" />
          </TouchableOpacity>
        )}
    </View>
  );
};

export const renderReactions = (
  reactions,
  ownReactions = [],
  supportedReactions,
  reactionCounts,
  handleReaction,
) => {
  const reactionsByType = {};
  const ownReactionTypes = ownReactions.map(or => or.type);
  reactions &&
    reactions.forEach(item => {
      if (reactions[item.type] === undefined) {
        return (reactionsByType[item.type] = [item]);
      } else {
        return (reactionsByType[item.type] = [
          ...(reactionsByType[item.type] || []),
          item,
        ]);
      }
    });

  const emojiDataByType = {};
  supportedReactions.forEach(e => (emojiDataByType[e.id] = e));

  const reactionTypes = supportedReactions.map(e => e.id);
  return Object.keys(reactionsByType).map((type, index) =>
    reactionTypes.indexOf(type) > -1 ? (
      <ReactionItem
        key={index}
        type={type}
        handleReaction={handleReaction}
        reactionCounts={reactionCounts}
        emojiDataByType={emojiDataByType}
        ownReactionTypes={ownReactionTypes}
      />
    ) : null,
  );
};

const ReactionItem = ({
  type,
  handleReaction,
  reactionCounts,
  emojiDataByType,
  ownReactionTypes,
}) => {
  const {dark} = useTheme();
  const isOwnReaction = ownReactionTypes.indexOf(type) > -1;
  return (
    <TouchableOpacity
      onPress={() => {
        handleReaction(type);
      }}
      key={type}
      style={[
        styles.reactionItemContainer,
        {
          borderColor: dark
            ? isOwnReaction
              ? '#313538'
              : '#1E1D21'
            : isOwnReaction
            ? '#0064e2'
            : 'transparent',
          backgroundColor: dark
            ? isOwnReaction
              ? '#194B8A'
              : '#1E1D21'
            : isOwnReaction
            ? '#d6ebff'
            : '#F0F0F0',
        },
      ]}>
      <Text
        style={[
          styles.reactionItem,
          {
            color: dark ? '#CFD4D2' : '#0064c2',
          },
        ]}>
        {emojiDataByType[type].icon} {reactionCounts[type]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reactionListContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  reactionItemContainer: {
    borderWidth: 1,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 17,
    marginRight: 6,
    marginTop: 5,
  },
  reactionItem: {
    fontSize: 16,
  },
  reactionPickerContainer: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 6,
    borderRadius: 10,
  },
  reactionPickerIcon: {
    width: 19,
    height: 19,
  },
});
