import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import {ListItemSeparator} from '../../components/ListItemSeparator';
import {usePaginatedSearchedUsers} from '../../hooks/usePaginatedSearchedUsers';
import {UserListItem} from './UserListItem';

export const UserList = () => {
  const {colors} = useTheme();
  const {loading, loadMore, results} = usePaginatedSearchedUsers();

  const renderItem = ({item}) => <UserListItem user={item} />;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}>
      {loading && !results.length ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={results}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={loadMore}
          renderItem={renderItem}
          style={{height: 300}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 420,
    justifyContent: 'center',
    padding: 5,
    width: '100%',
  },
});
