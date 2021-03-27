import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  AutoCompleteInput,
  SendButton,
  useChannelContext,
} from 'stream-chat-react-native';

import {useKeyboard} from '../hooks/useKeaboard';
import {notImplemented} from '../utils';
import {SVGIcon} from './SVGIcon';

export const InputBox = (props) => {
  const {colors} = useTheme();
  const {channel} = useChannelContext();
  const {isOpen: isKeyboardOpen} = useKeyboard();
  const [textHeight, setTextHeight] = useState(0);
  const onContentSizeChange = ({
    nativeEvent: {
      contentSize: {height},
    },
  }) => {
    if (!textHeight) {
      setTextHeight(height);
    }
  };
  const additionalTextInputProps = {
    onContentSizeChange,
    placeholder:
      channel && channel.data.name
        ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
        : 'Message',
    placeholderTextColor: '#979A9A',
    style: [
      {
        maxHeight: (textHeight || 17) * 4,
        minHeight: 30,
      },
    ],
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AutoCompleteInput
        {...props}
        additionalTextInputProps={additionalTextInputProps}
      />
      {!!isKeyboardOpen && (
        <View
          style={[
            styles.actionsContainer,
            {backgroundColor: colors.background},
          ]}>
          <View style={styles.row}>
            <TouchableOpacity onPress={props.openCommandsPicker}>
              <SVGIcon
                height='18'
                type={'input-buttons-shortcuts'}
                width='18'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.openMentionsPicker}>
              <SVGIcon height='18' type={'input-buttons-mentions'} width='18' />
            </TouchableOpacity>
            {/* Text editor is not functional yet. We will cover it in some future tutorials */}
            <TouchableOpacity onPress={notImplemented}>
              <SVGIcon
                height='18'
                type={'input-buttons-formatting'}
                width='18'
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={props.openFilePicker}>
              <SVGIcon height='18' type='file-attachment' width='18' />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.openAttachmentPicker}>
              <SVGIcon height='21' type='image-attachment' width='18' />
            </TouchableOpacity>
            <TouchableOpacity onPress={notImplemented}>
              <SVGIcon
                height='18'
                type={'send-button'}
                fill={'#1F629E'}
                width='18'
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  inputContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  textActionLabel: {
    fontSize: 18,
  },
});
