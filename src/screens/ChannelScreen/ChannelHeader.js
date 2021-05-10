import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {BackButton} from '../../components/BackButton';
import {SCText} from '../../components/SCText';
import {SlackChannelListItem} from '../../components/SlackChannelListItem/SlackChannelListItem';
import {notImplemented} from '../../utils';

export const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  channelSubTitle: {},
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  leftContent: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rightContent: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
});

const isDMChannel = (channel) => channel.id.indexOf('!members-') === 0;

const Spacer = () => <View style={{width: 50}}></View>;

export const ChannelHeader = ({channel}) => {
  const {colors} = useTheme();

  const membersIds = Object.keys(channel.state.members);
  const isDMConversation = isDMChannel(channel);
  const isOneOnOneConversation = isDMConversation && membersIds.length === 2;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <View style={styles.leftContent}>
        <BackButton height={20} width={20} />
      </View>
      <View style={styles.centerContent}>
        <SlackChannelListItem
          channel={channel}
          containerStyle={{
            margin: 0,
            padding: 0,
          }}
          disablePrefix
          mode={'header'}
          onSelect={notImplemented}
          titleStyle={{
            fontSize: 15,
            fontWeight: '900',
            padding: 0,
          }}
        />
        {!isOneOnOneConversation ? (
          <SCText style={styles.channelSubTitle}>
            {membersIds.length} Members
          </SCText>
        ) : (
          <SCText style={styles.channelSubTitle}>View Details</SCText>
        )}
      </View>
      <View style={styles.rightContent}>
        <Spacer />
      </View>
    </View>
  );
};
