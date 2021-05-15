import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from './SCText';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  label: {color: '#ff4c4c', fontSize: 12},
  line: {
    borderColor: '#ff4c4c',
    borderWidth: 0.5,
    flex: 1,
    height: 0,
    marginRight: 10,
    marginVertical: 5,
  },
});

export const InlineUnreadIndicator = React.memo(() => (
  <View style={styles.container}>
    <View style={styles.line} />
    <SCText style={styles.label}>Unread</SCText>
  </View>
));
