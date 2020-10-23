import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  LogBox,
} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {useTheme} from '@react-navigation/native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StreamChat} from 'stream-chat';

import {ChannelScreen} from './src/screens/ChannelScreen';
import {NewMessageScreen} from './src/screens/NewMessageScreen';
import {ChannelSearchScreen} from './src/screens/ChannelSearchScreen';
import {ChatUserContext, ChatClientService, SCText, theme} from './src/utils';
import {ChannelListScreen} from './src/screens/ChannelListScreen';
import {DraftsScreen} from './src/screens/DraftsScreen';
import {MentionsScreen} from './src/screens/MentionsSearch';
import {DirectMessagesScreen} from './src/screens/DirectMessagesScreen';
import {TargettedMessageChannelScreen} from './src/screens/TargettedMessageChannelScreen';
import {MessageSearchScreen} from './src/screens/MessageSearchScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';

import {SVGIcon} from './src/components/SVGIcon';
import {ThreadScreen} from './src/screens/ThreadScreen';

// LogBox.ignoreAllLogs(true);

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
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="ChannelSearchScreen"
        component={ChannelSearchScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="MessageSearchScreen"
        component={MessageSearchScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <ModalStack.Screen
        name="TargettedMessageChannelScreen"
        component={TargettedMessageChannelScreen}
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
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="DraftsScreen"
        component={DraftsScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
      <HomeStack.Screen
        name="ThreadScreen"
        component={ThreadScreen}
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

const USER_TOKENS = {
  vishal:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk',
  thierry:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGhpZXJyeSJ9.iyGzbWInSA6B-0CE1Q9_lPOWjHvrWX3ypDhLYAL1UUs',
};
const USERS = {
  vishal: {
    id: 'vishal',
    name: 'Vishal',
  },
  thierry: {
    id: 'thierry',
    name: 'Thierry',
  },
};
export default function App() {
  const scheme = useColorScheme();
  const [connecting, setConnecting] = useState(true);
  const [chatClient, setChatClient] = useState(null);
  const [user, setUser] = useState(USERS.vishal);

  useEffect(() => {
    let client;

    const initChat = async () => {
      client = new StreamChat('q95x9hkbyd6p', {
        timeout: 10000,
      });

      await client.setUser(user, USER_TOKENS[user.id]);
      setChatClient(client);
      ChatClientService.setClient(client);
      setConnecting(false);
    };

    setConnecting(true);
    initChat();

    return () => {
      chatClient && chatClient.disconnect();
    };
  }, [user]);

  if (connecting) {
    return (
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color="black" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
        <View style={styles.container}>
          <ChatUserContext.Provider
            value={{
              chatClient,
              switchUser: userId => setUser(USERS[userId]),
            }}>
            <HomeStackNavigator />
          </ChatUserContext.Provider>
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
