import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SCText} from './SCText';
import {SVGIcon} from './SVGIcon';

export const BottomTabs = ({navigation, state}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const getTitle = (key) => {
    // eslint-disable-next-line default-case
    switch (key) {
      case 'home':
        return {
          icon: <SVGIcon height={25} type='home-tab' width={25} />,
          iconActive: <SVGIcon height={25} type='home-tab-active' width={25} />,
          title: 'Home',
        };
      case 'dms':
        return {
          icon: <SVGIcon height={25} type='dm-tab' width={25} />,
          iconActive: <SVGIcon height={25} type='dm-tab-active' width={25} />,
          title: 'DMs',
        };
      case 'mentions':
        return {
          icon: <SVGIcon height={25} type='mentions-tab' width={25} />,
          iconActive: (
            <SVGIcon height={25} type='mentions-tab-active' width={25} />
          ),
          title: 'Mention',
        };
      case 'search':
        return {
          icon: <SVGIcon height={25} type='global-search' width={25} />,
          iconActive: (
            <SVGIcon height={25} type='global-search-selected' width={25} />
          ),
          title: 'Mention',
        };
      case 'you':
        return {
          icon: <SVGIcon height={25} type='you-tab' width={25} />,
          iconActive: <SVGIcon height={25} type='you-tab-active' width={25} />,
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
            target: route.key,
            type: 'tabPress',
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={styles.tabContainer}>
            {isFocused ? tab.iconActive : tab.icon}
            <SCText style={styles.tabTitle}>{tab.title}</SCText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  tabListContainer: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  tabTitle: {
    fontSize: 12,
  },
});
