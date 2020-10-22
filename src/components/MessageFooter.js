import React from 'react';
import {ReactionPickerWrapper} from 'stream-chat-react-native';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import iconEmoticon from '../images/icon-emoticon.png';
import {theme, isDark} from '../utils';
import {SVGIcon} from './SVGIcon';
import {useTheme} from '@react-navigation/native';

export const MessageFooter = props => {
  const {dark} = useTheme();

  return (
    <View style={styles.reactionListContainer}>
      {props.message.latest_reactions &&
        props.message.latest_reactions.length > 0 &&
        renderReactions(
          props.message.latest_reactions,
          props.supportedReactions,
          props.message.reaction_counts,
          props.handleReaction,
        )}
      <ReactionPickerWrapper
        {...props}
        offset={{
          left: -70,
          top: 10,
        }}>
        {props.message.latest_reactions &&
          props.message.latest_reactions.length > 0 && (
            <View style={[
              styles.reactionPickerContainer,
              {
                backgroundColor: dark ? '#6A6E70' : '#F0F0F0',
              }
              ]}>
              <SVGIcon height="18" width="18" type="emoji" />
            </View>
          )}
      </ReactionPickerWrapper>
    </View>
  );
};

export const renderReactions = (
  reactions,
  supportedReactions,
  reactionCounts,
  handleReaction,
) => {
  const reactionsByType = {};
  reactions &&
    reactions.forEach(item => {
      if (reactions[item.type] === undefined) {
        return (reactionsByType[item.type] = [item]);
      } else {
        return (reactionsByType[item.type] = [
          ...reactionsByType[item.type],
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
      />
    ) : null,
  );
};

const ReactionItem = ({
  type,
  handleReaction,
  reactionCounts,
  emojiDataByType,
}) => {
  const {dark} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        handleReaction(type);
      }}
      key={type}
      style={[
        styles.reactionItemContainer,
        {
          borderColor: dark ? '#1E1D21' : '#0064c2',
          backgroundColor: dark ? '#6A6E70' : '#d6ebff',
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
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  reactionItemContainer: {
    borderWidth: 1,
    padding: 4,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 10,
    marginRight: 5,
  },
  reactionItem: {
    fontSize: 14,
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
