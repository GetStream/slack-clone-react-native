import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
  
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SCText} from './SCText';

export const ModalScreenHeader = ({goBack, title, subTitle}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          marginTop: insets.top > 0 ? 10 : 5,
        },
      ]}>
      <View style={styles.leftContent}>
        <TouchableOpacity
          onPress={() => {
            goBack && goBack();
          }}>
          <SCText style={styles.hamburgerIcon}>x</SCText>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  leftContent: {
    position: 'absolute',
    left: 20,
  },
  hamburgerIcon: {
    fontSize: 27,
  },
  channelTitle: {
    textAlign: 'center',
    alignContent: 'center',
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 17,
  },
  channelSubTitle: {
    textAlign: 'center',
    alignContent: 'center',
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 13,
  },
  rightContent: {
    flexDirection: 'row',
    marginRight: 10,
  },
  searchIconContainer: {marginRight: 15, alignSelf: 'center'},
  searchIcon: {
    height: 18,
    width: 18,
  },
  menuIcon: {
    height: 18,
    width: 18,
  },
  menuIconContainer: {alignSelf: 'center'},
});
