import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {SCText} from '../../../components/SCText';
import {ListEmptyComponent} from './ListEmptyComponent';

export const UserSuggestionsList = (props) => {
  const {onSelect, users} = props;

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // TODO: Add logic for checking for duplicates
        onSelect(item);
      }}
      style={styles.searchResultContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.searchResultUserImage}
      />
      <SCText style={styles.searchResultUserName}>{item.name}</SCText>
    </TouchableOpacity>
  );

  return (
    <>
      {users && users.length >= 0 && (
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={users}
          keyboardDismissMode='none'
          keyboardShouldPersistTaps='always'
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchResultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    paddingLeft: 10,
  },
  searchResultUserImage: {
    borderRadius: 5,
    height: 30,
    width: 30,
  },
  searchResultUserName: {paddingLeft: 10},
});
