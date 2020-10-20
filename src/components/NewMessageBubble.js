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
import NewMessageBubbleIcon from '../images/channel-list/new-message.svg';

export const NewMessageBubble = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
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
        bottom: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}>
      <NewMessageBubbleIcon height={51} width={51} />
    </TouchableOpacity>
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
