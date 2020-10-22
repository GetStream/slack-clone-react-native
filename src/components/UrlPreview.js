import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { SCText, theme , isDark} from '../utils';

export const UrlPreview = props => {
  const getDomain = url => {
    let domain = url && url.replace('https://', '').replace('http://', '');

    if (!domain) {
      return url;
    }
    const indexOfSlash = domain.indexOf('/');
    if (indexOfSlash === -1) {
      return domain;
    }

    return domain.slice(0, indexOfSlash);
  };
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.detailsContainer}>
        <SCText style={styles.titleUrl}>{getDomain(props.title_link)}</SCText>
        <SCText style={styles.title}>{props.title}</SCText>
        <SCText style={styles.description}>{props.text}</SCText>
      </View>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{
            url: props.image_url || props.thumb_url,
          }}
          style={styles.thumbnail}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 5,
    borderLeftColor: '#E4E4E4',
    paddingLeft: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  detailsContainer: {
    flexDirection: 'column',
    flex: 6,
  },
  thumbnailContainer: {
    flex: 1,
  },
  thumbnail: {
    height: 40,
    width: 40,
  },
  titleUrl: {
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    padding: 2,
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
  },
});
