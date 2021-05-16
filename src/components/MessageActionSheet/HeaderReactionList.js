import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {getFrequentlyUsedReactions} from '../../utils/supportedReactions';
import {SVGIcon} from '../SVGIcon';

const styles = StyleSheet.create({
  reactionItem: {
    fontSize: 28,
  },
  reactionItemContainer: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    marginRight: 10,
    padding: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  reactionListContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  reactionPickerContainer: {
    borderRadius: 10,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 6,
  },
});

const ReactionItem = ({handleReaction, icon, type}) => {
  const {dark} = useTheme();
  return (
    <View
      key={type}
      style={[
        styles.reactionItemContainer,
        {
          backgroundColor: dark ? '#313538' : '#F8F8F8',
          borderColor: dark ? '#1E1D21' : 'transparent',
        },
      ]}>
      <Text
        onPress={() => {
          handleReaction(type);
        }}
        style={[
          styles.reactionItem,
          {
            color: dark ? '#CFD4D2' : '#0064c2',
          },
        ]}>
        {icon}
      </Text>
    </View>
  );
};

export const HeaderReactionList = ({openReactionPicker, toggleReaction}) => {
  const {dark} = useTheme();
  const reactions = getFrequentlyUsedReactions().slice(0, 6);

  return (
    <View style={styles.reactionListContainer}>
      {reactions.map((r, index) => {
        if (!r?.icon) return null;
        return (
          <ReactionItem
            handleReaction={toggleReaction}
            icon={r.icon}
            key={index}
            type={r.id}
          />
        );
      })}
      <TouchableOpacity
        onPress={() => {
          openReactionPicker();
        }}
        style={[
          styles.reactionPickerContainer,
          {
            backgroundColor: dark ? '#313538' : '#F0F0F0',
          },
        ]}>
        <SVGIcon height='25' type='emoji' width='25' />
      </TouchableOpacity>
    </View>
  );
};
