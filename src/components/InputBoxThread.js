import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Animated,
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import {
  AutoCompleteInput,
  AttachButton,
  SendButton,
  ThemeProvider,
  useChannelContext,
} from 'stream-chat-react-native';
import {SCText, isDark, getChannelDisplayName} from '../utils';

import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';
import CheckBox from '@react-native-community/checkbox';

export const InputBoxThread = props => {
  const {colors} = useTheme();
  const [leftMenuActive, setLeftMenuActive] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {channel} = useChannelContext();
  const transform = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const translateMenuLeft = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const translateMenuRight = useRef(new Animated.Value(300)).current; // Initial value for opacity: 0
  const opacityMenuLeft = useRef(new Animated.Value(1)).current;
  const opacityMenuRight = useRef(new Animated.Value(0)).current;
  const isDirectMessagingConversation = !channel.data.name;

  // console.warn(translateMenuLeft);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AutoCompleteInput {...props} />
      <View
        style={[styles.actionsContainer, {backgroundColor: colors.background}]}>
        <Animated.View // Special animatable View
          style={{
            transform: [{rotate: transform}, {perspective: 1000}], // Bind opacity to animated value
          }}>
          <TouchableOpacity
            onPress={() => {
              Animated.parallel([
                Animated.timing(transform, {
                  toValue: leftMenuActive ? 3.15 : 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(translateMenuLeft, {
                  toValue: leftMenuActive ? -300 : 0,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(translateMenuRight, {
                  toValue: leftMenuActive ? 0 : 300,
                  duration: 200,
                  useNativeDriver: false,
                }),
                Animated.timing(opacityMenuLeft, {
                  toValue: leftMenuActive ? 0 : 1,
                  duration: leftMenuActive ? 50 : 200,
                  useNativeDriver: false,
                }),
                Animated.timing(opacityMenuRight, {
                  toValue: leftMenuActive ? 1 : 0,
                  duration: leftMenuActive ? 50 : 200,
                  useNativeDriver: false,
                }),
              ]).start();
              setLeftMenuActive(!leftMenuActive);
            }}
            style={[
              {
                padding: 1.5,
                paddingRight: 6,
                paddingLeft: 6,
                borderRadius: 10,
                backgroundColor: colors.linkText,
              },
            ]}>
            <SCText style={{fontWeight: '900', color: 'white'}}>{'<'}</SCText>
          </TouchableOpacity>
        </Animated.View>

        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <Animated.View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              transform: [{translateX: translateMenuLeft}],
              opacity: opacityMenuLeft,
            }}>
            <CheckBox
              boxType="square"
              disabled={false}
              style={{width: 15, height: 15}}
              value={toggleCheckBox}
              onValueChange={newValue =>
                props.setSendMessageInChannel(newValue)
              }
            />
            <SCText style={{marginLeft: 12, fontSize: 14}}>
              Also send to{' '}
              {isDirectMessagingConversation
                ? 'group'
                : getChannelDisplayName(channel, true)}
            </SCText>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              transform: [
                {translateX: translateMenuRight},
                {perspective: 1000},
              ],
              opacity: opacityMenuRight,
            }}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  props.appendText('@');
                }}>
                <SCText style={styles.textActionLabel}>@</SCText>
              </TouchableOpacity>
              {/* Text editor is not functional yet. We will cover it in some future tutorials */}
              <TouchableOpacity style={styles.textEditorContainer}>
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
                onPress={props._pickFile}
                style={styles.fileAttachmentIcon}>
                <SVGIcon type="file-attachment" height="18" width="18" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props._pickImage}
                style={styles.imageAttachmentIcon}>
                <SVGIcon type="image-attachment" height="18" width="18" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        <SendButton
          {...props}
          sendMessage={() => {
            props.sendMessage(props.channel);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: 60,
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
  fileAttachmentIcon: {
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
  imageAttachmentIcon: {
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
});
