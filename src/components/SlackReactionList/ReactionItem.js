import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  reactionItem: {
    fontSize: 16,
  },
  reactionItemContainer: {
    borderRadius: 17,
    borderWidth: 1,
    marginRight: 5,
    marginVertical: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export const ReactionItem = React.memo(
  ({count, Icon, isOwnReaction, onPress}) => {
    const {dark} = useTheme();
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.reactionItemContainer,
          {
            backgroundColor: dark
              ? isOwnReaction
                ? '#194B8A'
                : '#1E1D21'
              : isOwnReaction
              ? '#d6ebff'
              : '#F0F0F0',
            borderColor: dark
              ? isOwnReaction
                ? '#313538'
                : '#1E1D21'
              : isOwnReaction
              ? '#0064e2'
              : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.reactionItem,
            {
              color: dark ? '#CFD4D2' : '#0064c2',
            },
          ]}>
          {Icon} {count}
        </Text>
      </TouchableOpacity>
    );
  },
);
