import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useMessageInputContext} from 'stream-chat-react-native';

import {SVGIcon} from './SVGIcon';

export const SendButton = () => {
  const {fileUploads, imageUploads, sendMessage, text} =
    useMessageInputContext();
  const isMessageEmpty = !text && !imageUploads.length && !fileUploads.length;

  return (
    <TouchableOpacity disabled={isMessageEmpty} onPress={sendMessage}>
      <SVGIcon
        fill={isMessageEmpty ? 'grey' : '#1F629E'}
        height='18'
        type={'input-buttons-send'}
        width='18'
      />
    </TouchableOpacity>
  );
};
