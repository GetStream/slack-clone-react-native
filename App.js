import {ChannelHeader} from './src/components/ChannelHeader';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {ChannelList} from './src/components/ChannelList';
import {DateSeparator} from './src/components/DateSeparator';
import {MessageSlack} from './src/components/MessageSlack';
import {InputBox} from './src/components/InputBox';
import streamChatTheme from './src/stream-chat-theme.js';
import {Searchboxview} from './src/components/Searchboxview'

import {StreamChat} from 'stream-chat';
import {
  Chat,
  MessageList,
  MessageInput,
  Channel,
} from 'stream-chat-react-native';
import { TextInput } from 'react-native-gesture-handler';

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

chatClient.setUser(user, userToken);

function ChannelScreen({navigation, route}) {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (!channel) {
      navigation.openDrawer();
    }
    const channelId = route.params ? route.params.channelId : null;
    const _channel = chatClient.channel('messaging', channelId);
    setChannel(_channel);
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
            <Channel channel={channel}>
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
    <>
    <TextInput
            style={styles.inputSearchBox}
            placeholderTextColor="grey"
            onFocus={() => props.navigation.navigate('searchScreen',{client : chatClient})}
            placeholder="Jump to"
            blurOnSubmit={true}
      />
    <ChannelList
      client={chatClient}
      changeChannel={channelId => {
        props.navigation.jumpTo('ChannelScreen', {
          channelId,
        });
      }}
    />
    </>
  );
};
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Drawer.Navigator
          drawerType={"front"}
          drawerContent={ChannelListDrawer}
          drawerStyle={styles.drawerNavigator}>
          <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
          <Drawer.Screen name="searchScreen" component={Searchboxview}/>
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  inputSearchBox: {
    color: "white",
    backgroundColor: '#2e0a2f',
    padding: 10,
  },
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
