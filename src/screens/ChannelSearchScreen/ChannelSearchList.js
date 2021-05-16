import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';

import {SlackChannelListItem} from '../../components/SlackChannelListItem/SlackChannelListItem';

export const ChannelSearchList = (props) => {
  const {channels} = props;
  const navigation = useNavigation();
  const goToChannelScreen = (channel) => {
    navigation.navigate('ChannelScreen', {
      channelId: channel.id,
    });
  };

  const renderChannelRow = ({item: channel}) => (
    <SlackChannelListItem
      channel={channel}
      containerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 3,
      }}
      key={channel.id}
      onSelect={goToChannelScreen}
      showAvatar
      titleStyle={{
        fontWeight: '400',
      }}
    />
  );

  return (
    <FlatList
      data={channels}
      keyboardDismissMode={'on-drag'}
      keyboardShouldPersistTaps='always'
      renderItem={renderChannelRow}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
