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
import {CacheService, ChatClientService, SCText} from '../utils';
import {NewMessageBubble} from '../components/NewMessageBubble';

export const DirectMessagesScreen = props => {
  const chatClient = ChatClientService.getClient();
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
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            fontWeight: '600',
            textAlignVertical: 'center',
          }}>
          Direct Messages
        </Text>
      </View>
      <View
        style={{
          margin: 15,
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
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            padding: 10,
          }}
          placeholderTextColor="grey"
          placeholder="Jump to"
          onFocus={() => {
            props.navigation.navigate('ChannelSearchScreen');
          }}
        />
      </View>
      <FlatList
        data={CacheService.getOneToOneConversations()}
        renderItem={({item}) => {
          const otherMember = Object.values(item.state.members).find(
            m => m.user.id !== chatClient.user.id,
          );
          const lastMessage =
            item.state.messages[item.state.messages.length - 1];
          return (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                borderTopColor: '#DCDCDC',
                borderTopWidth: 0.5,
                paddingTop: 10,
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 5,
                  marginTop: 5,
                }}
                source={{
                  uri: otherMember.user.image,
                }}
              />
              <View style={{flex: 1, marginLeft: 10, marginBottom: 15}}>
                <SCText style={{}}>{otherMember.user.name}</SCText>
                <SCText>
                  {lastMessage.user.id === chatClient.user.id
                    ? 'You: '
                    : lastMessage.user.name}{' '}
                  {lastMessage.text}
                </SCText>
              </View>
            </View>
          );
        }}
      />
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
