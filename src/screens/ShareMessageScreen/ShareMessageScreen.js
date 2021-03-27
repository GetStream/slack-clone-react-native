import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import debounce from 'lodash/debounce';
import React, {useMemo, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {useChatContext} from 'stream-chat-react-native';

import {ListItemSeparator} from '../../components/ListItemSeparator';
import {ModalScreenHeader} from '../../components/ModalScreenHeader';
import {Reply} from '../../components/Reply';
import {SlackChannelListItem} from '../../components/SlackChannelListItem/SlackChannelListItem';
import {usePaginatedSearchedChannels} from '../../hooks/usePaginatedSearchedChannels';

const styles = StyleSheet.create({
  autocompleteContainer: {},
  autocompleteInputContainerStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
  },
  autocompleteListStyle: {
    backgroundColor: 'pink',
    borderWidth: 0,
    height: 300,
  },
  container: {
    padding: 10,
  },
  messageInput: {
    marginVertical: 20,
  },
  quotedMessageContainer: {
    borderRadius: 10,
    borderWidth: 2,
  },
  selectedChannelContainer: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export const ShareMessageScreen = () => {
  const {client} = useChatContext();
  const [searchText, setSearchText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [attachedMessageText, setAttachedMessageText] = useState('');
  const [query, setQuery] = useState();
  const {colors} = useTheme();
  const {
    params: {message = null},
  } = useRoute();
  const navigation = useNavigation();

  const debouncedSetQuery = debounce(
    (text) => {
      setQuery(text);
    },
    500,
    {
      leading: true,
      trailing: true,
    },
  );

  const queryFilters = useMemo(
    () => ({
      $or: [
        {'member.user.name': {$autocomplete: query}},
        {
          name: {
            $autocomplete: searchText,
          },
        },
      ],
      members: {
        $in: [client.user?.id],
      },
      type: 'messaging',
    }),
    [searchText],
  );

  const {channels = []} = usePaginatedSearchedChannels(queryFilters);

  const onChangeText = (text) => {
    setSearchText(text);
    debouncedSetQuery(text);
  };

  const renderItem = ({item: channel}) => (
    <SlackChannelListItem
      channel={channel}
      key={channel.cid}
      onSelect={() => setSelectedChannel(channel)}
      showAvatar
    />
  );

  const sendMessage = async () => {
    await selectedChannel.sendMessage({
      parent_shared_message: message,
      text: attachedMessageText,
    });

    navigation.navigate('ChannelScreen', {
      channelId: selectedChannel.id,
    });
  };

  return (
    <SafeAreaView>
      <ModalScreenHeader
        LeftContent={() => (
          <Button onPress={navigation.goBack} title={'Cancel'} />
        )}
        RightContent={() => <Button onPress={sendMessage} title={'Send'} />}
        title={'Share Message'}
      />
      <View style={styles.container}>
        {!selectedChannel && (
          <Autocomplete
            autoCapitalize='none'
            autoCorrect={false}
            data={channels}
            inputContainerStyle={styles.autocompleteInputContainerStyle}
            listStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              height: 300,
            }}
            onChangeText={onChangeText}
            placeholder={'Share with channel'}
            renderItem={renderItem}
          />
        )}
        {!!selectedChannel && (
          <View style={styles.selectedChannelContainer}>
            <SlackChannelListItem
              channel={selectedChannel}
              onSelect={() => setSelectedChannel(null)}
              showAvatar
            />
          </View>
        )}
        <ListItemSeparator />
        <TextInput
          onChangeText={(text) => setAttachedMessageText(text)}
          placeholder="Add a message, if you'd like"
          style={styles.messageInput}
        />
        <View
          style={[
            styles.quotedMessageContainer,
            {
              borderColor: colors.grey_gainsboro,
            },
          ]}>
          <Reply message={message} />
        </View>
      </View>
    </SafeAreaView>
  );
};
