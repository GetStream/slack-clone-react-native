import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChannelListItem} from '../components/ChannelListItem';
import {CacheService, ChatClientService} from '../utils';

export const ChannelSearchScreen = ({
  navigation,
  route: {
    params: {channelsOnly = false},
  },
}) => {
  const chatClient = ChatClientService.getClient();
  const [results, setResults] = useState(CacheService.getRecentConversations());
  const [text, setText] = useState('');
  const renderChannelRow = (channel, isUnread) => {
    const isOneOnOneConversation =
      Object.keys(channel.state.members).length === 2;

    return (
      <ChannelListItem
        isOneOnOneConversation={isOneOnOneConversation}
        isUnread={isUnread}
        channel={channel}
        client={chatClient}
        key={channel.id}
        currentUserId={chatClient.user.id}
        avatar
        presenceIndicator={false}
        changeChannel={channelId => {
          navigation.navigate('ChannelScreen', {
            channelId,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
          <TextInput
            onChangeText={async text => {
              setText(text);
              if (!text) {
                return setResults(CacheService.getRecentConversations());
              }

              const result = await chatClient.queryChannels({
                type: 'messaging',
                name: '',
                $or: [
                  {'member.user.name': {$autocomplete: text}},
                  {
                    name: {
                      $autocomplete: text,
                    },
                  },
                ],
              });
              setResults(result);
            }}
            value={text}
            placeholder="Search"
            style={{
              flex: 9,
              margin: 3,
              padding: 10,
              borderColor: '#D3D3D3',
              borderWidth: 0.5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
          />
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', padding: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        {(!text && !channelsOnly) && (
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
            }}>
            <FlatList
              keyboardShouldPersistTaps="always"
              data={CacheService.getMembers()}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      padding: 5,
                      width: 60,
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <Text
                      style={{marginTop: 5, fontSize: 10, textAlign: 'center'}}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
              horizontal
            />
          </View>
        )}
        <View
          style={{
            paddingTop: 10,
          }}>
          <Text style={{paddingLeft: 10}}>Recent</Text>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={results}
            renderItem={({item}) => {
              return renderChannelRow(item);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
