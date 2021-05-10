import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from '@react-navigation/native';
import React, {useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChannelList, Chat} from 'stream-chat-react-native';

import {DMAvatar} from '../components/DMAvatar';
import {JumpToButton} from '../components/JumpToButton';
import {NewMessageBubble} from '../components/NewMessageBubble';
import {ChatClientStore} from '../utils';
import {ScreenHeader} from './ScreenHeader';

export const DirectMessagesScreen = () => {
  const chatClient = ChatClientStore.client;

  const navigation = useNavigation();
  const {colors} = useTheme();
  const filters = useMemo(
    () => ({
      members: {
        $in: [chatClient.user.id],
      },
      name: '',
      type: 'messaging',
    }),
    [chatClient?.user?.id],
  );
  const ref = useRef(null);
  useScrollToTop(ref);
  const setRef = (r) => {
    ref.current = r;
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScreenHeader title='Direct Messages' />
      <JumpToButton />
      <Chat client={chatClient}>
        <ChannelList
          filters={filters}
          onSelect={(channel) => {
            navigation.navigate('ChannelScreen', {
              channelId: channel.id,
            });
          }}
          PreviewAvatar={DMAvatar}
          setFlatListRef={setRef}
        />
      </Chat>
      <NewMessageBubble />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
    marginLeft: 10,
    paddingTop: 10,
  },
  messageDetailsContainer: {
    flex: 1,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 10,
  },
  messagePreview: {
    fontSize: 15,
    marginTop: 5,
  },
});
