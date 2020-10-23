import React from 'react';
import {Platform} from 'react-native';
import {KeyboardCompatibleView} from 'stream-chat-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CustomKeyboardCompatibleView = ({children}) => {
    const insets = useSafeAreaInsets();

    const iosVerticalOffset = insets.bottom > 0 ? 120 : 100;
  return (
    <KeyboardCompatibleView
      keyboardVerticalOffset={Platform.OS === 'ios' ? iosVerticalOffset : -200}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      {children}
    </KeyboardCompatibleView>
  );
};
