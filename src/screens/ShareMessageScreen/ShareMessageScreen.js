import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import debounce from 'lodash/debounce';
import React, {useMemo, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import {ListItemSeparator} from '../../components/ListItemSeparator';
import {ModalScreenHeader} from '../../components/ModalScreenHeader';
import {Reply} from '../../components/Reply';
import {SlackChannelListItem} from '../../components/SlackChannelListItem/SlackChannelListItem';
import {usePaginatedSearchedChannels} from '../../hooks/usePaginatedSearchedChannels';
import {ChatClientStore} from '../../utils';

const styles = StyleSheet.create({
  autocompleteContainer: {
    // https://github.com/mrlaessig/react-native-autocomplete-input#android
    ...Platform.select({
      android: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
    }),
  },
  autocompleteInputContainerStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
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
    marginTop: Platform.OS === 'android' ? 30 : 20,
    marginVertical: 20,
  },
  quotedMessageContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
  },
  selectedChannelContainer: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export const ShareMessageScreen = () => {
  const chatClient = ChatClientStore.client;

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
        $in: [chatClient.user?.id],
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

  const HeaderLeftButton = () => (
    <TouchableOpacity onPress={navigation.goBack}>
      <Text
        style={{
          color: colors.linkText,
        }}>
        Cancel
      </Text>
    </TouchableOpacity>
  );

  const HeaderRightButton = () => (
    <TouchableOpacity onPress={sendMessage}>
      <Text
        style={{
          color: colors.linkText,
          textAlign: 'right',
        }}>
        Send
      </Text>
    </TouchableOpacity>
  );

  const renderAutocompleteInput = () => (
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
  );
  return (
    <SafeAreaView>
      <ModalScreenHeader
        LeftContent={HeaderLeftButton}
        RightContent={HeaderRightButton}
        title={'Share Message'}
      />
      <View style={styles.container}>
        {!selectedChannel &&
          (Platform.OS === 'android' ? (
            <View style={styles.autocompleteContainer}>
              {renderAutocompleteInput()}
            </View>
          ) : (
            renderAutocompleteInput()
          ))}
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
