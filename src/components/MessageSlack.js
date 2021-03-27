import React from 'react';
import ReactNativeHaptic from 'react-native-haptic';
import {MessageSimple} from 'stream-chat-react-native';

import {getSupportedReactions} from '../utils/supportedReactions';
import {Giphy} from './Giphy';
// import {MessageActionSheet} from './MessageActionSheet';
import {MessageAvatar} from './MessageAvatar';
import {MessageFooter} from './MessageFooter';
import {MessageHeader} from './MessageHeader';
import {MessageText} from './MessageText';
import {UrlPreview} from './UrlPreview';

export const MessageSlack = (props) => (
  // if (props.message.deleted_at) {
  //   return null;
  // }
  <MessageSimple
    {...props}
    // ActionSheet={MessageActionSheet}
    forceAlign='left'
    Giphy={Giphy}
    MessageAvatar={MessageAvatar}
    MessageFooter={MessageFooter}
    MessageHeader={MessageHeader}
    MessageText={MessageText}
    onLongPress={() => {
      ReactNativeHaptic && ReactNativeHaptic.generate('impact');
      props.showActionSheet();
    }}
    ReactionList={null}
    supportedReactions={getSupportedReactions(false)}
    textBeforeAttachments
    UrlPreview={UrlPreview}
  />
);
