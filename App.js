import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StreamChat} from 'stream-chat';

import {ChannelScreen} from './src/screens/ChannelScreen';
import {NewMessageScreen} from './src/screens/NewMessageScreen';
import {ChannelSearchScreen} from './src/screens/ChannelSearchScreen';
import {
  ChatUserContext,
  ChatClientService,
  USER_TOKENS,
  USERS,
} from './src/utils';
import {ChannelListScreen} from './src/screens/ChannelListScreen';
import {DraftsScreen} from './src/screens/DraftsScreen';
import {MentionsScreen} from './src/screens/MentionsSearch';
import {DirectMessagesScreen} from './src/screens/DirectMessagesScreen';
import {TargettedMessageChannelScreen} from './src/screens/TargettedMessageChannelScreen';
import {MessageSearchScreen} from './src/screens/MessageSearchScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';

import {ThreadScreen} from './src/screens/ThreadScreen';

import {BottomTabs} from './src/components/BottomTabs';
import {DarkTheme, LightTheme} from './src/appTheme';

// LogBox.ignoreAllLogs(true);

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default () => {
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
    <SafeAreaProvider>
      <AppearanceProvider>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
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
    </SafeAreaProvider>
  );
};

const ModalStackNavigator = props => {
  return (
    <ModalStack.Navigator initialRouteName="Home" mode="modal">
      <ModalStack.Screen
        name="Tabs"
        component={TabNavigation}
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

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabs {...props} />}>
      <Tab.Screen name="home" component={ChannelListScreen} />
      <Tab.Screen name={'dms'} component={DirectMessagesScreen} />
      <Tab.Screen name={'mentions'} component={MentionsScreen} />
      <Tab.Screen name={'you'} component={ProfileScreen} />
    </Tab.Navigator>
  );
};


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
