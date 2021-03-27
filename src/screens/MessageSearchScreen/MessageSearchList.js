import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {
  Channel,
  Message as DefaultMessage,
  MessageList,
  useChatContext,
} from 'stream-chat-react-native';

import {Gallery} from '../../components/Gallery';
import {ListItemSeparator} from '../../components/ListItemSeparator';
import {MessageAvatar} from '../../components/MessageAvatar';
import {MessageFooter} from '../../components/MessageFooter';
import {MessageHeader} from '../../components/MessageHeader';
import {MessageRepliesAvatars} from '../../components/MessageRepliesAvatars';
import {MessageText} from '../../components/MessageText';
import {SCText} from '../../components/SCText';
import {UrlPreview} from '../../components/UrlPreview';
import {getChannelDisplayName} from '../../utils';

const styles = StyleSheet.create({
  cancelButton: {justifyContent: 'center', padding: 5},
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 0.5,
    flex: 1,
    margin: 3,
    padding: 10,
  },
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
  recentSearchItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  recentSearchText: {fontSize: 14},
  recentSearchesContainer: {
    flexGrow: 1,
    flexShrink: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  recentSearchesTitle: {
    fontSize: 13,
    padding: 5,
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
  resultCountContainer: {
    borderBottomWidth: 0.5,
    padding: 15,
  },
  resultItemContainer: {
    padding: 10,
  },
  resultsContainer: {flexGrow: 1, flexShrink: 1},
  safeAreaView: {
    flex: 1,
    height: '100%',
  },
});

const EmptyComponent = () => null;
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

// eslint-disable-next-line arrow-body-style
export const MessageSearchList = (props) => {
  const {loadingResults, results, searchQuery, startNewSearch} = props;
  const navigation = useNavigation();
  const {client} = useChatContext();
  const [fakeChannel, setFakeChannel] = useState(null);

  const goToChannel = ({message}) => {
    navigation.navigate('ChannelScreen', {
      channelId: message.channel.id,
      message,
    });
  };

  useEffect(() => {
    const channel = client.channel('dummy', 'dummy');
    channel.initialized = true;
    setFakeChannel(channel);
  }, []);

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
        <TouchableOpacity onPress={startNewSearch} style={styles.resetButton}>
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
        MessageDeleted={EmptyComponent}
        MessageFooter={MessageFooter}
        MessageHeader={MessageHeader}
        MessageRepliesAvatars={MessageRepliesAvatars}
        messages={results}
        MessageText={MessageText}
        onLongPressMessage={() => null}
        onPressMessage={goToChannel}
        otherAttachments={[]}
        ReactionList={EmptyComponent}
        Reply={EmptyComponent}
        ScrollToBottomButton={EmptyComponent}
        StickyHeader={EmptyComponent}
        UrlPreview={UrlPreview}>
        <MessageList
          additionalFlatListProps={{
            ItemSeparatorComponent: MessageListSeparator,
            showsVerticalScrollIndicator: false,
          }}
          inverted={false}
        />
      </Channel>
    </>
  );
};
