import {useTheme} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

import {ChatClientService, ChatUserContext, USERS} from '../utils';
import {SCText} from './SCText';

export const UserPicker = (props) => {
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
        animationType='fade'
        onRequestClose={() => {
          setModalVisible(false);
          props.onRequestClose();
        }}
        transparent={true}
        visible={modalVisible}>
        <TouchableHighlight
          onPress={() => {
            props.onRequestClose();
          }}
          style={styles.container}
          underlayColor={'#333333cc'}>
          <View>
            <SCText
              style={{
                backgroundColor: colors.primary,
                color: colors.textInverted,
                fontWeight: '900',
                padding: 20,
              }}>
              Switch User
            </SCText>
            <FlatList
              data={Object.values(USERS)}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableHighlight
                  onPress={() => {
                    switchUser(item[props.value]);
                    props.onRequestClose();
                  }}
                  underlayColor={'transparent'}>
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: colors.backgroundSecondary,
                      flexDirection: 'row',
                      padding: 10,
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
                              color: '#32CD32',
                              fontSize: 12,
                              fontStyle: 'italic',
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
              )}
              style={{height: 420}}
            />
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333cc',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  itemText: {
    backgroundColor: '#fff',
    borderColor: '#CCC',
    borderTopWidth: 1,
    color: '#222',
    fontSize: 18,
    padding: 16,
  },
});
