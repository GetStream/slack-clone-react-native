import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
  recentMessageLink: {
    alignSelf: 'center',
    height: 60,
    paddingTop: 20,
    width: '100%',
  },
  recentMessageLinkText: {
    alignSelf: 'center',
    color: '#1E90FF',
    fontSize: 15,
  },
});

export const JumpToRecentMessagesButton = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.setParams({
          messageId: undefined,
        });
      }}
      style={[
        styles.recentMessageLink,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}>
      <SCText style={styles.recentMessageLinkText}>
        Jump to recent message
      </SCText>
    </TouchableOpacity>
  );
};
