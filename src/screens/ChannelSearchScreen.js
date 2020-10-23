import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChannelListItem} from '../components/ChannelListItem';
import {ModalScreenHeader} from '../components/ModalScreenHeader';
import {CacheService, ChatClientService} from '../utils';
import {useTheme} from '@react-navigation/native';
import {SCText} from '../components/SCText';

export const ChannelSearchScreen = ({
  navigation,
  route: {
    params: {channelsOnly = false},
  },
}) => {
  const {colors, dark} = useTheme();
  const chatClient = ChatClientService.getClient();
  const [results, setResults] = useState(CacheService.getRecentConversations());
  const [text, setText] = useState('');

  const renderChannelRow = (channel, isUnread) => {
    return (
      <ChannelListItem
        isUnread={isUnread}
        channel={channel}
        client={chatClient}
        key={channel.id}
        currentUserId={chatClient.user.id}
        showAvatar
        presenceIndicator={false}
        changeChannel={channelId => {
          navigation.navigate('ChannelScreen', {
            channelId,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View>
        {channelsOnly && (
          <ModalScreenHeader goBack={navigation.goBack} title="Channels" />
        )}
        <View style={styles.headerContainer}>
          <TextInput
            autoCapitalize={false}
            autoFocus
            onChangeText={async text => {
              setText(text);
              if (!text) {
                return setResults(CacheService.getRecentConversations());
              }

              const result = await chatClient.queryChannels({
                type: 'messaging',
                $or: [
                  {'member.user.name': {$autocomplete: text}},
                  {
                    name: {
                      $autocomplete: text,
                    },
                  },
                ],
              });
              setResults(result);
            }}
            value={text}
            placeholder="Search"
            placeholderTextColor={colors.text}
            style={[
              styles.inputBox,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: dark ? 1 : 0.5,
              },
            ]}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <SCText>Cancel</SCText>
          </TouchableOpacity>
        </View>
        {!text && !channelsOnly && (
          <View style={styles.recentMembersContainer}>
            <FlatList
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={CacheService.getMembers()}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.memberContainer}
                    onPress={() => {
                      navigation.navigate('ChannelScreen', {
                        channelId: item.channelId,
                      });
                    }}>
                    <Image
                      style={styles.memberImage}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <SCText style={styles.memberName}>{item.name}</SCText>
                  </TouchableOpacity>
                );
              }}
              horizontal
            />
          </View>
        )}
        <View style={styles.searchResultsContainer}>
          <SCText style={styles.searchResultsContainerTitle}>Recent</SCText>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={results}
            renderItem={({item}) => {
              return renderChannelRow(item);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  inputBox: {
    flex: 1,
    margin: 3,
    padding: 10,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6,
  },
  cancelButton: {
    alignSelf: 'center',
    padding: 5,
  },
  recentMembersContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  memberContainer: {
    padding: 5,
    width: 70,
    alignItems: 'center',
  },
  memberImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  memberName: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  searchResultsContainer: {
    paddingTop: 10,
  },
  searchResultsContainerTitle: {
    paddingLeft: 10,
    fontWeight: '500',
    paddingBottom: 10,
    paddingTop: 10,
  },
});
