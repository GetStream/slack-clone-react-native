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
import {ChatUserContext, SCText} from '../utils';
import {useTheme} from '@react-navigation/native';

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
        // height: '100%',
        // width: '100%',
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
          <View style={{backgroundColor: colors.backgroundSecondary}}>
            <SCText style={{padding: 20, backgroundColor: colors.primary}}>
              Select a User
            </SCText>
            <FlatList
              data={[
                {
                  id: 'vishal',
                  name: 'Vishal Narkhede',
                  image:
                    'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-31658896398c-512',
                  value: 'vishal',
                },
                {
                  id: 'thierry',
                  name: 'Thierry',
                  image:
                    'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-31658896398c-512',
                  value: 'thierry',
                },
                {
                  id: 'jaap',
                  name: 'Jaap Baker',
                  image:
                    'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-31658896398c-512',
                  value: 'jaap',
                },
              ]}
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
    borderColor: 'blue',
    borderWidth: 2,

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
