import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ChannelList} from '../components/ChannelList/ChannelList';
import {ChatClientService} from '../utils';
import {NewMessageBubble} from '../components/NewMessageBubble';

import {ScreenHeader} from './ScreenHeader';
import {ChannelSearchButton} from '../components/ChannelSearchButton';

export const ChannelListScreen = props => {
  const chatClient = ChatClientService.getClient();
  const {colors} = useTheme();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScreenHeader title="getstream" showLogo />
        <ChannelSearchButton />

        <View style={styles.listContainer}>
          <ChannelList client={chatClient} />
        </View>
      </View>
      <NewMessageBubble />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
