import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
  groupTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  groupTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 14,
  },
  groupTitleRightButton: {
    textAlignVertical: 'center',
  },
  groupTitleRightButtonText: {
    fontSize: 25,
  },
});

export const SectionHeader = (props) => {
  const {onPress, title} = props;
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.groupTitleContainer,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <SCText style={styles.groupTitle}>{title}</SCText>
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.groupTitleRightButton}>
          <SCText style={styles.groupTitleRightButtonText}>+</SCText>
        </TouchableOpacity>
      )}
    </View>
  );
};
