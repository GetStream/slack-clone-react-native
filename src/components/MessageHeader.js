import {useTheme} from '@react-navigation/native';
import Dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from './SCText';

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 2,
  },
  messageDate: {
    color: 'grey',
    fontSize: 10,
    marginLeft: 6,
  },
  messageUserName: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    fontWeight: '900',
  },
  userBar: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export const MessageUserBar = React.memo(({message}) => {
  const {colors} = useTheme();

  if (
    message?.groupStyles?.[0] === 'single' ||
    message?.groupStyles?.[0] === 'top'
  ) {
    return (
      <>
        <View style={styles.userBar}>
          <SCText
            style={[
              styles.messageUserName,
              {
                color: colors.boldText,
              },
            ]}>
            {message.user.name}
          </SCText>
          <SCText style={styles.messageDate}>
            {Dayjs(message.created_at).format('LT')}
          </SCText>
        </View>
      </>
    );
  }
  return null;
});

export const MessageHeader = React.memo(({message}) => (
  <View style={styles.column}>
    {message.attachments.length > 0 && (
      <View style={styles.header}>
        <MessageUserBar message={message} />
      </View>
    )}
  </View>
));
