import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {DMAvatar} from '../../components/DMAvatar';
import {SCText} from '../../components/SCText';
import ChannelsStore from '../../utils/ChannelsStore';
import {ChatClientStore} from '../../utils/ChatClientStore';

const styles = StyleSheet.create({
  memberContainer: {
    alignItems: 'center',
    padding: 5,
    width: 70,
  },
  memberName: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
    textAlign: 'center',
  },
  recentMembersContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export const HorizonalMembersList = () => {
  const navigation = useNavigation();
  const chatClient = ChatClientStore.client;

  const renderItem = ({item}) => {
    const userName = Object.values(item.state.members).find(
      (m) => m.user.id !== chatClient.user.id,
    ).user.name;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChannelScreen', {
            channelId: item.id,
          });
        }}
        style={styles.memberContainer}>
        <DMAvatar channel={item} />
        <SCText style={styles.memberName}>{userName}</SCText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.recentMembersContainer}>
      <FlatList
        data={ChannelsStore.oneToOneConversations}
        horizontal
        keyboardShouldPersistTaps='always'
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
