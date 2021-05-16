import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {getFastImageCompatibleUri} from '../utils';
import {SCText} from './SCText';

export const Giphy = React.memo((props) => (
  <TouchableOpacity style={styles.container}>
    <SCText style={styles.title}>{props.title}</SCText>
    <SCText style={styles.description}>Posted using Giphy.com</SCText>
    <Image
      source={{
        url: getFastImageCompatibleUri(props.image_url || props.thumb_url),
      }}
      style={styles.thumbnail}
    />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#E4E4E4',
    borderLeftWidth: 5,
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    fontWeight: '300',
    padding: 2,
  },
  thumbnail: {
    borderRadius: 10,
    height: 150,
    width: 250,
  },
  title: {
    color: '#1E75BE',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    padding: 2,
  },
});
