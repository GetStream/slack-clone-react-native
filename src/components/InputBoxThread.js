import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  AutoCompleteInput,
  SendButton,
  useChannelContext,
} from 'stream-chat-react-native';
import {useMessageInputContext} from 'stream-chat-react-native';

import {getChannelDisplayName, notImplemented} from '../utils';
import {SCText} from './SCText';
import {SVGIcon} from './SVGIcon';

const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    height: 80,
    padding: 10,
    width: '100%',
  },
  fileAttachmentIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageAttachmentIcon: {
    alignSelf: 'flex-end',
    marginLeft: 10,
    marginRight: 10,
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
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  textActionLabel: {
    fontSize: 18,
  },
  textEditorContainer: {
    marginLeft: 10,
  },
});

export const InputBoxThread = (props) => {
  const {colors} = useTheme();
  const [leftMenuActive, setLeftMenuActive] = useState(true);
  const {channel} = useChannelContext();
  const {
    openFilePicker,
    openMentionsPicker,
    toggleAttachmentPicker,
  } = useMessageInputContext();
  const transform = useRef(new Animated.Value(0)).current;
  const translateMenuLeft = useRef(new Animated.Value(0)).current;
  const translateMenuRight = useRef(new Animated.Value(300)).current;
  const opacityMenuLeft = useRef(new Animated.Value(1)).current;
  const opacityMenuRight = useRef(new Animated.Value(0)).current;
  const isDM = !channel.data.name;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AutoCompleteInput {...props} />
      <View
        style={[styles.actionsContainer, {backgroundColor: colors.background}]}>
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
                props.setSendMessageInChannel(newValue)
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
            <View style={styles.row}>
              <TouchableOpacity onPress={openMentionsPicker}>
                <SCText style={styles.textActionLabel}>@</SCText>
              </TouchableOpacity>
              {/* Text editor is not functional yet. We will cover it in some future tutorials */}
              <TouchableOpacity
                onPress={notImplemented}
                style={styles.textEditorContainer}>
                <SCText style={styles.textActionLabel}>Aa</SCText>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {
                  justifyContent: 'flex-end',
                },
              ]}>
              <TouchableOpacity
                onPress={openFilePicker}
                style={styles.fileAttachmentIcon}>
                <SVGIcon height='18' type='file-attachment' width='18' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleAttachmentPicker}
                style={styles.imageAttachmentIcon}>
                <SVGIcon height='18' type='image-attachment' width='18' />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        <SendButton {...props} />
      </View>
    </View>
  );
};
