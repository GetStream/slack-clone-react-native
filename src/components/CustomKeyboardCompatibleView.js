import React from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardCompatibleView} from 'stream-chat-react-native';

export const CustomKeyboardCompatibleView = ({children}) => {
  const insets = useSafeAreaInsets();

  const iosVerticalOffset = insets.bottom > 0 ? 100 : 0;
  return (
    <KeyboardCompatibleView
      keyboardVerticalOffset={Platform.OS === 'ios' ? iosVerticalOffset : -200}>
      {children}
    </KeyboardCompatibleView>
  );
};
