import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {NewMessageBubble} from '../components/NewMessageBubble';
import {SCText} from '../components/SCText';
import AsyncStore, {getUserDraftKey} from '../utils/AsyncStore';

export const DraftsScreen = () => {
  const [results, setResults] = useState([]);

  const navigation = useNavigation();
  const {colors} = useTheme();

  useEffect(() => {
    const getDraftMessages = async () => {
      const keys = await AsyncStore.getAllKeys();
      const draftKeys = keys.filter((k) => k.indexOf(getUserDraftKey()) === 0);

      const items = await AsyncStore.multiGet(draftKeys);
      const drafts = items.map((i) => {
        const draft = JSON.parse(i[1]);
        return draft;
      });
      setResults(drafts.filter((r) => !!r.text));
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
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChannelScreen', {
                  channelId: item.channelId,
                });
              }}
              style={[
                styles.draftItemContainer,
                {
                  borderBottomColor: colors.border,
                },
              ]}>
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
          )}
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
  backIcon: {
    fontSize: 35,
    textAlign: 'left',
  },
  container: {
    height: '100%',
  },
  draftChannelTitle: {
    fontWeight: 'bold',
  },
  draftItemContainer: {
    borderBottomWidth: 0.3,
    padding: 12,
    paddingLeft: 20,
  },
  draftMessageText: {
    fontWeight: '400',
    marginTop: 10,
  },
  headerContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  leftContent: {
    flexDirection: 'row',
  },
});
