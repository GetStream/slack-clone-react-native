/* eslint-disable no-unused-vars */
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {SCText} from '../../../components/SCText';
import {CacheService, ChatClientService} from '../../../utils';
import {MultiSelectInput} from './MultiSelectInput';
import {UserSuggestionsList} from './UserSuggestionsList';

export const UserSearch = ({onFocus, onUsersChange}) => {
  const {colors} = useTheme();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(CacheService.getMembers());
  const [tags, setTags] = useState([]);
  const [focused, setFocused] = useState(true);

  const chatClient = ChatClientService.getClient();

  const addTag = (tag) => {
    if (!tag || !tag.name) {
      return;
    }
    const newTags = [...tags, tag];
    setTags(newTags);
    setSearchText('');
    onUsersChange(newTags);
  };

  const removeTag = (index) => {
    if (index < 0) {
      return;
    }

    // TODO: Fix this ... something wrong
    const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    setTags(newTags);
    onUsersChange(newTags);
  };

  const onFocusSearchInput = async () => {
    setFocused(true);
    if (!searchText) {
      setResults(CacheService.getMembers());
    } else {
      const res = await chatClient.queryUsers(
        {
          name: {$autocomplete: searchText},
        },
        {last_active: -1},
        {presence: true},
      );
      setResults(res.users);
    }
    onFocus();
  };

  const onChangeSearchText = async (text) => {
    setSearchText(text);
    if (!text) {
      return setResults(CacheService.getMembers());
    }
    const res = await chatClient.queryUsers(
      {
        name: {$autocomplete: text},
      },
      {last_active: -1},
      {presence: true},
    );

    setResults(res.users);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <SCText style={styles.searchContainerLabel}>To:</SCText>
        <MultiSelectInput
          onBlur={onBlur}
          onChangeText={onChangeSearchText}
          onFocus={onFocusSearchInput}
          onRemoveTag={removeTag}
          tags={tags}
          value={searchText}
        />
      </View>
      {focused && <UserSuggestionsList onSelect={addTag} users={results} />}
    </>
  );
};

const styles = StyleSheet.create({
  blurredTagText: {color: '#0080ff'},
  inputBox: {
    flex: 1,
  },
  inputBoxContainer: {
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  searchContainer: {
    alignItems: 'center',
    borderBottomColor: '#3A3A3D',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  searchContainerLabel: {fontSize: 15, padding: 10},
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
  tagContainer: {
    borderRadius: 3,
    flexDirection: 'row',
    margin: 2,
    paddingRight: 5,
  },
  tagImage: {
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    height: 25,
    width: 25,
  },
  tagText: {
    alignSelf: 'center',
    fontSize: 14,
    paddingLeft: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  textInput: {
    color: 'rgba(0, 0, 0, 0.87)',
    flex: 1,
    fontSize: 13,
    height: 32,
    margin: 0,
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },
  textInputContainer: {
    backgroundColor: '#ccc',
    borderRadius: 16,
    flex: 1,
    height: 32,
    margin: 4,
    minWidth: 100,
  },
});
