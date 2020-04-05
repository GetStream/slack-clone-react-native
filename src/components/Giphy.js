import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export const Giphy = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>Posted using Giphy.com</Text>
      <Image
        source={{
          url: props.image_url || props.thumb_url,
        }}
        style={styles.thumbnail}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 5,
    borderLeftColor: '#E4E4E4',
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'column',
  },
  thumbnail: {
    height: 150,
    width: 250,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    color: '#1E75BE',
    padding: 2,
  },
  description: {
    fontFamily: 'Lato-Regular',
    padding: 2,
    fontSize: 13,
    fontWeight: '300',
  },
});
