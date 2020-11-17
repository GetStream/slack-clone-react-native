import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation, useTheme} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';
import {SCText} from './SCText';

export const BottomTabs = ({state, navigation}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const getTitle = key => {
    switch (key) {
      case 'home':
        return {
          icon: <SVGIcon type="home-tab" width={25} height={25} />,
          iconActive: <SVGIcon type="home-tab-active" width={25} height={25} />,
          title: 'Home',
        };
      case 'dms':
        return {
          icon: <SVGIcon type="dm-tab" width={25} height={25} />,
          iconActive: <SVGIcon type="dm-tab-active" width={25} height={25} />,
          title: 'DMs',
        };
      case 'mentions':
        return {
          icon: <SVGIcon type="mentions-tab" width={25} height={25} />,
          iconActive: (
            <SVGIcon type="mentions-tab-active" width={25} height={25} />
          ),
          title: 'Mention',
        };
      case 'you':
        return {
          icon: <SVGIcon type="you-tab" width={25} height={25} />,
          iconActive: <SVGIcon type="you-tab-active" width={25} height={25} />,
          title: 'You',
        };
    }
  };
  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom,
        },
        styles.tabListContainer,
      ]}>
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
          <TouchableOpacity onPress={onPress} style={styles.tabContainer}>
            {isFocused ? tab.iconActive : tab.icon}
            <SCText style={styles.tabTitle}>{tab.title}</SCText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabListContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },
  tabContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitle: {
    fontSize: 12,
  },
});
