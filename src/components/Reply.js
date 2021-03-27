import {useTheme} from '@react-navigation/native';
import Dayjs from 'dayjs';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {SCText} from './SCText';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  message: {
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  userName: {
    fontWeight: '700',
    marginLeft: 7,
  },
});

export const Reply = ({message, onPress}) => {
  const {colors} = useTheme();

  if (!message) return null;

  const imageAttachment = message.attachments?.find((a) => a.type === 'image');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        !message
          ? {
              borderLeftColor: colors.grey_gainsboro,
              borderLeftWidth: 5,
            }
          : undefined,
      ]}>
      <View style={styles.row}>
        <Image
          source={{
            uri: message.user.image,
          }}
          style={{
            borderRadius: 4,
            height: 20,
            width: 20,
          }}
        />
        <SCText style={styles.userName}>{message.user.name}</SCText>
      </View>
      <Text style={styles.message}>{message.text}</Text>
      {!!imageAttachment && <Text>Image from iOS</Text>}
      <Text
        style={{
          color: colors.grey,
        }}>
        {Dayjs(message.created_at).format('ll')}
      </Text>
    </TouchableOpacity>
  );
};
