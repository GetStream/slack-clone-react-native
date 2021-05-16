import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {
  Channel,
  Message as DefaultMessage,
  MessageList,
} from 'stream-chat-react-native';

import {Gallery} from '../../components/Gallery';
import {ListItemSeparator} from '../../components/ListItemSeparator';
import {MessageAvatar} from '../../components/MessageAvatar';
import {MessageFooter} from '../../components/MessageFooter';
import {MessageHeader} from '../../components/MessageHeader';
import {MessageRepliesAvatars} from '../../components/MessageRepliesAvatars';
import {MessageText} from '../../components/MessageText';
import {RenderNothing} from '../../components/RenderNothing';
import {SCText} from '../../components/SCText';
import {UrlPreview} from '../../components/UrlPreview';
import {ChatClientStore} from '../../utils/ChatClientStore';
import {getChannelDisplayName} from '../../utils/channelUtils';

const styles = StyleSheet.create({
  listEmptyContainer: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
  },
  loadingIndicatorContainer: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
  },
  resetButton: {
    borderColor: '#696969',
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: 10,
    padding: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  resultChannelTitle: {
    color: '#8b8b8b',
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
  },
});

const chatClient = ChatClientStore.client;

const MessageListSeparator = () => (
  <ListItemSeparator
    borderColor={'#00000010'}
    borderWidth={5}
    marginVertical={10}
  />
);

const MessageWithChannelName = (props) => (
  <>
    <SCText style={styles.resultChannelTitle}>
      {getChannelDisplayName(props.message.channel, true)}
      {' - '}
      {dayjs(props.message.created_at).format('MMM D, YYYY')}
    </SCText>
    <DefaultMessage {...props} />
  </>
);

export const MessageSearchList = (props) => {
  const {loadingResults, resetSearch, results, searchQuery} = props;
  const navigation = useNavigation();

  const fakeChannel = chatClient.channel('dummy', 'dummy');
  fakeChannel.initialized = true;

  const goToChannel = ({message}) => {
    navigation.navigate('ChannelScreen', {
      channelId: message.channel.id,
      messageId: message.id,
    });
  };

  if (loadingResults) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator color='black' size='small' />
      </View>
    );
  }

  if (results?.length === 0) {
    return (
      <View style={[styles.listEmptyContainer]}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <SCText>No results for '{searchQuery}'</SCText>
        <TouchableOpacity onPress={resetSearch} style={styles.resetButton}>
          <SCText>Start a new search</SCText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Channel
        channel={fakeChannel}
        forceAlignMessages={'left'}
        Gallery={Gallery}
        Message={MessageWithChannelName}
        MessageAvatar={MessageAvatar}
        MessageDeleted={RenderNothing}
        MessageFooter={MessageFooter}
        MessageHeader={MessageHeader}
        MessageRepliesAvatars={MessageRepliesAvatars}
        messages={results}
        MessageText={MessageText}
        onLongPressMessage={RenderNothing}
        onPressMessage={goToChannel}
        ReactionList={RenderNothing}
        Reply={RenderNothing}
        ScrollToBottomButton={RenderNothing}
        StickyHeader={RenderNothing}
        UrlPreview={UrlPreview}>
        <MessageList
          additionalFlatListProps={{
            ItemSeparatorComponent: MessageListSeparator,
            keyboardShouldPersistTaps: 'never',
            showsVerticalScrollIndicator: false,
          }}
          inverted={false}
        />
      </Channel>
    </>
  );
};
