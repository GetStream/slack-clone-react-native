import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from '../../../components/SCText';

const styles = StyleSheet.create({
  emptyResultIndicator: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyResultIndicatorEmoji: {
    fontSize: 60,
  },
});

export const ListEmptyComponent = React.memo(() => (
  <View style={styles.emptyResultIndicator}>
    <SCText style={styles.emptyResultIndicatorEmoji}>😕</SCText>
    <SCText>No user matches these keywords</SCText>
  </View>
));
