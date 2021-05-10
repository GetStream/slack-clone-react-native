import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from '../../../components/SCText';
import {usePaginatedSearchedUsers} from '../../../hooks/usePaginatedSearchedUsers';
import {MultiSelectInput} from './MultiSelectInput';
import {UserSuggestionsList} from './UserSuggestionsList';

export const UserSearch = (props) => {
  const {onFocus: propOnFocus, onUsersChange} = props;

  const {colors} = useTheme();
  const [focused, setFocused] = useState(true);
  const {
    addUser,
    onChangeSearchText,
    onFocusInput,
    removeUser,
    results,
    searchText,
    selectedUsers,
  } = usePaginatedSearchedUsers();

  useEffect(() => {
    onUsersChange(selectedUsers);
  }, [selectedUsers]);

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    onFocusInput();
    propOnFocus();
  };

  return (
    <>
      <View
        style={[
          styles.searchContainer,
          {
            borderBottomColor: colors.border,
          },
        ]}>
        <SCText style={styles.searchContainerLabel}>To:</SCText>
        <MultiSelectInput
          onBlur={onBlur}
          onChangeText={onChangeSearchText}
          onFocus={onFocus}
          onRemoveTag={removeUser}
          tags={selectedUsers}
          value={searchText}
        />
      </View>
      {focused && <UserSuggestionsList onSelect={addUser} users={results} />}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  searchContainerLabel: {fontSize: 15, padding: 10},
});
