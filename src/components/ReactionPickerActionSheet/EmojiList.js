import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {groupedSupportedReactions} from '../../utils/supportedReactions';
import {SCText} from '../SCText';

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: '200',
    padding: 10,
    paddingLeft: 13,
  },
  reactionsItem: {
    fontSize: 35,
    margin: 5,
    marginVertical: 5,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
});

const keyExtractor = (item, index) =>
  index + '-' + item.reduce((acc, curr) => `${acc}-${curr.uid}`, '');

const EmojiRow = React.memo(({emojis, onPress}) => (
  <View style={styles.reactionsRow}>
    {emojis.map(({icon, id, uid}) => (
      <View key={uid} style={{flexDirection: 'column'}}>
        <Text onPress={() => onPress(id)} style={styles.reactionsItem}>
          {icon}
        </Text>
      </View>
    ))}
  </View>
));

const SectionHeader = React.memo(({section: {title}}) => (
  <SCText
    style={[
      {
        backgroundColor: 'white',
      },
      styles.groupTitle,
    ]}>
    {title}
  </SCText>
));

export const EmojiList = React.memo(({toggleReaction}) => {
  const renderItem = ({item}) => (
    <EmojiRow emojis={item} onPress={toggleReaction} />
  );

  const renderSectionHeader = (props) => <SectionHeader {...props} />;

  return (
    <BottomSheetSectionList
      focusHook={useFocusEffect}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={groupedSupportedReactions}
      windowSize={10}
    />
  );
});
