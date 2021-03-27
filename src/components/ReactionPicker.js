/* eslint-disable react/display-name */
import {BottomSheetModal, BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {groupedSupportedReactions} from '../utils/supportedReactions';
import {SCText} from './SCText';

const keyExtractor = (item, index) =>
  index + '-' + item.reduce((acc, curr) => `${acc}-${curr.uid}`, '');
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

const EmojiList = React.memo(() => {
  const renderItem = ({item}) => <EmojiRow emojis={item} onPress={() => {}} />;

  const renderSectionHeader = (props) => <SectionHeader {...props} />;

  return (
    <BottomSheetSectionList
      focusHook={useFocusEffect}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={groupedSupportedReactions}
    />
  );
});

// eslint-disable-next-line react/display-name
export const ReactionPicker = React.forwardRef((props, fRef) => {
  // variables
  const snapPoints = useMemo(() => [300, 600], []);

  const renderBackdrop = useCallback((props) => {
    const opacityStyle = useAnimatedStyle(
      () => ({
        // 896 - max height of bottom sheet
        opacity: (896 - props.animatedPosition.value) / 896,
      }),
      [],
    );

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: '#000000'},
          opacityStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            fRef.current?.dismiss();
          }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>
    );
  }, []);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={fRef}
      snapPoints={snapPoints}
      stackBehavior={'replace'}>
      <EmojiList />
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  animatedContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
  },
  groupTitle: {
    fontWeight: '200',
    padding: 10,
    paddingLeft: 13,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  overlay: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: '100%',
    width: '100%',
  },
  pickerContainer: {
    borderRadius: 15,
    flexDirection: 'column',
    paddingHorizontal: 10,
    width: '100%',
  },
  reactionsItem: {
    fontSize: 35,
    margin: 5,
    marginVertical: 5,
  },
  reactionsItemContainer: {
    alignItems: 'center',
    marginTop: -5,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
});
