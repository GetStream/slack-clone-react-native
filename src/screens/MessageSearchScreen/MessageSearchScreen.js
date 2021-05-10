import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SCText} from '../../components/SCText';
import {usePaginatedSearchedMessages} from '../../hooks/usePaginatedSearchedMessages';
import {MessageSearchInput} from './MessageSearchInput';
import {MessageSearchList} from './MessageSearchList';
import {RecentSearchList} from './RecentSearchList';
import {useRecentSearched} from './hooks/useRecentSearches';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  recentSearchesContainer: {
    flexGrow: 1,
    flexShrink: 1,
    marginTop: 10,
  },
  resultCountContainer: {
    borderBottomWidth: 0.5,
    padding: 15,
  },
  safeAreaView: {
    flex: 1,
  },
});

export const MessageSearchScreen = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {loading: loadingMessages, messages} = usePaginatedSearchedMessages(
    searchQuery,
  );

  const {
    addToRecentSearches,
    recentSearches,
    removeFromRecentSearches,
  } = useRecentSearched();

  const startNewSearch = (text) => {
    setSearchText(text);
    setSearchQuery(text);
    inputRef.current.focus();
  };

  const onChangeText = (text) => {
    if (!text) {
      setSearchQuery(text);
    }

    setSearchText(text);
  };

  const onSubmit = (text) => {
    setSearchQuery(text);
    !!text && addToRecentSearches(text);
  };

  const setRef = (ref) => {
    inputRef.current = ref;
  };

  return (
    <View
      style={[
        styles.safeAreaView,
        {
          backgroundColor: colors.primary,
          paddingTop: insets.top,
        },
      ]}>
      <View style={styles.container}>
        <MessageSearchInput
          onChangeText={onChangeText}
          onSubmit={onSubmit}
          ref={setRef}
          value={searchText}
        />
        {messages && messages.length > 0 && (
          <View
            style={[
              styles.resultCountContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}>
            <SCText>{messages.length} Results</SCText>
          </View>
        )}
        <View
          style={[
            styles.recentSearchesContainer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          {!messages && !loadingMessages && (
            <RecentSearchList
              onSelect={startNewSearch}
              recentSearches={recentSearches}
              removeItem={removeFromRecentSearches}
            />
          )}
          {!!searchQuery && (
            <MessageSearchList
              loadingResults={loadingMessages}
              results={messages}
              startNewSearch={startNewSearch}
            />
          )}
        </View>
      </View>
    </View>
  );
};
