import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  LogBox,
  Image,
} from 'react-native';

import {ChannelList} from '../components/ChannelList';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {ChatClientService, SCText} from '../utils';
import {NewMessageBubble} from '../components/NewMessageBubble';

export const MentionsScreen = props => {
  const chatClient = ChatClientService.getClient();
  const [results, setResults] = useState([]);

  useState(() => {
    const getMessages = async () => {
      const res = await chatClient.search(
        {
          members: {
            $in: [chatClient.user.id],
          },
        },
        `@${chatClient.user.name}`,
      );

      setResults(res.results);
    };

    getMessages();
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          height: 70,
          paddingTop: 30,
          backgroundColor: '#3F0E40',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SCText
          style={{
            color: 'white',
            fontSize: 17,
            fontWeight: '600',
            textAlignVertical: 'center',
          }}>
          Mentions
        </SCText>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={results}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('TargettedMessageChannelScreen', {
                    message: item.message,
                  });
                }}
                style={{
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    padding: 20,
                    paddingLeft: 40,
                    paddingBottom: 10,
                    borderTopColor: '#DCDCDC',
                    borderTopWidth: 0.5,
                  }}>
                  <SCText style={{fontSize: 13, color: '#696969'}}>
                    <SCText style={{ fontWeight: '600', fontSize: 13, color: '#696969' }}>
                      {item.message.user.name} {' '}
                    </SCText>
                     mentioned you in #
                    {item.message.channel.name &&
                      item.message.channel.name.toLowerCase().replace(' ', '_')}
                  </SCText>
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 5,
                    }}
                    source={{
                      uri: item.message.user.image,
                    }}
                  />
                  <View style={{marginLeft: 10, marginBottom: 15}}>
                    <SCText
                      style={{
                        fontWeight: '900',
                      }}>
                      {item.message.user.name}
                    </SCText>
                    <SCText>{item.message.text}</SCText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <NewMessageBubble
        onPress={() => {
          props.navigation.navigate('NewMessageScreen');
        }}
      />
    </View>
  );
};
const textStyles = {
  fontFamily: 'Lato-Regular',
  color: 'black',
  fontSize: 16,
};
const styles = StyleSheet.create({
  channelRow: {
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginRight: 5,
  },
  channelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadChannelTitle: {
    marginLeft: 3,
    fontWeight: 'bold',
    padding: 5,
    ...textStyles,
  },
  channelTitle: {
    padding: 5,
    fontWeight: '300',
    paddingLeft: 10,
    ...textStyles,
  },
  channelTitlePrefix: {
    fontWeight: '300',
    padding: 5,
    ...textStyles,
  },
});
