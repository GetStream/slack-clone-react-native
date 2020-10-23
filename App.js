import React from 'react';
import {View, StyleSheet, TouchableOpacity, LogBox} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {useTheme} from '@react-navigation/native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StreamChat} from 'stream-chat';

import {ChannelScreen} from './src/screens/ChannelScreen';
import {NewMessageScreen} from './src/screens/NewMessageScreen';
import {ChannelSearchScreen} from './src/screens/ChannelSearchScreen';
import {ChatClientService, SCText, theme} from './src/utils';
import {ChannelListScreen} from './src/screens/ChannelListScreen';
import {DraftsScreen} from './src/screens/DraftsScreen';
import {MentionsScreen} from './src/screens/MentionsSearch';
import {DirectMessagesScreen} from './src/screens/DirectMessagesScreen';
import {TargettedMessageChannelScreen} from './src/screens/TargettedMessageChannelScreen';
import {MessageSearchScreen} from './src/screens/MessageSearchScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';

import {SVGIcon} from './src/components/SVGIcon';
import { ThreadScreen } from './src/screens/ThreadScreen';

LogBox.ignoreAllLogs(true);

const chatClient = new StreamChat('q95x9hkbyd6p', {
  timeout: 10000,
});
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal Narkhede',
  image: 'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-31658896398c-512',
  status: '🍺',
};

chatClient.setUser(user, userToken);
ChatClientService.setClient(chatClient);

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
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
        paddingBottom: 20,
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
}

const HomeStack = createStackNavigator();
const ModalStack = createStackNavigator();

const ModalStackNavigator = props => {
  return (
    <ModalStack.Navigator initialRouteName="Home" mode="modal">
      <ModalStack.Screen
        name="Tabs"
        component={MyTabs}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="ChannelSearchScreen"
        component={ChannelSearchScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="MessageSearchScreen"
        component={MessageSearchScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="TargettedMessageChannelScreen"
        component={TargettedMessageChannelScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </ModalStack.Navigator>
  );
};

const HomeStackNavigator = props => {
  return (
    <HomeStack.Navigator initialRouteName="ModalStack">
      <HomeStack.Screen
        name="ModalStack"
        component={ModalStackNavigator}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="DraftsScreen"
        component={DraftsScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="ThreadScreen"
        component={ThreadScreen}
        initialParams={{
          chatClient,
        }}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </HomeStack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="home" component={ChannelListScreen} />
      <Tab.Screen name={'dms'} component={DirectMessagesScreen} />
      <Tab.Screen name={'mentions'} component={MentionsScreen} />
      <Tab.Screen name={'you'} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const MyDarkTheme = {
  dark: true,
  colors: {
    primary: '#121115',
    background: '#19181c',
    backgroundSecondary: '#212527',
    card: 'rgb(255, 255, 255)',
    text: '#d8d8d9',
    textInverted: '#d8d8d9',
    dimmedText: '#303236',
    boldText: '#D0D0D0',
    linkText: '#1E75BE',
    shadow: '#232327',
    border: '#252529',
    notification: 'rgb(255, 69, 58)',
  },
};
const MyLightTheme = {
  dark: false,
  colors: {
    primary: '#3E3139',
    background: 'white',
    backgroundSecondary: '#E9E9E9',
    card: 'rgb(255, 255, 255)',
    text: 'black',
    textInverted: 'white',
    dimmedText: '#979A9A',
    boldText: 'black',
    linkText: '#1E75BE',
    shadow: '#000',
    border: '#D3D3D3',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
        <View style={styles.container}>
          <HomeStackNavigator />
        </View>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

const styles = StyleSheet.create({
  channelScreenSaveAreaView: {
    backgroundColor: 'white',
  },
  channelScreenContainer: {flexDirection: 'column', height: '100%'},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  chatContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
});
