import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AutoCompleteInput,
  FileUploadPreview,
  ImageUploadPreview,
  useChannelContext,
} from 'stream-chat-react-native';
import {useMessageInputContext} from 'stream-chat-react-native';

import {useKeyboard} from '../hooks/useKeaboard';
import {notImplemented} from '../utils';
import {getChannelDisplayName} from '../utils/channelUtils';
import {SCText} from './SCText';
import {SVGIcon} from './SVGIcon';
import {SendButton} from './SendButton';

const styles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    width: '100%',
  },
  buttonSection: {
    flexDirection: 'row',
  },
  container: {
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    width: '100%',
  },
  moreOptionsButton: {
    borderRadius: 10,
    padding: 1.5,
    paddingLeft: 6,
    paddingRight: 6,
  },
  moreOptionsLabel: {
    color: 'white',
    fontWeight: '900',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const InputBoxThread = () => {
  const {colors} = useTheme();
  const [leftMenuActive, setLeftMenuActive] = useState(true);
  const {channel} = useChannelContext();
  const {isOpen: isKeyboardOpen} = useKeyboard();
  const {
    openAttachmentPicker,
    openCommandsPicker,
    openFilePicker,
    openMentionsPicker,
    setSendThreadMessageInChannel,
  } = useMessageInputContext();
  const transform = useRef(new Animated.Value(0)).current;
  const translateMenuLeft = useRef(new Animated.Value(0)).current;
  const translateMenuRight = useRef(new Animated.Value(300)).current;
  const opacityMenuLeft = useRef(new Animated.Value(1)).current;
  const opacityMenuRight = useRef(new Animated.Value(0)).current;
  const isDM = !channel.data.name;
  const {additionalTextInputProps: contextAdditionalTextInputProps} =
    useMessageInputContext();
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
        {backgroundColor: colors.background, borderTopColor: colors.border},
      ]}>
      <View style={styles.row}>
        <AutoCompleteInput
          additionalTextInputProps={additionalTextInputProps}
        />
        {!isKeyboardOpen && <SendButton />}
      </View>
      <ImageUploadPreview />
      <FileUploadPreview />
      {isKeyboardOpen && (
        <View
          style={[
            styles.actionsContainer,
            {backgroundColor: colors.background},
          ]}>
          <Animated.View // Special animatable View
            style={{
              transform: [
                {
                  rotate: transform.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
                {perspective: 1000},
              ], // Bind opacity to animated value
            }}>
            <TouchableOpacity
              onPress={() => {
                Animated.parallel([
                  Animated.timing(transform, {
                    duration: 200,
                    toValue: leftMenuActive ? 180 : 0,
                    useNativeDriver: false,
                  }),
                  Animated.timing(translateMenuLeft, {
                    duration: 200,
                    toValue: leftMenuActive ? -300 : 0,
                    useNativeDriver: false,
                  }),
                  Animated.timing(translateMenuRight, {
                    duration: 200,
                    toValue: leftMenuActive ? 0 : 300,
                    useNativeDriver: false,
                  }),
                  Animated.timing(opacityMenuLeft, {
                    duration: leftMenuActive ? 50 : 200,
                    toValue: leftMenuActive ? 0 : 1,
                    useNativeDriver: false,
                  }),
                  Animated.timing(opacityMenuRight, {
                    duration: leftMenuActive ? 50 : 200,
                    toValue: leftMenuActive ? 1 : 0,
                    useNativeDriver: false,
                  }),
                ]).start();
                setLeftMenuActive(!leftMenuActive);
              }}
              style={[
                styles.moreOptionsButton,
                {
                  backgroundColor: colors.linkText,
                },
              ]}>
              <SCText style={styles.moreOptionsLabel}>{'<'}</SCText>
            </TouchableOpacity>
          </Animated.View>

          <View
            style={{
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 1,
              marginLeft: 20,
            }}>
            <Animated.View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                opacity: opacityMenuLeft,
                transform: [{translateX: translateMenuLeft}],
              }}>
              <CheckBox
                boxType='square'
                disabled={false}
                onValueChange={(newValue) =>
                  setSendThreadMessageInChannel(newValue)
                }
                style={{height: 15, width: 15}}
              />
              <SCText style={{fontSize: 14, marginLeft: 12}}>
                Also send to{' '}
                {isDM ? 'group' : getChannelDisplayName(channel, true)}
              </SCText>
            </Animated.View>
            <Animated.View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: opacityMenuRight,
                position: 'absolute',
                transform: [
                  {translateX: translateMenuRight},
                  {perspective: 1000},
                ],
                width: '100%',
              }}>
              <View
                style={[
                  styles.actionsContainer,
                  {backgroundColor: colors.background},
                ]}>
                <View style={[styles.row, styles.buttonSection]}>
                  <TouchableOpacity
                    onPress={openCommandsPicker}
                    style={styles.actionButton}>
                    <SVGIcon
                      height='18'
                      type={'input-buttons-shortcuts'}
                      width='18'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={openMentionsPicker}
                    style={styles.actionButton}>
                    <SVGIcon
                      height='18'
                      type={'input-buttons-mentions'}
                      width='18'
                    />
                  </TouchableOpacity>
                  {/* Text editor is not functional yet. We will cover it in some future tutorials */}
                  <TouchableOpacity
                    onPress={notImplemented}
                    style={styles.actionButton}>
                    <SVGIcon
                      height='18'
                      type={'input-buttons-formatting'}
                      width='18'
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, styles.buttonSection]}>
                  <TouchableOpacity
                    onPress={openFilePicker}
                    style={styles.actionButton}>
                    <SVGIcon height='18' type='file-attachment' width='18' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={openAttachmentPicker}
                    style={styles.actionButton}>
                    <SVGIcon height='21' type='image-attachment' width='18' />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
          <View style={styles.actionButton}>
            <SendButton />
          </View>
        </View>
      )}
    </View>
  );
};
