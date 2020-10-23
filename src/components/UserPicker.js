import React, {Component, useContext, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {ChatUserContext, USERS} from '../utils';
import {useTheme} from '@react-navigation/native';
import {SCText} from './SCText';

export const UserPicker = props => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
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
                    {props.renderRow ? (
                      props.renderRow(item, index)
                    ) : (
                      <Text style={styles.itemText}>{item[props.label]}</Text>
                    )}
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
