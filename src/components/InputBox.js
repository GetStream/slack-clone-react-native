import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {
  AutoCompleteInput,
  AttachButton,
  SendButton,
  ThemeProvider,
} from 'stream-chat-react-native';
import {SCText, isDark} from '../utils';

import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';

export const InputBox = props => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <AutoCompleteInput {...props} />
      <View
        style={[styles.actionsContainer, {backgroundColor: colors.background}]}>
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
        <View style={styles.row}>
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
          <SendButton {...props} />
        </View>
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
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row'},
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
