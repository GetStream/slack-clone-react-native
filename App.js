import {ChannelHeader} from './src/components/ChannelHeader';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ChannelList} from './src/components/ChannelList';
import {DateSeparator} from './src/components/DateSeparator';
import {MessageSlack} from './src/components/MessageSlack';
import {InputBox} from './src/components/InputBox';
import streamChatTheme from './src/stream-chat-theme.js';
import {KeyboardCompatibleView} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {
  Chat,
  MessageList,
  MessageInput,
  Channel,
} from 'stream-chat-react-native';

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

chatClient.setUser(user, userToken);
const CustomKeyboardCompatibleView = ({children}) => (
  <KeyboardCompatibleView
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -200}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
    {children}
  </KeyboardCompatibleView>
);

function ChannelScreen({navigation, route}) {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    const channelId = route.params ? route.params.channelId : null;
    if (!channelId) {
      navigation.goBack();
    } else {
      const _channel = chatClient.channel('messaging', channelId);
      setChannel(_channel);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.channelScreenSaveAreaView}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader
          navigation={navigation}
          channel={channel}
          client={chatClient}
        />
        <View style={styles.chatContainer}>
          <Chat client={chatClient} style={streamChatTheme}>
            <Channel
              channel={channel}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}>
              <MessageList
                Message={MessageSlack}
                DateSeparator={DateSeparator}
              />
              <MessageInput
                Input={InputBox}
                additionalTextInputProps={{
                  placeholderTextColor: '#979A9A',
                  placeholder:
                    channel && channel.data.name
                      ? 'Message #' +
                        channel.data.name.toLowerCase().replace(' ', '_')
                      : 'Message',
                }}
              />
            </Channel>
          </Chat>
        </View>
      </View>
    </SafeAreaView>
  );
}

const ChannelListDrawer = props => {
  return (
    <ChannelList
      client={chatClient}
      changeChannel={channelId => {
        props.navigation.navigate('ChannelScreen', {
          channelId,
        });
      }}
    />
  );
};

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const getTitle = key => {
    switch (key) {
      case 'home':
        return {
          title: '🏠',
          subtitle: 'Home',
        };
      case 'dms':
        return {
          title: '💬',
          subtitle: 'DMs',
        };
      case 'mentions':
        return {
          title: 'ⓐ',
          subtitle: 'Mention',
        };
      case 'you':
        return {
          title: '〄',
          subtitle: 'You',
        };
    }
  };
  return (
    <View style={{flexDirection: 'row'}}>
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
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
              {tab.title}
            </Text>
            <Text style={{fontSize: 12}}>{tab.subtitle}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Stack = createStackNavigator();

const HomeScreen = props => {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal">
      <Stack.Screen
        name="getstream"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        // name="🏠"
        name="home"
        subTitle={'ChannelList'}
        component={ChannelListDrawer}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen name={'dms'} component={() => null} />
      <Tab.Screen name={'mentions'} component={() => null} />
      <Tab.Screen name={'you'} component={() => null} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <HomeScreen />
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
