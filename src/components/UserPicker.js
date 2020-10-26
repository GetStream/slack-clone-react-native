import React, {Component, useContext, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {ChatClientService, ChatUserContext, USERS} from '../utils';
import {useTheme} from '@react-navigation/native';
import {SCText} from './SCText';

export const UserPicker = props => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const chatClient = ChatClientService.getClient();
  const {switchUser} = useContext(ChatUserContext);
  const {colors} = useTheme();

  useEffect(() => {
    setModalVisible(props.modalVisible);
  }, [props.modalVisible]);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        position: 'absolute',
      }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          props.onRequestClose();
        }}>
        <TouchableHighlight
          style={styles.container}
          onPress={() => {
            props.onRequestClose();
          }}
          underlayColor={'#333333cc'}>
          <View>
            <SCText
              style={{
                padding: 20,
                backgroundColor: colors.primary,
                color: colors.textInverted,
                fontWeight: '900',
              }}>
              Switch User
            </SCText>
            <FlatList
              style={{height: 420}}
              data={Object.values(USERS)}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => {
                      switchUser(item[props.value]);
                      props.onRequestClose();
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 10,
                        backgroundColor: colors.backgroundSecondary,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: item.image}}
                        style={{height: 35, width: 35}}
                      />
                      <View>
                        <SCText style={{color: colors.text, paddingLeft: 20}}>
                          {item.name}{' '}
                          {item.id === chatClient.user.id ? (
                            <SCText
                              style={{
                                fontStyle: 'italic',
                                fontSize: 12,
                                color: '#32CD32',
                              }}>
                              (current logged in user)
                            </SCText>
                          ) : (
                            ''
                          )}
                        </SCText>
                        <SCText
                          style={{
                            color: colors.linkText,
                            fontSize: 13,
                            paddingLeft: 20,
                          }}>
                          @{item.id}
                        </SCText>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
            />
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333333cc',
    padding: 16,
  },
  itemText: {
    backgroundColor: '#fff',
    padding: 16,
    fontSize: 18,
    color: '#222',
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
});
