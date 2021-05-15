import React from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardCompatibleView} from 'stream-chat-react-native';

import {HEADER_HEIGHT} from '../utils';

export const CustomKeyboardCompatibleView = ({children, isThread}) => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'android') {
    return children;
  }

  const iosVerticalOffset = insets.bottom + HEADER_HEIGHT + (isThread ? 10 : 0);
  return (
    <KeyboardCompatibleView keyboardVerticalOffset={iosVerticalOffset}>
      {children}
    </KeyboardCompatibleView>
  );
};
