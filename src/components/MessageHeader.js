import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Moment from 'moment';
import {theme, isDark, SCText} from '../utils';
import {useTheme} from '@react-navigation/native';

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
  const {colors} = useTheme();
  if (groupStyles[0] === 'single' || groupStyles[0] === 'top') {
    return (
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
          {Moment(message.created_at).format('hh:ss A')}
        </SCText>
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
    fontSize: 15,
    fontFamily: 'Lato-Bold',
  },
  messageDate: {
    color: 'grey',
    marginLeft: 6,
    fontSize: 10,
  },
});
