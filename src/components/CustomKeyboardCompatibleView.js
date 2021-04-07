import React from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardCompatibleView} from 'stream-chat-react-native';

export const CustomKeyboardCompatibleView = ({children}) => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'android') {
    return children;
  }

  const iosVerticalOffset = insets.bottom > 0 ? 60 : 0;

  return (
    <KeyboardCompatibleView
      keyboardVerticalOffset={iosVerticalOffset}>
      {children}
    </KeyboardCompatibleView>
  );
};
