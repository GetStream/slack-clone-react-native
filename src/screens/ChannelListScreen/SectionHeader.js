import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
  },
  titleRightButton: {
    textAlignVertical: 'center',
  },
  titleRightButtonText: {
    fontSize: 25,
  },
});

export const SectionHeader = (props) => {
  const {onPress, title} = props;
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <SCText style={styles.title}>{title}</SCText>
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.titleRightButton}>
          <SCText style={styles.titleRightButtonText}>+</SCText>
        </TouchableOpacity>
      )}
    </View>
  );
};
