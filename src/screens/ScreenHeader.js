import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {SCText, theme, isDark} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {SVGIcon} from '../components/SVGIcon';

export const ScreenHeader = ({title}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
        },
      ]}>
      <SCText style={styles.title}>{title}</SCText>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MessageSearchScreen');
        }}
        style={styles.searchIconContainer}>
        <SVGIcon height="25" width="25" type="global-search" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 92,
    paddingTop: 30,
    backgroundColor: isDark() ? '#121115' : '#3F0E40',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: isDark() ? '#D3D2D6' : 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  searchIconContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    right: 20,
    top: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
