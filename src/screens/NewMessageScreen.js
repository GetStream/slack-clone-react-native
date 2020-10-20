import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  KeyboardCompatibleView,
} from 'stream-chat-react-native';
import {ChannelHeader} from '../components/ChannelHeader';
import {DateSeparator} from '../components/DateSeparator';
import {InputBox} from '../components/InputBox';
import {MessageSlack} from '../components/MessageSlack';
import {NewMessageScreenHeader} from '../components/NewMessageScreenHeader';
import streamChatTheme from '../stream-chat-theme';
import {Tags} from '../components/Tags';
import {
  CacheService,
  getChannelDisplayImage,
  getChannelDisplayName,
} from '../utils';
import AsyncStorage from '@react-native-community/async-storage';

const CustomKeyboardCompatibleView = ({children}) => (
  <KeyboardCompatibleView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : -200}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
    {children}
  </KeyboardCompatibleView>
);
export function NewMessageScreen({
  navigation,
  route: {
    params: {chatClient, channelId = null},
  },
}) {
  //   const addTag = useRef();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(CacheService.getMembers());
  const [tags, setTags] = useState([]);
  const [focusOnTags, setFocusOnTags] = useState(true);
  const [channel, setChannel] = useState(null);

  const [initialValue, setInitialValue] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [text, setText] = useState('');

  const addTag = tag => {
    if (!tag || !tag.name) {
      return;
    }
    setTags([...tags, tag]);
    setSearchText('');
  };
  const removeTag = index => {
    if (index < 0) {
      return;
    }

    // TODO: Fix this ... something wrong
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const goBack = () => {
    const storeObject = {
      image: getChannelDisplayImage(channel),
      title: getChannelDisplayName(channel),
      text,
    };
    AsyncStorage.setItem(
      `@slack-clone-draft-${channel.id}`,
      JSON.stringify(storeObject),
    );

    navigation.goBack();
  };

  useEffect(() => {
    const dummyChannel = chatClient.channel('messaging', 'cid11');
    dummyChannel.initialized = true;
    setChannel(chatClient.channel('messaging', 'cid111'));
  }, [chatClient, channelId]);

  return (
    <SafeAreaView style={styles.channelScreenSaveAreaView}>
      <View style={styles.channelScreenContainer}>
        <NewMessageScreenHeader
          goBack={goBack}
          channel={channel}
          client={chatClient}
        />
        <View style={styles.chatContainer}>
          <Chat client={chatClient} style={streamChatTheme}>
            <Channel
              channel={channel}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}>
              <View
                style={{
                  display: 'flex',
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.5,
                }}>
                <Text style={{fontSize: 15, padding: 10}}>To:</Text>
                <Tags
                  initialText={''}
                  onChangeTags={tags => {
                    setTags(tags);
                  }}
                  text={searchText}
                  tags={tags}
                  onTagPress={removeTag}
                  addTag={addTag}
                  textInputProps={{
                    autoFocus: true,
                    placeholder: 'Any type of animal',
                    onFocus: async () => {
                      setFocusOnTags(true);
                      if (!searchText) {
                        setResults(CacheService.getMembers());
                      } else {
                        const res = await chatClient.queryUsers(
                          {
                            name: {$autocomplete: searchText},
                          },
                          {last_active: -1},
                          {presence: true},
                        );
                        setResults(res.users);
                      }
                    },
                  }}
                  onChangeText={async (text, addTag1) => {
                    setSearchText(text);
                    if (!text) {
                      return setResults(CacheService.getMembers());
                    }
                    const res = await chatClient.queryUsers(
                      {
                        name: {$autocomplete: text},
                      },
                      {last_active: -1},
                      {presence: true},
                    );
                    setResults(res.users);
                  }}
                  containerStyle={{justifyContent: 'center'}}
                  inputStyle={{backgroundColor: 'white'}}
                  renderTag={({
                    tag,
                    index,
                    onPress,
                    deleteTagOnPress,
                    readonly,
                  }) => {
                    if (!focusOnTags) {
                      return (
                        <Text style={{color: '#0080ff'}}>{tag.name}, </Text>
                      );
                    }
                    return (
                      <TouchableOpacity
                        key={`${tag}-${index}`}
                        onPress={onPress}
                        style={{
                          padding: 3,
                          paddingLeft: 5,
                          paddingRight: 5,
                          backgroundColor: '#c4e2ff',
                          flexDirection: 'row',
                          margin: 2,
                        }}>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                          }}
                          source={{
                            uri: tag.image,
                          }}
                        />

                        <Text style={{paddingLeft: 10, color: 'black'}}>
                          {tag.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              {results.length > 0 && (
                <FlatList
                  keyboardDismissMode="none"
                  keyboardShouldPersistTaps="always"
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={{
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingLeft: 10,
                      }}
                      onPress={() => {
                        // TODO: Add logic for checking for duplicates
                        addTag(item);
                      }}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                        }}
                        source={{
                          uri: item.image,
                        }}
                      />
                      <Text style={{paddingLeft: 10}}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  data={results}
                />
              )}
              <MessageList
                Message={MessageSlack}
                DateSeparator={DateSeparator}
                dismissKeyboardOnMessageTouch={false}
              />
              <MessageInput
                initialValue={initialValue}
                onChangeText={(text) => {
                  setText(text);
                }}
                Input={InputBox}
                additionalTextInputProps={{
                  onFocus: async () => {
                    setResults([]);
                    setFocusOnTags(false);
                    const channel = chatClient.channel('messaging', {
                      members: [...tags.map(t => t.id), chatClient.user.id],
                    });
                    if (!channel.initialized) {
                      await channel.watch();
                    }
                    setChannel(channel);
                  },
                  placeholderTextColor: '#979A9A',
                  placeholder:
                    channel && channel.data.name
                      ? 'Message #' +
                        channel.data.name.toLowerCase().replace(' ', '_')
                      : 'Message',
                }}
              />
            </Channel>
          </Chat>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  channelScreenSaveAreaView: {
    backgroundColor: 'white',
  },
  channelScreenContainer: {flexDirection: 'column', height: '100%'},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  chatContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#3F0E40',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 80,
  },
});
