import React from 'react';
import {Alert, Image, View, StyleSheet} from 'react-native';

import {ScreenHeader} from './ScreenHeader';
import {useTheme} from '@react-navigation/native';
import {ChatClientService, SCText, notImplemented} from '../utils';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SVGIcon} from '../components/SVGIcon';

export const ProfileScreen = props => {
  const {colors} = useTheme();
  const chatClient = ChatClientService.getClient();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View style={{flex: 1}}>
        <ScreenHeader navigation={props.navigation} title="You" />
        <View style={styles.container}>
          <View style={styles.row}>
            <View>
              <Image
                style={styles.userImage}
                source={{
                  uri: chatClient.user.image,
                }}
              />
            </View>
            <View style={styles.userDetails}>
              <SCText style={styles.userName}>
                {chatClient.user.name} {chatClient.user.status}
              </SCText>
              <SCText style={styles.status}>Active</SCText>
            </View>
          </View>
          <TouchableOpacity
            onPress={notImplemented}
            style={[
              {
                padding: 13,
                borderWidth: 1,
                marginTop: 20,
                paddingLeft: 20,
                borderRadius: 10
              },
              {
                borderColor: colors.border,
              },
            ]}>
            <SCText style={{fontSize: 14}}>Whats your status</SCText>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
            }}>
            <View
              style={[
                styles.actionItemSection,
                {
                  borderTopColor: colors.border,
                  borderTopWidth: 0.5,
                },
              ]}>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={notImplemented}>
                <SVGIcon type={'dnd'} height="23" width="23" />
                <SCText style={{paddingLeft: 20}}>{'Do not disturb'}</SCText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={notImplemented}>
                <SVGIcon type={'away'} height="23" width="23" />
                <SCText style={{paddingLeft: 20}}>{'Set yourself away'}</SCText>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.actionItemSection,
                {
                  borderTopColor: colors.border,
                  borderTopWidth: 0.5,
                },
              ]}>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={notImplemented}>
                <SVGIcon type={'notifications'} height="23" width="23" />
                <SCText style={{paddingLeft: 20}}>{'Notifications'}</SCText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={notImplemented}>
                <SVGIcon type={'preferences'} height="23" width="23" />
                <SCText style={{paddingLeft: 20}}>{'Preferences'}</SCText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={notImplemented}>
                <SVGIcon type={'saved-items'} height="23" width="23" />
                <SCText style={{paddingLeft: 20}}>{'Saved items'}</SCText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionItemContainer}
                onPress={notImplemented}>
                <SVGIcon type={'view-profile'} height="23" width="23" />
                <SCText style={{paddingLeft: 20}}>{'View profile'}</SCText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  userDetails: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    padding: 8,
    paddingLeft: 20,
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 7,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    fontSize: 12,
    fontWeight: '400',
  },
  actionItemSection: {},
  actionItemContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
});
