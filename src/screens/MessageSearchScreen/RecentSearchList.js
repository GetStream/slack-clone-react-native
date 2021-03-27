import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native';

import {ListItemSeparator} from '../../components/ListItemSeparator';
import {SCText} from '../../components/SCText';

const styles = StyleSheet.create({
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
});

const keyExtractor = (item, index) => `${item}-${index}`;
export const RecentSearchList = (props) => {
  const {onSelect, recentSearches, removeItem} = props;

  const {colors} = useTheme();

  const renderItem = ({index, item}) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item);
      }}
      style={styles.recentSearchItemContainer}>
      <SCText style={styles.recentSearchText}>{item}</SCText>
      <SCText
        onPress={() => {
          removeItem(index);
        }}>
        X
      </SCText>
    </TouchableOpacity>
  );

  return (
    <View>
      <SCText
        style={[
          styles.recentSearchesTitle,
          {
            backgroundColor: colors.backgroundSecondary,
          },
        ]}>
        Recent searches
      </SCText>
      <FlatList
        data={recentSearches}
        ItemSeparatorComponent={ListItemSeparator}
        keyboardShouldPersistTaps='always'
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};
