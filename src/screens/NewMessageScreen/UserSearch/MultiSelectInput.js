import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {SelectedUserTag} from './SelectedUserTag';

const styles = StyleSheet.create({
  inputBox: {
    marginVertical: 10,
  },
  inputBoxContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const MultiSelectInput = (props) => {
  const {
    onBlur: propOnBlur,
    onChangeText,
    onFocus: propOnFocus,
    onRemoveTag,
    tags,
    value,
  } = props;
  const [focusOnTags, setFocusOnTags] = useState(true);
  const {colors} = useTheme();

  const onBlur = () => {
    // setResults(null);
    setFocusOnTags(false);
    propOnBlur();
  };

  const onFocus = () => {
    setFocusOnTags(true);
    propOnFocus();
  };

  return (
    <View style={styles.inputBoxContainer}>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => {
          const tagProps = {
            index,
            onPress: () => {
              if (focusOnTags) {
                onRemoveTag?.(index, tag);
              } else {
                onFocus();
              }
            },
            tag,
          };

          return (
            <SelectedUserTag key={tag.id} {...tagProps} active={focusOnTags} />
          );
        })}
      </View>

      {(focusOnTags || tags.length === 0) && (
        <View>
          <TextInput
            autoFocus
            onBlur={onBlur}
            onChangeText={onChangeText}
            onFocus={onFocus}
            placeholder={'Search for conversation'}
            placeholderTextColor={colors.dimmedText}
            style={[
              styles.inputBox,
              {
                color: colors.text,
              },
            ]}
            value={value}
          />
        </View>
      )}
    </View>
  );
};
