import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {SVGIcon} from './SVGIcon';

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      hitSlop={{
        bottom: 100,
        left: 100,
        right: 100,
        top: 100,
      }}
      onPress={navigation.goBack}
      style={{
        height: 20,
        width: 40,
      }}>
      <SVGIcon type={'back-button'} />
    </TouchableOpacity>
  );
};
