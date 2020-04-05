import React from 'react';
import {MessageSimple, MessageAvatar} from 'stream-chat-react-native';
import {MessageFooter} from './MessageFooter';
import {UrlPreview} from './UrlPreview';
import {Giphy} from './Giphy';
import {View, Text, StyleSheet} from 'react-native';
import Moment from 'moment';

export const MessageSlack = props => {
  if (props.message.deleted_at) {
    return null;
  }
  return (
    <MessageSimple
      {...props}
      forceAlign="left"
      UrlPreview={UrlPreview}
      Giphy={Giphy}
      MessageAvatar={SquareMessageAvatar}
      ReactionList={null}
      MessageHeader={MessageHeader}
      MessageFooter={MessageFooter}
      MessageText={MessageText}
    />
  );
};

const MessageUserBar = ({groupStyles, message}) => {
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

const SquareMessageAvatar = props => {
  return (
    <MessageAvatar
      {...props}
      style={
        props.groupStyles[0] === 'single' || props.groupStyles[0] === 'top'
          ? {}
          : {'message.avatarWrapper.spacer': 'height: 0; width:0;'}
      }
      showAvatar={
        props.groupStyles[0] === 'single' || props.groupStyles[0] === 'top'
          ? true
          : false
      }
    />
  );
};

const MessageHeader = props => {
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

const MessageText = props => {
  return (
    <React.Fragment>
      {props.message.attachments.length === 0 && <MessageUserBar {...props} />}
      {props.renderText(props.message, props.theme.message.content.markdown)}
    </React.Fragment>
  );
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
