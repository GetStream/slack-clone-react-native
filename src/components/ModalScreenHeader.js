import {useTheme} from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, View} from 'react-native';

import {CloseModalButton} from './CloseModalButton';
import {SCText} from './SCText';
import { Spacer } from './Spacer';

export const styles = StyleSheet.create({
  centerContent: {
    flex: 4,
    justifyContent: 'center',
    paddingBottom: 15,
  },
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
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 10 : 0
  },
  leftContent: {
    flex: 1,
    paddingBottom: 15,
  },
  rightContent: {
    flex: 1,
    paddingBottom: 15,
  },
});


export const ModalScreenHeader = (props) => {
  const {
    goBack,
    LeftContent = CloseModalButton,
    RightContent = () => <Spacer width={50} />,
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
        <View style={styles.leftContent}>
          <LeftContent goBack={goBack} />
        </View>
      <View style={styles.centerContent}>
        <SCText style={[styles.channelTitle, {color: colors.boldText}]}>
          {title}
        </SCText>
        {!!subTitle && (
          <SCText style={[styles.channelSubTitle, {color: colors.linkText}]}>
            {subTitle}
          </SCText>
        )}
      </View>
      <View style={styles.rightContent}>
        {!!RightContent && <RightContent />}
      </View>
    </View>
  );
};

