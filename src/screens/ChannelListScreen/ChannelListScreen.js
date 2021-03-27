import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useChatContext} from 'stream-chat-react-native';

import {JumpToButton} from '../../components/JumpToButton';
import {NewMessageBubble} from '../../components/NewMessageBubble';
import {ScreenHeader} from '../ScreenHeader';
import {SlackChannelList} from './SlackChannelList';

export const ChannelListScreen = () => {
  const {client: chatClient} = useChatContext();
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
        <ScreenHeader showLogo title='getstream' />
        <JumpToButton />

        <View style={styles.listContainer}>
          <SlackChannelList client={chatClient} />
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
