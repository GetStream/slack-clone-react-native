import React, {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {MessageSlack, DateSeparator, InputBox} from './src/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Chat,
  MessageList,
  MessageInput,
  Channel,
} from 'stream-chat-react-native';
import {ChannelListView} from './src/components/ChannelListView';
import {ChannelHeader} from './src/components/ChannelHeader';

import {StreamChat} from 'stream-chat';
// Read more about style customizations at - https://getstream.io/chat/react-native-chat/tutorial/#custom-styles
const theme = {
  avatar: {
    image: {
      size: 32,
    },
  },
  colors: {
    primary: 'magenta',
  },
  spinner: {
    css: `
        width: 15px;
        height: 15px;
      `,
  },
  'messageList.dateSeparator.date': 'color: black;',
  'messageInput.container':
    'border-top-color: #979A9A; border-top-width: 0.4; background-color: white; margin: 0; border-radius: 0;',
  'messageList.dateSeparator.container': 'margin-top: 10; margin-bottom: 5;',
  'message.avatarWrapper.spacer': 'height: 0;',
  'messageInput.sendButtonIcon': 'height: 20px; width: 20px;',
  'messageInput.attachButtonIcon': 'height: 20px; width: 20px;',
  'messageInput.inputBox': 'font-size: 15;',
  'message.content.container':
    'flex: 1; align-items: stretch; max-width: 320px; padding-top: 0; border-radius: 0;',
  'message.content.textContainer':
    'align-self: stretch; padding-top: 0;margin-top: 0;border-color: white;width: 100%',
  'message.avatarWrapper.container': 'align-self: flex-start',
  'message.container': 'margin-bottom: 0; margin-top: 0',
  'avatar.image': 'border-radius: 5;',
  'message.card.container':
    'border-top-left-radius: 8;border-top-right-radius: 8;border-bottom-left-radius: 8; border-bottom-right-radius: 8',
  'message.gallery.single':
    'border-top-left-radius: 8;border-top-right-radius: 8;border-bottom-left-radius: 8; border-bottom-right-radius: 8; margin-left: 5; width: 95%',
  'message.gallery.galleryContainer':
    'border-top-left-radius: 8;border-top-right-radius: 8;border-bottom-left-radius: 8; border-bottom-right-radius: 8; margin-left: 5; width: 95%',
  'message.replies.messageRepliesText': 'color: #0064c2',
  'message.content.markdown': {
    text: {
      fontSize: 16,
      fontFamily: 'Lato-Regular',
    },
    codeBlock: {
      color: 'black',
    },
  },
};

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
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'column', height: '100%'}}>
        <ChannelHeader navigation={navigation} channel={channel} />
        <View style={styles.chatContainer}>
          <Chat client={chatClient} style={theme}>
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

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

const userTate = {
  id: 'tate',
  name: 'Jaap',
};
const userTokenTate =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGF0ZSJ9.o6tXDbN9_uDw0-rKID5JvOfLbE-5nv5VBhRUZiJaDws';

const userNick = {
  id: 'twilliot',
  name: 'Nick',
};

const userTokenNick =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidHdpbGxpb3QifQ.IgBm7u8YgEFTqW-vtpYLovI3WUQoFwysXCvXgkn0AcY';

chatClient.setUser(user, userToken);

const CustomDrawerContent = props => {
  return (
    <ChannelListView
      client={chatClient}
      setActiveChannel={channelId => {
        props.navigation.jumpTo('ChannelScreen', {
          channelId,
        });
      }}
    />
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Drawer.Navigator
          initialRouteName="ChannelScreen"
          drawerContent={CustomDrawerContent}
          drawerStyle={styles.drawerNavigator}>
          <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
