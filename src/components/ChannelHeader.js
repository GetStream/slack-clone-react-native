import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {getChannelDisplayName, truncate} from '../utils';
import {useTheme, useNavigation} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';
import {SCText} from './SCText';

export const ChannelHeader = ({goBack, channel}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const isDirectMessagingConversation = !channel.data.name;
  const isOneOnOneConversation =
    isDirectMessagingConversation &&
    Object.keys(channel.state.members).length === 2;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <View style={styles.leftContent}>
        <TouchableOpacity
          onPress={() => {
            goBack && goBack();
          }}>
          <SCText style={styles.hamburgerIcon}>{'‹'}</SCText>
        </TouchableOpacity>
      </View>
      <View style={styles.centerContent}>
        <SCText
          style={[
            styles.channelTitle,
            {
              color: colors.boldText,
            },
          ]}>
          {truncate(getChannelDisplayName(channel, true), 33)}
        </SCText>
        {!isOneOnOneConversation && (
          <SCText style={styles.channelSubTitle}>
            {Object.keys(channel.state.members).length} Members
          </SCText>
        )}
      </View>
      <View style={styles.rightContent}>
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => {
            navigation.navigate('MessageSearchScreen');
          }}>
          <SVGIcon height="20" width="20" type="search" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIconContainer}>
          <SVGIcon height="20" width="20" type="info" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  leftContent: {
    flexDirection: 'row',
  },
  hamburgerIcon: {
    fontSize: 35,
    textAlign: 'left',
  },
  channelTitle: {
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 17,
    fontFamily: 'Lato-Regular',
    alignSelf: 'center',
    textAlign: 'center'
  },
  channelSubTitle: {},
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    marginRight: 10,
  },
  searchIconContainer: {marginRight: 15, alignSelf: 'center'},
  searchIcon: {
    height: 18,
    width: 18,
  },
  menuIcon: {
    height: 18,
    width: 18,
  },
  menuIconContainer: {alignSelf: 'center'},
});
