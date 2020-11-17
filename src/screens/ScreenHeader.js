import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {SVGIcon} from '../components/SVGIcon';
import {UserPicker} from '../components/UserPicker';
import {SCText} from '../components/SCText';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';

const CopilotLogo = walkthroughable(TouchableOpacity);

export const ScreenHeader = ({title, showLogo = false, start}) => {
  const navigation = useNavigation();
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
            height: 55 + insets.top,
            paddingTop: insets.top,
          },
        ]}>
        <CopilotStep
          text="You can switch user by pressing on logo"
          name="hello">
          <CopilotLogo
            onPress={() => {
              setPickerVisible(true);
            }}>
            {showLogo && (
              <Image
                source={{
                  uri:
                    'data:image/png;base64,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',
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MessageSearchScreen');
          }}
          style={styles.searchIconContainer}>
          <SVGIcon height="25" width="25" type="global-search" />
        </TouchableOpacity>
      </View>
      <UserPicker
        // ref={instance => (simplePicker.current = instance)}
        modalVisible={pickerVisible}
        onRequestClose={() => setPickerVisible(false)}
        label={'name'}
        onValueChange={userId => {
          setPickerVisible(false);
        }}
        value={'id'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: 30,
    width: 30,
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  searchIconContainer: {
    // flex: 1,
    // height: '100%',
    // right: 20,
    // top: 15,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
});
