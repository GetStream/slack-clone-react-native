import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {NewMessageBubble} from '../../components/NewMessageBubble';
import {usePaginatedSearchedMessages} from '../../hooks/usePaginatedSearchedMessages';
import {ChatClientStore} from '../../utils';
import {ScreenHeader} from '../ScreenHeader';
import {MentionedMessage} from './MentionedMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultsContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export const MentionsScreen = () => {
  const chatClient = ChatClientStore.client;

  const {colors} = useTheme();

  const messageFilters = useMemo(
    () => ({
      'mentioned_users.id': {
        $contains: chatClient?.user?.id || '',
      },
    }),
    [chatClient],
  );

  const {
    loading: loadingMessages,
    loadMore,
    messages,
  } = usePaginatedSearchedMessages(messageFilters);

  const renderItem = ({item: message}) => (
    <MentionedMessage message={message} />
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <ScreenHeader title='Mentions' />

      {loadingMessages && (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator color={colors.text} size='small' />
        </View>
      )}
      {!loadingMessages && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={messages}
            onEndReached={loadMore}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <NewMessageBubble />
    </View>
  );
};
