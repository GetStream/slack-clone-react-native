import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Moment from 'moment';

export const MessageHeader = props => {
  return (
    <View style={styles.column}>
      {props.message.attachments.length > 0 && (
        <View style={styles.header}>
          <MessageUserBar {...props} />
        </View>
      )}
    </View>
  );
};

export const MessageUserBar = ({groupStyles, message}) => {
  if (groupStyles[0] === 'single' || groupStyles[0] === 'top') {
    return (
      <View style={styles.userBar}>
        <Text style={styles.messageUserName}>{message.user.name}</Text>
        <Text style={styles.messageDate}>
          {Moment(message.created_at).format('hh:ss A')}
        </Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 8,
  },
  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageUserName: {
    fontWeight: '900',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Lato-Bold',
  },
  messageDate: {
    color: 'grey',
    marginLeft: 6,
    fontSize: 10,
  },
});
