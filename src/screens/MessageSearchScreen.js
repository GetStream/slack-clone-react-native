import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AsyncStore,
  ChatClientService,
  getChannelDisplayName,
  SCText,
  theme,
  isDark,
  useStreamChatTheme,
} from '../utils';
import {
  Message as DefaultMessage,
  ThemeProvider,
} from 'stream-chat-react-native';
import {MessageSlack} from '../components/MessageSlack';
import {useTheme} from '@react-navigation/native';

import streamChatTheme from '../stream-chat-theme.js';
import {ListItemSeparator} from '../components/ListItemSeparator';
export const MessageSearchScreen = ({
  navigation,
  route: {
    params: {chatClient},
  },
}) => {
  const {colors, dark} = useTheme();
  const chatStyle = useStreamChatTheme();
  const inputRef = useRef(null);
  const [results, setResults] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [searchText, setSearchText] = useState('');

  const addToRecentSearches = async q => {
    const _recentSearches = [...recentSearches];
    _recentSearches.unshift(q);

    // Store only max 10 searches
    const slicesRecentSearches = _recentSearches.slice(0, 7);
    setRecentSearches(slicesRecentSearches);

    await AsyncStore.setItem(
      '@slack-clone-recent-searches',
      slicesRecentSearches,
    );
  };

  const removeFromRecentSearches = async index => {
    const _recentSearches = [...recentSearches];
    _recentSearches.splice(index, 1);

    setRecentSearches(_recentSearches);

    await AsyncStore.setItem('@slack-clone-recent-searches', _recentSearches);
  };

  const search = async q => {
    if (!q) {
      setLoadingResults(false);
      return;
    }
    const chatClient = ChatClientService.getClient();
    try {
      const res = await chatClient.search(
        {
          members: {
            $in: [chatClient.user.id],
          },
        },
        q,
        {limit: 10, offset: 0},
      );
      setResults(res.results.map(r => r.message));
    } catch (error) {
      setResults([]);
    }
    setLoadingResults(false);
    addToRecentSearches(q);
  };

  const startNewSearch = () => {
    setSearchText('');
    setResults(null);
    setLoadingResults(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    const loadRecentSearches = async () => {
      const recentSearches = await AsyncStore.getItem(
        '@slack-clone-recent-searches',
        [],
      );
      setRecentSearches(recentSearches);
    };

    loadRecentSearches();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <View style={styles.container}>
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor: colors.backgroundSecondary,
            },
          ]}>
          <TextInput
            ref={ref => {
              inputRef.current = ref;
            }}
            returnKeyType="search"
            autoFocus
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              setResults(null);
            }}
            onSubmitEditing={({nativeEvent: {text, eventCount, target}}) => {
              setLoadingResults(true);
              search(text);
            }}
            placeholder="Search"
            placeholderTextColor={colors.text}
            inlineImageLeft="search_icon"
            style={[
              styles.inputBox,
              {
                backgroundColor: dark ? '#363639' : '#dcdcdc',
                borderColor: dark ? '#212527' : '#D3D3D3',
                color: colors.text,
              },
            ]}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <SCText>Cancel</SCText>
          </TouchableOpacity>
        </View>
        {results && results.length > 0 && (
          <View
            style={[
              styles.resultCountContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}>
            <SCText>{results.length} Results</SCText>
          </View>
        )}
        <View
          style={[
            styles.recentSearchesContainer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          {!results && !loadingResults && (
            <>
              <SCText
                style={[
                  styles.recentSearchesTitle,
                  {
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}>
                Recent searches
              </SCText>
              <FlatList
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={ListItemSeparator}
                data={recentSearches}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSearchText(item);
                      }}
                      style={styles.recentSearchItemContainer}>
                      <SCText style={styles.recentSearchText}>{item}</SCText>
                      <SCText
                        onPress={() => {
                          removeFromRecentSearches(index);
                        }}>
                        X
                      </SCText>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}
          {loadingResults && (
            <View style={styles.loadingIndicatorContainer}>
              <ActivityIndicator size="small" color="black" />
            </View>
          )}
          {results && (
            <View style={styles.resultsContainer}>
              <FlatList
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{flexGrow: 1}}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.listEmptyContainer}>
                      <SCText>No results for "{searchText}"</SCText>
                      <TouchableOpacity
                        onPress={startNewSearch}
                        style={styles.resetButton}>
                        <SCText>Start a new search</SCText>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                data={results}
                renderItem={({item}) => {
                  return (
                    <View
                      style={[
                        styles.resultItemContainer,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}>
                      <SCText style={styles.resultChannelTitle}>
                        {getChannelDisplayName(item.channel, true)}
                      </SCText>
                      <ThemeProvider style={chatStyle}>
                        <DefaultMessage
                          Message={MessageSlack}
                          message={item}
                          groupStyles={['single']}
                        />
                      </ThemeProvider>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    height: '100%',
  },
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  inputBox: {
    color: isDark() ? 'white' : 'black',
    flex: 1,
    margin: 3,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  cancelButton: {justifyContent: 'center', padding: 5},
  resultCountContainer: {
    padding: 15,
    borderBottomWidth: 0.5,
  },
  recentSearchesContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
  recentSearchesTitle: {
    padding: 5,
    fontSize: 13,
  },
  recentSearchItemContainer: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  recentSearchText: {fontSize: 14},
  loadingIndicatorContainer: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsContainer: {flexGrow: 1, flexShrink: 1},
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderColor: '#696969',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  resultItemContainer: {
    padding: 10,
  },
  resultChannelTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '700',
    color: '#8b8b8b',
  },
});
