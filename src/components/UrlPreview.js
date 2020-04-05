import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

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
    <TouchableOpacity
      style={{
        borderLeftWidth: 5,
        borderLeftColor: '#E4E4E4',
        paddingLeft: 10,
        marginLeft: 10,
        flexDirection: 'row',
      }}>
      <View style={{flexDirection: 'column', flex: 6}}>
        <Text style={urlPreviewStyles.titleUrl}>
          {getDomain(props.title_link)}
        </Text>
        <Text style={urlPreviewStyles.title}>{props.title}</Text>
        <Text style={urlPreviewStyles.description}>{props.text}</Text>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={{
            url: props.image_url || props.thumb_url,
          }}
          style={{height: 40, width: 40}}
        />
      </View>
    </TouchableOpacity>
  );
};

const urlPreviewStyles = StyleSheet.create({
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
