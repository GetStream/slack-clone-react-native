import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {ChatClientService} from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {NewMessageBubble} from '../components/NewMessageBubble';

import {useNavigation, useTheme} from '@react-navigation/native';
import {SCText} from '../components/SCText';

export const DraftsScreen = () => {
  const [results, setResults] = useState([]);
  const chatClient = ChatClientService.getClient();
  const navigation = useNavigation();
  const {colors} = useTheme();

  useEffect(() => {
    const getDraftMessages = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const draftKeys = keys.filter(k => {
        return k.indexOf(`@slack-clone-draft-${chatClient.user.id}`) === 0;
      });

      const items = await AsyncStorage.multiGet(draftKeys);
      const drafts = items.map(i => {
        const draft = JSON.parse(i[1]);
        return draft;
      });
      setResults(drafts.filter(r => !!r.text));
    };

    getDraftMessages();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.leftContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <SCText style={styles.backIcon}>{'‹'}</SCText>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleContainer}>
            <SCText style={styles.headerTitle}>Drafts</SCText>
          </View>
        </View>
        <FlatList
          data={results}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.draftItemContainer,
                  {
                    borderBottomColor: colors.border,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('ChannelScreen', {
                    channelId: item.channelId,
                  });
                }}>
                <SCText
                  style={[
                    styles.draftChannelTitle,
                    {
                      color: colors.boldText,
                    },
                  ]}>
                  {item.title}
                </SCText>
                <SCText style={styles.draftMessageText}>{item.text}</SCText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <NewMessageBubble
        onPress={() => {
          navigation.navigate('NewMessageScreen');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headerContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  leftContent: {
    flexDirection: 'row',
  },
  draftItemContainer: {
    padding: 12,
    paddingLeft: 20,
    borderBottomWidth: 0.3,
  },
  draftChannelTitle: {
    fontWeight: 'bold',
  },
  draftMessageText: {
    marginTop: 10,
    fontWeight: '400',
  },
  backIcon: {
    fontSize: 35,
    textAlign: 'left',
  },
  headerTitle: {
    fontWeight: '900',
    fontSize: 17,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
