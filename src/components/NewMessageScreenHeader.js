import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import iconSearch from '../images/icon-search.png';
import iconThreeDots from '../images/icon-3-dots.png';

export const NewMessageScreenHeader = ({goBack, channel, client}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <TouchableOpacity
          onPress={() => {
            goBack && goBack();
          }}>
          <Text style={styles.hamburgerIcon}>x</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.channelTitle}>New Message</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  leftContent: {
    position: 'absolute',
    left: 20,
  },
  hamburgerIcon: {
    fontSize: 27,
  },
  channelTitle: {
    color: 'black',
    textAlign: 'center',
    alignContent: 'center',
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 17,
    fontFamily: 'Lato-Regular',
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
