import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native';

import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
  cancelButton: {justifyContent: 'center', padding: 5},
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 0.5,
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
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}>
      <TextInput
        autoFocus
        clearButtonMode={'while-editing'}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder='Search for message'
        placeholderTextColor={colors.text}
        ref={fRef}
        returnKeyType='search'
        style={[
          styles.inputBox,
          {
            backgroundColor: dark ? '#363639' : '#dcdcdc',
            borderColor: dark ? '#212527' : '#D3D3D3',
            color: colors.text,
          },
        ]}
        value={value}
      />
      <TouchableOpacity onPress={navigation.goBack} style={styles.cancelButton}>
        <SCText>Cancel</SCText>
      </TouchableOpacity>
    </View>
  );
});
