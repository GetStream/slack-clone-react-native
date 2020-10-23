import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {ChatClientService} from '../utils';
import {NewMessageBubble} from '../components/NewMessageBubble';
import {ScreenHeader} from './ScreenHeader';
import {useTheme, useNavigation} from '@react-navigation/native';
import {SCText} from '../components/SCText';

export const MentionsScreen = props => {
  const chatClient = ChatClientService.getClient();
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const navigation = useNavigation();
  const {colors} = useTheme();

  useState(() => {
    const getMessages = async () => {
      const res = await chatClient.search(
        {
          members: {
            $in: [chatClient.user.id],
          },
        },
        `@${chatClient.user.name}`,
      );
      setResults(res.results);
      setLoadingResults(false);
    };

    getMessages();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <ScreenHeader title="Mentions" />

      {loadingResults && (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator size="small" color={colors.text} />
        </View>
      )}
      {!loadingResults && (
        <View style={styles.resultsContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={results}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('TargettedMessageChannelScreen', {
                      message: item.message,
                    });
                  }}
                  style={styles.resulItemContainer}>
                  <View
                    style={[
                      styles.mentionDetails,
                      {
                        borderTopColor: colors.border,
                      },
                    ]}>
                    <SCText style={styles.mentionerName}>
                      {item.message.user.name}{' '}
                    </SCText>
                    <SCText style={styles.mentionActivity}>
                      mentioned you in #
                      {item.message.channel.name &&
                        item.message.channel.name
                          .toLowerCase()
                          .replace(' ', '_')}
                    </SCText>
                  </View>
                  <View style={styles.messageContainer}>
                    <Image
                      style={styles.messageUserImage}
                      source={{
                        uri: item.message.user.image,
                      }}
                    />
                    <View style={styles.messageDetailsContainer}>
                      <SCText
                        style={[
                          styles.messageUserName,
                          {
                            color: colors.boldText,
                          },
                        ]}>
                        {item.message.user.name}
                      </SCText>
                      <SCText>{item.message.text}</SCText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <NewMessageBubble />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultsContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  resulItemContainer: {
    marginLeft: 10,
  },
  mentionDetails: {
    padding: 20,
    paddingLeft: 40,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  mentionerName: {
    fontWeight: '700',
    fontSize: 13,
    color: '#696969',
  },
  mentionActivity: {
    fontSize: 13,
    color: '#696969',
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  messageUserImage: {
    height: 30,
    width: 30,
    borderRadius: 5,
  },
  messageDetailsContainer: {
    marginLeft: 10,
    marginBottom: 15,
  },
  messageUserName: {
    fontWeight: '900',
  },
});
