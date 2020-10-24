import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Modal, View, Text, Animated, TouchableOpacity} from 'react-native';
import {SCText} from './SCText';
import ReactNativeHaptic from 'react-native-haptic';

export const ReactionPicker = props => {
  const {
    dismissReactionPicker,
    handleReaction,
    reactionPickerVisible,
    supportedReactions,
  } = props;
  const {colors} = useTheme();
  const slide = useRef(new Animated.Value(-600)).current;
  const _dismissReactionPicker = () => {
    Animated.timing(slide, {
      toValue: -600,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      dismissReactionPicker();
    });
  };

  const _handleReaction = type => {
    ReactNativeHaptic.generate('impact');

    Animated.timing(slide, {
      toValue: -600,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      handleReaction(type);
    });
  };

  useEffect(() => {
    if (reactionPickerVisible) {
      ReactNativeHaptic.generate('impact');
      setTimeout(() => {
        Animated.timing(slide, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }, 200);
    }
  });
  if (!reactionPickerVisible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={_dismissReactionPicker}
      testID="reaction-picker"
      transparent
      visible>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'flex-end',
          alignItems: 'flex-start',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
        activeOpacity={1}
        leftAlign
        onPress={() => {
          console.warn('dismissReactionPicker');
          _dismissReactionPicker();
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: slide,
          backgroundColor: 'transparent',
        }}
        activeOpacity={1}
        leftAlign>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderRadius: 15,
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          <SCText>Frequently Used</SCText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}>
            {supportedReactions.map(({icon, id}) => {
              return (
                <View
                  key={id}
                  testID={id}
                  style={{
                    alignItems: 'center',
                    marginTop: -5,
                  }}>
                  <Text
                    onPress={() => _handleReaction(id)}
                    testID={`${id}-reaction`}
                    style={{
                      fontSize: 38,
                      margin: 8,
                      marginVertical: 5,
                    }}>
                    {icon}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};
