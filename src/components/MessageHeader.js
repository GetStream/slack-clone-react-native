import {useTheme} from '@react-navigation/native';
import Dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useMessageContext} from 'stream-chat-react-native';

import {SCText} from './SCText';

export const MessageHeader = (props) => (
  <View style={styles.column}>
    {props.message.attachments.length > 0 && (
      <View style={styles.header}>
        <MessageUserBar {...props} />
      </View>
    )}
  </View>
);

export const MessageUserBar = () => {
  const {colors} = useTheme();
  const {groupStyles, message} = useMessageContext();
  if (
    groupStyles[0] === 'single' ||
    groupStyles[0] === 'top'
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
};

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
