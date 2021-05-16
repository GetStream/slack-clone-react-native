import {useTheme} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  AutoCompleteInput,
  FileUploadPreview,
  ImageUploadPreview,
  useChannelContext,
  useMessageInputContext,
} from 'stream-chat-react-native';

import {useKeyboard} from '../hooks/useKeaboard';
import {notImplemented} from '../utils';
import {SVGIcon} from './SVGIcon';
import {SendButton} from './SendButton';

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  autoCompleteInput: {
    minHeight: 25,
  },
  buttonSection: {
    width: 100,
  },
  container: {
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    width: '100%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textActionLabel: {
    fontSize: 18,
  },
});

export const InputBox = () => {
  const {colors} = useTheme();
  const {channel} = useChannelContext();
  const {
    openAttachmentPicker,
    openCommandsPicker,
    openFilePicker,
    openMentionsPicker,
  } = useMessageInputContext();
  const {
    additionalTextInputProps: contextAdditionalTextInputProps,
  } = useMessageInputContext();
  const {isOpen: isKeyboardOpen} = useKeyboard();
  const [textHeight, setTextHeight] = useState(0);

  const additionalTextInputProps = useMemo(
    () => ({
      ...contextAdditionalTextInputProps,
      onContentSizeChange: ({
        nativeEvent: {
          contentSize: {height},
        },
      }) => {
        if (!textHeight) {
          try {
            setTextHeight(height);
          } catch (_) {
            // do nothing
          }
        }
      },
      placeholder:
        channel && channel.data.name
          ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
          : 'Message',
      placeholderTextColor: '#979A9A',
      style: [
        {
          color: colors.text,
          maxHeight: (textHeight || 17) * 4,
        },
        styles.autoCompleteInput,
      ],
    }),
    [channel?.id, textHeight],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      ]}>
      <View style={styles.row}>
        <AutoCompleteInput
          additionalTextInputProps={additionalTextInputProps}
        />
        {!isKeyboardOpen && <SendButton />}
      </View>
      <ImageUploadPreview />
      <FileUploadPreview />
      {!!isKeyboardOpen && (
        <View
          style={[
            styles.actionsContainer,
            {backgroundColor: colors.background},
          ]}>
          <View style={[styles.row, styles.buttonSection]}>
            <TouchableOpacity onPress={openCommandsPicker}>
              <SVGIcon
                height='18'
                type={'input-buttons-shortcuts'}
                width='18'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openMentionsPicker}>
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
          <View style={[styles.row, styles.buttonSection]}>
            <TouchableOpacity onPress={openFilePicker}>
              <SVGIcon height='18' type='file-attachment' width='18' />
            </TouchableOpacity>
            <TouchableOpacity onPress={openAttachmentPicker}>
              <SVGIcon height='21' type='image-attachment' width='18' />
            </TouchableOpacity>
            <SendButton />
          </View>
        </View>
      )}
    </View>
  );
};
