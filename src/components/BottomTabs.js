import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';
import {SCText} from './SCText';

export const BottomTabs = ({state, descriptors, navigation}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const getTitle = key => {
    switch (key) {
      case 'home':
        return {
          icon: <SVGIcon type="home-tab" width={25} height={25} />,
          iconActive: <SVGIcon type="home-tab-active" width={25} height={25} />,
          subtitle: 'Home',
        };
      case 'dms':
        return {
          icon: <SVGIcon type="dm-tab" width={25} height={25} />,
          iconActive: <SVGIcon type="dm-tab-active" width={25} height={25} />,
          subtitle: 'DMs',
        };
      case 'mentions':
        return {
          icon: <SVGIcon type="mentions-tab" width={25} height={25} />,
          iconActive: (
            <SVGIcon type="mentions-tab-active" width={25} height={25} />
          ),
          subtitle: 'Mention',
        };
      case 'you':
        return {
          icon: <SVGIcon type="you-tab" width={25} height={25} />,
          iconActive: <SVGIcon type="you-tab-active" width={25} height={25} />,
          subtitle: 'You',
        };
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderTopColor: colors.border,
        borderTopWidth: 0.5,
        paddingBottom: insets.bottom,
      }}>
      {state.routes.map((route, index) => {
        const tab = getTitle(route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            style={{
              flex: 1,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isFocused ? tab.iconActive : tab.icon}
            <SCText style={{fontSize: 12}}>{tab.subtitle}</SCText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
