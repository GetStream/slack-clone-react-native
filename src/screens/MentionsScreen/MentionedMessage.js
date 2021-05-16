import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {SCText} from '../../components/SCText';
import {getChannelDisplayName} from '../../utils/channelUtils';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  header: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  mentionActivity: {
    color: '#696969',
    fontSize: 13,
  },
  mentionerName: {
    color: '#696969',
    fontSize: 13,
    fontWeight: '700',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  messageDetailsContainer: {
    marginBottom: 15,
    marginLeft: 10,
  },
  messageUserImage: {
    borderRadius: 5,
    height: 30,
    width: 30,
  },
  messageUserName: {
    fontWeight: '900',
  },
});

export const MentionedMessage = React.memo((props) => {
  const {message} = props;

  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ChannelScreen', {
          channelId: message.channel.id,
          messageId: message.id,
        });
      }}
      style={styles.container}>
      <View
        style={[
          styles.header,
          {
            borderTopColor: colors.border,
          },
        ]}>
        <SCText style={styles.mentionerName}>{message.user.name} </SCText>
        <SCText style={styles.mentionActivity}>
          mentioned you in #{getChannelDisplayName(message.channel)}
        </SCText>
      </View>
      <View style={styles.messageContainer}>
        <Image
          source={{
            uri: message.user.image,
          }}
          style={styles.messageUserImage}
        />
        <View style={styles.messageDetailsContainer}>
          <SCText
            style={[
              styles.messageUserName,
              {
                color: colors.boldText,
              },
            ]}>
            {message.user.name}
          </SCText>
          <SCText>{message.text}</SCText>
        </View>
      </View>
    </TouchableOpacity>
  );
});
