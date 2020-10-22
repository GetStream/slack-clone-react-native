import React from 'react';
import {theme, isDark} from '../utils';
import {MessageUserBar} from './MessageHeader';
import {useTheme} from '@react-navigation/native';

export const MessageText = props => {
  const {colors} = useTheme();

  return (
    <React.Fragment>
      {props.message.attachments.length === 0 && <MessageUserBar {...props} />}
      {props.renderText({
        message: props.message,
        markdownStyles: {
          text: {
            fontSize: 16,
            color: colors.text,
          },
        },
      })}
    </React.Fragment>
  );
};
