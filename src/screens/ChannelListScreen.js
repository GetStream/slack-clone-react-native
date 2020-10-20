import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  LogBox,
} from 'react-native';

import {ChannelList} from '../components/ChannelList';
import {TextInput} from 'react-native-gesture-handler';
import {ChatClientService} from '../utils';
import {NewMessageBubble} from '../components/NewMessageBubble';

import SearchIcon from '../images/channel-list/search.svg';

export const ChannelListScreen = props => {
  const chatClient = ChatClientService.getClient();
  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            height: 92,
            paddingTop: 30,
            backgroundColor: '#3F0E40',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: '600',
            }}>
            getstream
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('MessageSearchScreen');
            }}
            style={{
              position: 'absolute',
              flex: 1,
              height: '100%',
              right: 10,
              top: 15,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              // borderColor: 'white',
              // borderWidth: 1
            }}>
            <SearchIcon height="30" width="30" />
          </TouchableOpacity>
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
        <View style={{flexGrow: 1, flexShrink: 1}}>
          <ChannelList
            client={chatClient}
            navigation={props.navigation}
            changeChannel={channelId => {
              props.navigation.navigate('ChannelScreen', {
                channelId,
              });
            }}
          />
        </View>
      </View>
      <NewMessageBubble
        onPress={() => {
          props.navigation.navigate('NewMessageScreen');
        }}
      />
    </>
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
