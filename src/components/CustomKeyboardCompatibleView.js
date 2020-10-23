import React from 'react';
import {Platform} from 'react-native';
import {KeyboardCompatibleView} from 'stream-chat-react-native';

export const CustomKeyboardCompatibleView = ({children}) => (
  <KeyboardCompatibleView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : -200}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
    {children}
  </KeyboardCompatibleView>
);
