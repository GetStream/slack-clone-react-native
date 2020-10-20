import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Text, Button} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  addBorder,
  AsyncStore,
  CacheService,
  ChatClientService,
  getChannelDisplayName,
  SCText,
} from '../utils';
import {
  Message as DefaultMessage,
  ThemeProvider,
} from 'stream-chat-react-native';
import {MessageSlack} from '../components/MessageSlack';
import AsyncStorage from '@react-native-community/async-storage';

import streamChatTheme from '../stream-chat-theme.js';
export const MessageSearchScreen = ({
  navigation,
  route: {
    params: {chatClient},
  },
}) => {
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
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View style={{flexDirection: 'column', height: '100%'}}>
        <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
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
            inlineImageLeft="search_icon"
            style={{
              flex: 1,
              margin: 3,
              padding: 10,
              backgroundColor: '#E9E9E9',
              borderColor: '#D3D3D3',
              borderWidth: 0.5,
              borderRadius: 5,
            }}
          />
          <TouchableOpacity
            style={{justifyContent: 'center', padding: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            flexGrow: 1,
            flexShrink: 1,
            backgroundColor: 'white', // #F5F5F5
          }}>
          {!results && !loadingResults && (
            <>
              <SCText style={{padding: 5, backgroundColor: '#E9E9E9'}}>
                Recent searches
              </SCText>
              <FlatList
                keyboardShouldPersistTaps="always"
                data={recentSearches}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSearchText(item);
                      }}
                      style={{
                        padding: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderBottomColor: '#F5F5F5',
                        borderBottomWidth: 0.5,
                      }}>
                      <SCText>{item}</SCText>
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
            <View
              style={{
                flexGrow: 1,
                flexShrink: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="small" color="black" />
            </View>
          )}
          {results && (
            <View style={{flexGrow: 1, flexShrink: 1}}>
              <FlatList
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{flexGrow: 1}}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>No results for "{searchText}"</Text>
                      <TouchableOpacity
                        onPress={startNewSearch}
                        style={{
                          padding: 15,
                          paddingTop: 10,
                          paddingBottom: 10,
                          marginTop: 10,
                          borderColor: '#696969',
                          borderWidth: 0.5,
                          borderRadius: 5,
                        }}>
                        <Text>Start a new search</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                data={results}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: 10,
                        marginTop: 3,
                      }}>
                      <Text style={{paddingTop: 10, paddingBottom: 10}}>
                        {getChannelDisplayName(item.channel, true)}
                      </Text>
                      <ThemeProvider style={streamChatTheme}>
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
