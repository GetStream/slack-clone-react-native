import React, {PureComponent} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {StreamChat} from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelList,
  Thread,
  CloseButton,
  ChannelPreviewMessenger,
  Streami18n,
  MessageSimple,
  MessageAvatar,
  ReactionPickerWrapper,
} from 'stream-chat-react-native';
import {MessageSlack} from './src/components';
import Moment from 'moment';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {DateSeparator} from './src/components/DateSeperator';

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
    'border-top-color: #979A9A; border-top-width: 1; background-color: white; margin: 0',
  'messageList.dateSeparator.container': 'margin-top: 10; margin-bottom: 5;',
  'message.avatarWrapper.spacer': 'height: 0;',
};

const chatClient = new StreamChat('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlzaGFsIn0.LpDqH6U8V8Qg9sqGjz0bMQvOfWrWKAjPKqeODYM0Elk';
const user = {
  id: 'vishal',
  name: 'Vishal',
};

const filters = {type: 'messaging', example: 7};
const sort = {last_message_at: -1};
const options = {
  state: true,
  watch: true,
  limit: 30
};

/**
 * Start playing with streami18n instance here:
 * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
 */
const streami18n = new Streami18n({
  language: 'en',
});

const PreviewComponent = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setActiveChannel(props.channel);
      }}>
      <Text style={{color: 'white', padding: 10}}>
        # {props.channel.data.name}
      </Text>
    </TouchableOpacity>
  );
};
class ChannelListScreen extends PureComponent {
  static navigationOptions = () => ({
    headerTitle: <Text style={{fontWeight: 'bold'}}>Channel List</Text>,
  });

  render() {
    return (
      <SafeAreaView>
        <Chat client={chatClient} style={theme} i18nInstance={streami18n}>
          <View
            style={{
              display: 'flex',
              height: '100%',
              padding: 10,
              backgroundColor: '#3F0E40',
            }}>
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              Preview={PreviewComponent}
              onSelect={channel => {
                this.props.navigation.navigate('Channel', {
                  channel,
                });
              }}
            />
          </View>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ChannelScreen extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const channel = navigation.getParam('channel');
    return {
      headerTitle: (
        <Text style={{fontWeight: 'bold'}}>{channel.data.name}</Text>
      ),
    };
  };

  render() {
    const {navigation} = this.props;
    const channel = navigation.getParam('channel');

    return (
      <SafeAreaView>
        <Chat client={chatClient} style={theme} i18nInstance={streami18n}>
          <Channel client={chatClient} channel={channel}>
            <View
              style={{
                display: 'flex',
                height: '100%',
              }}>
              <MessageList
                Message={MessageSlack}
                DateSeparator={DateSeparator}
                onThreadSelect={thread => {
                  this.props.navigation.navigate('Thread', {
                    thread,
                    channel: channel.id,
                  });
                }}
              />
              <MessageInput
                additionalTextInputProps={{
                  placeholderTextColor: '#979A9A',
                }}
              />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ThreadScreen extends PureComponent {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <Text style={{fontWeight: 'bold'}}>Thread</Text>,
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          backgroundColor: '#ebebeb',
          width: 30,
          height: 30,
          marginRight: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}>
        <CloseButton />
      </TouchableOpacity>
    ),
  });

  render() {
    const {navigation} = this.props;
    const thread = navigation.getParam('thread');
    const channel = chatClient.channel(
      'messaging',
      navigation.getParam('channel'),
    );

    return (
      <SafeAreaView>
        <Chat client={chatClient} i18nInstance={streami18n}>
          <Channel
            client={chatClient}
            channel={channel}
            thread={thread}
            dummyProp="DUMMY PROP">
            <View
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'flex-start',
              }}>
              <Thread thread={thread} />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    ChannelList: {
      screen: ChannelListScreen,
    },
    Channel: {
      screen: ChannelScreen,
    },
    Thread: {
      screen: ThreadScreen,
    },
  },
  {
    initialRouteName: 'ChannelList',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientReady: false,
    };
  }

  async componentDidMount() {
    await chatClient.setUser(user, userToken);

    this.setState({
      clientReady: true,
    });
  }
  render() {
    if (this.state.clientReady) {
      return <AppContainer />;
    } else {
      return null;
    }
  }
}
