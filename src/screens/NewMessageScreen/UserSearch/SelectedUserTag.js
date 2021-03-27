import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {SCText} from '../../../components/SCText';

const styles = StyleSheet.create({
  blurredTagText: {
    color: '#0080ff',
  },
  tagContainer: {
    borderRadius: 3,
    flexDirection: 'row',
    margin: 2,
    paddingRight: 5,
  },
  tagImage: {
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    height: 25,
    width: 25,
  },
  tagText: {
    alignSelf: 'center',
    fontSize: 14,
    paddingLeft: 10,
  },
});

export const SelectedUserTag = ({active, index, onPress, tag}) => {
  const {dark} = useTheme();
  if (!active) {
    return (
      <SCText onPress={onPress} style={styles.blurredTagText}>
        {tag.name},{' '}
      </SCText>
    );
  }
  return (
    <TouchableOpacity
      key={`${tag}-${index}`}
      onPress={onPress}
      style={[
        styles.tagContainer,
        {backgroundColor: dark ? '#152E44' : '#c4e2ff'},
      ]}>
      <Image
        source={{
          uri: tag.image,
        }}
        style={styles.tagImage}
      />

      <SCText
        style={[
          styles.tagText,
          {
            color: dark ? '#E5F5F9' : 'black',
          },
        ]}>
        {tag.name}
      </SCText>
    </TouchableOpacity>
  );
};
