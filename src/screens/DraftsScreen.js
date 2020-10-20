import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  LogBox,
} from 'react-native';

import {ChannelList} from '../components/ChannelList';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {ChatClientService} from '../utils';
import AsyncStorage from '@react-native-community/async-storage';

export const DraftsScreen = props => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const getDraftMessages = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const draftKeys = keys.filter(k => {
        return k.indexOf('@slack-clone-draft') === 0;
      });

      const items = await AsyncStorage.multiGet(draftKeys);
      const results = items.map(i => {
        const draft = JSON.parse(i[1]);
        return draft;
      });
      setResults(results.filter(r => !!r.text));
    };

    getDraftMessages();
  });
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.leftContent}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Text style={styles.hamburgerIcon}>{'‹'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerContent}>
            <Text style={styles.channelTitle}>Drafts</Text>
          </View>
        </View>
        <FlatList
          data={results}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  padding: 10,
                  paddingLeft: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'grey',
                }}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{marginTop: 5}}>{item.text}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const textStyles = {
  fontFamily: 'Lato-Regular',
  color: 'black',
  fontSize: 16,
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  leftContent: {
    flexDirection: 'row',
  },
  hamburgerIcon: {
    fontSize: 35,
    textAlign: 'left',
  },
  channelTitle: {
    color: 'black',
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 17,
    fontFamily: 'Lato-Regular',
    alignSelf: 'center',
  },
  channelSubTitle: {},
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
