import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SVGIcon} from './SVGIcon';

export const NewMessageBubble = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Modals', {
          screen: 'NewMessageScreen',
        });
      }}
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
        },
      ]}>
      <SVGIcon height={51} type='new-message' width={51} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 1,
    bottom: 30,
    elevation: 8,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    width: 50,
  },
});
