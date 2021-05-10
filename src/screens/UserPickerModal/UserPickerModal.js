import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableHighlight, View} from 'react-native';

import {SCText} from '../../components/SCText';
import {UserList} from './UserList';

export const UserPickerModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  const {colors} = useTheme();

  useEffect(() => {
    setModalVisible(props.modalVisible);
  }, [props.modalVisible]);

  return (
    <View style={styles.container}>
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
          style={styles.overlay}
          underlayColor={'#333333cc'}>
          <View>
            <View
              style={[
                styles.header,
                {
                  backgroundColor: colors.primary,
                },
              ]}>
              <SCText
                style={[
                  styles.headerTitle,
                  {
                    color: colors.textInverted,
                  },
                ]}>
                Switch User
              </SCText>
              <SCText
                style={[
                  styles.headerSubtitle,
                  {
                    color: colors.textInverted,
                  },
                ]}>
                (Please make sure auth check is disabled)
              </SCText>
            </View>
            <UserList />
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
  },
  header: {
    padding: 10,
  },
  headerSubtitle: {
    fontSize: 10,
  },
  headerTitle: {
    fontWeight: '900',
  },
  itemText: {
    backgroundColor: '#fff',
    borderColor: '#CCC',
    borderTopWidth: 1,
    color: '#222',
    fontSize: 18,
    padding: 16,
  },
  overlay: {
    backgroundColor: '#333333cc',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
