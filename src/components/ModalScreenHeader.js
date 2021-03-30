import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {CloseModalButton} from './CloseModalButton';
import {SCText} from './SCText';

const Spacer = () => <View style={{width: 50}} />;
export const ModalScreenHeader = (props) => {
  const {
    goBack,
    LeftContent = CloseModalButton,
    RightContent = Spacer,
    subTitle,
    title,
  } = props;
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}>
      <LeftContent goBack={goBack} />
      <View>
        <SCText style={[styles.channelTitle, {color: colors.boldText}]}>
          {title}
        </SCText>
        {subTitle && (
          <SCText style={[styles.channelSubTitle, {color: colors.linkText}]}>
            {subTitle}
          </SCText>
        )}
      </View>
      <View style={styles.leftContent}>
        {!!RightContent && <RightContent />}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  channelSubTitle: {
    alignContent: 'center',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 10,
    textAlign: 'center',
  },
  channelTitle: {
    alignContent: 'center',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  hamburgerIcon: {
    fontSize: 27,
  },
  leftContent: {},
  menuIcon: {
    height: 18,
    width: 18,
  },
  menuIconContainer: {alignSelf: 'center'},
  rightContent: {
    flexDirection: 'row',
    marginRight: 10,
  },
  searchIcon: {
    height: 18,
    width: 18,
  },
  searchIconContainer: {alignSelf: 'center', marginRight: 15},
});
