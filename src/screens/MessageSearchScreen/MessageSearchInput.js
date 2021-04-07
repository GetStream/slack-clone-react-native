import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native';

import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
  cancelButton: {
    justifyContent: 'center',
    padding: 5
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  inputBox: {
    borderRadius: 10,
    flex: 1,
    margin: 3,
    padding: 10,
  },
});

export const MessageSearchInput = React.forwardRef((props, fRef) => {
  const {onChangeText, onSubmit: propOnSubmit, value} = props;
  const {colors, dark} = useTheme();
  const navigation = useNavigation();

  const onSubmit = ({nativeEvent: {text}}) => {
    propOnSubmit(text);
  };

  return (
    <View
      style={[
        styles.headerContainer,
      ]}>
      <TextInput
        autoFocus
        clearButtonMode={'while-editing'}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder='Search for message'
        placeholderTextColor={colors.textInverted}
        ref={fRef}
        returnKeyType='search'
        style={[
          styles.inputBox,
          {
            backgroundColor: colors.primaryLight,
            color: colors.textInverted,
          },
        ]}
        value={value}
      />
      <TouchableOpacity onPress={navigation.goBack} style={styles.cancelButton}>
        <SCText style={{
          color: 'grey'
        }}>Cancel</SCText>
      </TouchableOpacity>
    </View>
  );
});
