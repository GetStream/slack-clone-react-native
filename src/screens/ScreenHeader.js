import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CopilotStep, walkthroughable} from 'react-native-copilot';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SCText} from '../components/SCText';
import {UserPicker} from '../components/UserPicker';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    borderRadius: 5,
    height: 35,
    marginRight: 20,
    width: 35,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
  },
});

const CopilotLogo = walkthroughable(TouchableOpacity);

export const ScreenHeader = ({showLogo = false, title}) => {
  const insets = useSafeAreaInsets();

  const {colors} = useTheme();
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.primary,
            height: 60 + insets.top,
            paddingTop: insets.top,
          },
        ]}>
        <CopilotStep
          name='hello'
          text='You can switch user by pressing on logo'>
          <CopilotLogo
            onPress={() => {
              setPickerVisible(true);
            }}>
            {showLogo && (
              <Image
                source={{
                  uri:
                    'https://avatars.githubusercontent.com/u/8597527?s=200&v=4',
                }}
                style={styles.logo}
              />
            )}
          </CopilotLogo>
        </CopilotStep>
        <SCText
          style={[
            styles.title,
            {
              color: colors.textInverted,
            },
          ]}>
          {title}
        </SCText>
      </View>
      <UserPicker
        label={'name'}
        modalVisible={pickerVisible}
        onRequestClose={() => setPickerVisible(false)}
        onValueChange={() => {
          setPickerVisible(false);
        }}
        value={'id'}
      />
    </>
  );
};
