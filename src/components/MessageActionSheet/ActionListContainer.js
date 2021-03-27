import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet} from 'react-native';

import {ListItemSeparator} from '../ListItemSeparator';
import {ActionList} from './ActionList';
import {HeaderReactionList} from './HeaderReactionList';

const styles = StyleSheet.create({
  reactionListContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
});

export const ActionListContainer = React.memo(
  ({actions, openReactionPicker, toggleReaction}) => (
    <>
      <HeaderReactionList
        openReactionPicker={openReactionPicker}
        toggleReaction={toggleReaction}
      />
      <ListItemSeparator />
      <BottomSheetScrollView style={styles.actionListContainer}>
        <ActionList actions={actions} />
      </BottomSheetScrollView>
    </>
  ),
);
