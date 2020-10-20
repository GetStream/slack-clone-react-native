import {ChannelHeader} from './src/components/ChannelHeader';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  LogBox,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {KeyboardCompatibleView} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {
  Chat,
  MessageList,
  MessageInput,
  Channel,
} from 'stream-chat-react-native';
import {NewMessageScreenHeader} from './src/components/NewMessageScreenHeader';
import {ChannelScreen} from './src/screens/ChannelScreen';
import {NewMessageScreen} from './src/screens/NewMessageScreen';
import {ChannelSearchScreen} from './src/screens/ChannelSearchScreen';
import {ChatClientService} from './src/utils';
import {ChannelListScreen} from './src/screens/ChannelListScreen';
import {DraftsScreen} from './src/screens/DraftsScreen';
import {MentionsScreen} from './src/screens/MentionsSearch';
import {DirectMessagesScreen} from './src/screens/DirectMessagesScreen';
import {TargettedMessageChannelScreen} from './src/screens/TargettedMessageChannelScreen';

import DMTabIcon from './src/images/tab-bar/dm.svg';
import DMTabIconActive from './src/images/tab-bar/dm-selected.svg';
import HomeTabIcon from './src/images/tab-bar/home.svg';
import HomeTabIconActive from './src/images/tab-bar/home-selected.svg';
import MentionsTabIcon from './src/images/tab-bar/mentions.svg';
import MentionsTabIconActive from './src/images/tab-bar/mentions-selected.svg';
import YouTabIcon from './src/images/tab-bar/you.svg';
import YouTabIconActive from './src/images/tab-bar/you-selected.svg';
import { MessageSearchScreen } from './src/screens/MessageSearchScreen';

LogBox.ignoreAllLogs(true);

const chatClient = new StreamChat('q95x9hkbyd6p', {
  timeout: 10000
});
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

chatClient.setUser(user, userToken);
ChatClientService.setClient(chatClient);

const Tab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const getTitle = key => {
    switch (key) {
      case 'home':
        return {
          icon: <HomeTabIcon width={25} height={25} />,
          iconActive: <HomeTabIconActive width={25} height={25} />,
          subtitle: 'Home',
        };
      case 'dms':
        return {
          icon: <DMTabIcon width={25} height={25} />,
          iconActive: <DMTabIconActive width={25} height={25} />,
          subtitle: 'DMs',
        };
      case 'mentions':
        return {
          icon: <MentionsTabIcon width={25} height={25} />,
          iconActive: <MentionsTabIconActive width={25} height={25} />,
          subtitle: 'Mention',
        };
      case 'you':
        return {
          icon: <YouTabIcon width={25} height={25} />,
          iconActive: <YouTabIconActive width={25} height={25} />,
          subtitle: 'You',
        };
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopColor: '#D3D3D3',
        borderTopWidth: 0.5,
        paddingBottom: 10
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
            <Text style={{  }}>{isFocused ? tab.iconActive : tab.icon}</Text>
            <Text style={{fontSize: 12}}>{tab.subtitle}</Text>
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
    </HomeStack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        // name="🏠"
        name="home"
        component={ChannelListScreen}
      />
      <Tab.Screen name={'dms'} component={DirectMessagesScreen} />
      <Tab.Screen name={'mentions'} component={MentionsScreen} />
      <Tab.Screen name={'you'} component={() => null} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <HomeStackNavigator />
      </View>
    </NavigationContainer>
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
