import {useTheme} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useChatContext} from 'stream-chat-react-native';

import {SCText} from '../../components/SCText';
import {usePaginatedSearchedChannels} from '../../hooks/usePaginatedSearchedChannels';
import {CacheService} from '../../utils';
import {ChannelSearchInput} from './ChannelSearchInput';
import {ChannelSearchList} from './ChannelSearchList';
import {HorizonalMembersList} from './HorizontalMembersList';

const styles = StyleSheet.create({
  searchInputContainer: {
    borderBottomWidth: 0.5,
  },
  searchResultsContainer: {
    paddingTop: 10,
  },
  searchResultsContainerTitle: {
    fontWeight: '500',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export const JumpToSearchScreen = () => {
  const {client: chatClient} = useChatContext();
  const {colors} = useTheme();
  const [searchText, setSearchText] = useState('');

  const queryFilters = useMemo(
    () => ({
      $or: [
        {'member.user.name': {$autocomplete: searchText}},
        {
          name: {
            $autocomplete: searchText,
          },
        },
      ],
      members: {
        $in: [chatClient.user?.id],
      },
      type: 'messaging',
    }),
    [searchText],
  );

  const {channels: results} = usePaginatedSearchedChannels(queryFilters);

  const channels =
    results?.length > 0 ? results : CacheService.getRecentConversations();
  const onSubmit = ({nativeEvent: {text}}) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View>
        <View style={[
          styles.searchInputContainer,
          {
            borderBottomColor: colors.border
          }
        ]}>
          <ChannelSearchInput onSubmit={onSubmit} />
        </View>
        {!searchText && <HorizonalMembersList />}
        <View style={styles.searchResultsContainer}>
          {!searchText && (
            <SCText style={styles.searchResultsContainerTitle}>Recent</SCText>
          )}
          <ChannelSearchList channels={channels} />
        </View>
      </View>
    </SafeAreaView>
  );
};
