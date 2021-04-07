import React from 'react';
import {View} from 'react-native';

import {GroupChannelItem} from './GroupChannelItem';
import {GroupDMItem} from './GroupDMItem';
import {OneOnOneDMItem} from './OneOnOneDMItem';

export const SlackChannelListItem = (props) => {
  const {
    channel,
    containerStyle = {},
    mode = 'list',
    onSelect,
    showAvatar = false,
    titleStyle = {},
  } = props;

  const isDM = !channel.data.name;
  const isOneOnOneDM = isDM && Object.keys(channel.state.members).length === 2;

  const onPress = () => {
    onSelect(channel);
  };
  console.log(channel.id, channel.data.name);
  if (isOneOnOneDM) {
    return (
      <View style={containerStyle}>
        <OneOnOneDMItem
          channel={channel}
          mode={mode}
          onPress={onPress}
          showAvatar={showAvatar}
          titleStyle={titleStyle}
        />
      </View>
    );
  }

  if (isDM) {
    return (
      <View style={containerStyle}>
        <GroupDMItem
          channel={channel}
          mode={mode}
          onPress={onPress}
          titleStyle={titleStyle}
        />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <GroupChannelItem
        channel={channel}
        mode={mode}
        onPress={onPress}
        titleStyle={titleStyle}
      />
    </View>
  );
};
