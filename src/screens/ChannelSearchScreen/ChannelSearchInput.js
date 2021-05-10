import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
  cancelButton: {
    alignSelf: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  inputBox: {
    borderRadius: 6,
    borderWidth: 0.5,
    elevation: 2,
    flex: 1,
    margin: 3,
    padding: 15,
  },
});

export const ChannelSearchInput = (props) => {
  const {onSubmit} = props;
  const {colors, dark} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TextInput
        autoFocus
        onSubmitEditing={onSubmit}
        placeholder='Search'
        placeholderTextColor={colors.text}
        returnKeyType='search'
        style={[
          styles.inputBox,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: dark ? 1 : 0.5,
            color: colors.text,
          },
        ]}
      />
      <TouchableOpacity onPress={navigation.goBack} style={styles.cancelButton}>
        <SCText>Cancel</SCText>
      </TouchableOpacity>
    </View>
  );
};
