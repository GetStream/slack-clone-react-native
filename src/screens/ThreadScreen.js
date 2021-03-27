import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Channel, Thread} from 'stream-chat-react-native';

import {CustomKeyboardCompatibleView} from '../components/CustomKeyboardCompatibleView';
import {Gallery} from '../components/Gallery';
import {Giphy} from '../components/Giphy';
import {InputBoxThread} from '../components/InputBoxThread';
import {MessageActionSheet} from '../components/MessageActionSheet/MessageActionSheet';
import {MessageAvatar} from '../components/MessageAvatar';
import {MessageFooter} from '../components/MessageFooter';
import {MessageHeader} from '../components/MessageHeader';
import {MessageRepliesAvatars} from '../components/MessageRepliesAvatars';
import {MessageText} from '../components/MessageText';
import {ModalScreenHeader} from '../components/ModalScreenHeader';
import {ReactionPicker} from '../components/ReactionPicker';
import {UrlPreview} from '../components/UrlPreview';
import {ChatClientService, getChannelDisplayName, truncate} from '../utils';
import {getSupportedReactions} from '../utils/supportedReactions';

const supportedReactions = getSupportedReactions();

const styles = StyleSheet.create({
  channelScreenContainer: {flexDirection: 'column', height: '100%'},
  chatContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    backgroundColor: '#3F0E40',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 1,
    bottom: 80,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },
});

export const ThreadScreen = () => {
  const {colors} = useTheme();
  const {
    params: {channelId = null, threadId = null},
  } = useRoute();

  const navigation = useNavigation();
  const chatClient = ChatClientService.getClient();
  const [channel, setChannel] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [thread, setThread] = useState();
  const [actionSheetData, setActionSheetData] = useState(null);
  const actionSheetRef = useRef(null);
  const reactionPickerRef = useRef(null);

  const additionalTextInputProps = useMemo(
    () => ({
      placeholder:
        channel && channel.data.name
          ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
          : 'Message',
      placeholderTextColor: '#979A9A',
    }),
    [channel],
  );

  const openReactionPicker = useCallback(() => {
    reactionPickerRef.current?.present();
  }, []);

  const onLongPressMessage = ({actionHandlers, message}) => {
    setActionSheetData({
      actionHandlers,
      message,
    });
    actionSheetRef.current?.present();
  };

  const renderMessageFooter = (props) => (
    <MessageFooter {...props} openReactionPicker={openReactionPicker} />
  );

  useEffect(() => {
    const getThread = async () => {
      const res = await chatClient.getMessage(threadId);
      setThread(res.message);
    };

    getThread();
  }, [chatClient, threadId]);

  useEffect(() => {
    const init = () => {
      if (!channelId) {
        navigation.goBack();
        return;
      }

      const newChannel = chatClient.channel('messaging', channelId);
      newChannel.initialized = true;
      setChannel(newChannel);
      setIsReady(true);
    };

    init();
  }, [channelId]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <BottomSheetModalProvider>
        <View style={styles.channelScreenContainer}>
          <ModalScreenHeader
            goBack={navigation.goBack}
            subTitle={truncate(getChannelDisplayName(channel, true), 35)}
            title={'Thread'}
          />
          <View
            style={[
              styles.chatContainer,
              {
                backgroundColor: colors.background,
              },
            ]}>
            <Channel
              additionalTextInputProps={additionalTextInputProps}
              animatedLongPress={false}
              channel={channel}
              forceAlignMessages={'left'}
              Gallery={Gallery}
              Giphy={Giphy}
              Input={InputBoxThread}
              KeyboardCompatibleView={CustomKeyboardCompatibleView}
              MessageAvatar={MessageAvatar}
              MessageDeleted={() => null}
              MessageFooter={renderMessageFooter}
              MessageHeader={MessageHeader}
              MessageRepliesAvatars={MessageRepliesAvatars}
              MessageText={MessageText}
              onLongPressMessage={onLongPressMessage}
              onPressInMessage={() => null}
              ReactionList={() => null}
              ShowThreadMessageInChannelButton={() => null}
              supportedReactions={supportedReactions}
              thread={thread}
              UrlPreview={UrlPreview}>
              <Thread />
            </Channel>
            <ReactionPicker handleReaction={() => {}} ref={reactionPickerRef} />
            <MessageActionSheet
              actionHandlers={actionSheetData?.actionHandlers}
              message={actionSheetData?.message}
              ref={actionSheetRef}
            />
          </View>
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

// import {useNavigation, useTheme} from '@react-navigation/native';
// import React, {useEffect, useMemo, useState} from 'react';
// import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
// import {
//   Channel,
//   Chat,
//   KeyboardCompatibleView,
//   Thread,
// } from 'stream-chat-react-native';

// import {InputBoxThread} from '../components/InputBoxThread';
// import {ModalScreenHeader} from '../components/ModalScreenHeader';
// import {
//   ChatClientService,
//   getChannelDisplayName,
//   truncate,
//   useStreamChatTheme,
// } from '../utils';

// const CustomKeyboardCompatibleView = ({children}) => (
//   <KeyboardCompatibleView
//     behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
//     keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : -200}>
//     {children}
//   </KeyboardCompatibleView>
// );
// export function ThreadScreen({
//   route: {
//     params: {channelId = null, threadId = null},
//   },
// }) {
//   const {colors} = useTheme();
//   const chatStyles = useStreamChatTheme();
//   const chatClient = ChatClientService.getClient();
//   const navigation = useNavigation();

//   const [channel, setChannel] = useState(null);
//   const [thread, setThread] = useState();
//   const [sendMessageInChannel, setSendMessageInChannel] = useState(false);
//   const [isReady, setIsReady] = useState(false);

//   const goBack = () => {
//     navigation.goBack();
//   };

//   useEffect(() => {
//     const getThread = async () => {
//       const res = await chatClient.getMessage(threadId);
//       setThread(res.message);
//     };

//     getThread();
//   }, [chatClient, threadId]);

//   useEffect(() => {
//     if (!channelId) {
//       navigation.goBack();
//     } else {
//       const _channel = chatClient.channel('messaging', channelId);
//       setChannel(_channel);
//       setIsReady(true);
//     }
//   }, [channelId, threadId]);

//   const additionalTextInputProps = useMemo(
//     () => ({
//       placeholder:
//         channel && channel.data.name
//           ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
//           : 'Message',
//       placeholderTextColor: '#979A9A',
//     }),
//     [channel?.data?.name],
//   );

//   if (!isReady || !thread) {
//     return null;
//   }

//   const sendMessageRequest = (cid, message) => {
//     const newMessage = {
//       ...message,
//       parentMessageText: sendMessageInChannel ? thread.text : undefined,
//       show_in_channel: sendMessageInChannel,
//     };
//     return channel.sendMessage(newMessage);
//   };

//   const renderInputBoxThread = (props) => (
//     <InputBoxThread
//       {...props}
//       setSendMessageInChannel={setSendMessageInChannel}
//     />
//   );
//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor: colors.background,
//       }}>
//       <View style={styles.channelScreenContainer}>
//         <ModalScreenHeader
//           goBack={goBack}
//           subTitle={truncate(getChannelDisplayName(channel, true), 35)}
//           title={'Thread'}
//         />
//         <View
//           style={[
//             styles.chatContainer,
//             {
//               backgroundColor: colors.background,
//             },
//           ]}>
//           <Chat client={chatClient} style={chatStyles}>
//             <Channel
//               channel={channel}
//               doSendMessageRequest={sendMessageRequest}
//               KeyboardCompatibleView={CustomKeyboardCompatibleView}
//               ShowThreadMessageInChannelButton={() => null}
//               thread={thread}>
//               <Thread
//                 additionalMessageInputProps={{
//                   Input: renderInputBoxThread,
//                   additionalTextInputProps,
//                 }}
//                 additionalMessageListProps={{
//                   DateSeparator: () => null,
//                 }}
//               />
//             </Channel>
//           </Chat>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   channelScreenContainer: {flexDirection: 'column', height: '100%'},
//   chatContainer: {
//     flexGrow: 1,
//     flexShrink: 1,
//   },
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   drawerNavigator: {
//     backgroundColor: '#3F0E40',
//     width: 350,
//   },
//   emptyThreadHeaderSeparatorContent: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   threadHeaderSeparator: {
//     borderBottomWidth: 1,
//     borderTopWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//   },
// });
