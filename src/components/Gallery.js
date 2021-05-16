import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  makeImageCompatibleUrl,
  useImageGalleryContext,
  useMessageContext,
  useOverlayContext,
  vw,
} from 'stream-chat-react-native';

const maxWidth = vw(100) - 72;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: maxWidth,
  },
  image: {
    borderRadius: 4,
    margin: 2,
    resizeMode: 'cover',
  },
  imageContainer: {flex: 1, padding: 0},
  moreImageContainer: {
    alignItems: 'center',
    backgroundColor: '#00000033',
    justifyContent: 'center',
    margin: 1,
  },
  moreImageText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
});

const GalleryWithContext = (props) => {
  const {images, message, setBlurType, setImage, setOverlay} = props;

  if (!images?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {images.slice(0, 4).map((image, colIndex) => {
        const attachmentUrl = image.image_url || image.thumb_url;
        if (attachmentUrl) {
          const url = makeImageCompatibleUrl(attachmentUrl);
          return (
            <TouchableOpacity
              key={`${message.id}-${attachmentUrl}-${colIndex}`}
              onPress={() => {
                setImage({messageId: message.id, url: attachmentUrl});
                setBlurType('dark');
                setOverlay('gallery');
              }}
              style={styles.imageContainer}>
              <Image
                source={{
                  uri: url,
                }}
                style={[
                  styles.image,
                  {
                    height: Math.min(maxWidth / images.length, 150),
                  },
                ]}
              />
              {colIndex === 3 && images.length > 4 ? (
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    styles.moreImageContainer,
                  ]}>
                  <Text style={styles.moreImageText}>{`+${
                    images.length - 3
                  }`}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        }
        return null;
      })}
    </View>
  );
};

const areEqual = (prevProps, nextProps) => {
  const {images: prevImages} = prevProps;
  const {images: nextImages} = nextProps;

  const imagesEqual =
    prevImages.length === nextImages.length &&
    prevImages.every(
      (image, index) =>
        image.image_url === nextImages[index].image_url &&
        image.thumb_url === nextImages[index].thumb_url,
    );
  if (!imagesEqual) return false;

  return true;
};

const MemoizedGallery = React.memo(GalleryWithContext, areEqual);

export const Gallery = () => {
  const {setImage} = useImageGalleryContext();
  const {setBlurType, setOverlay} = useOverlayContext();
  const {images, message} = useMessageContext();

  if (!images?.length) {
    return null;
  }

  return (
    <MemoizedGallery
      images={images}
      message={message}
      setBlurType={setBlurType}
      setImage={setImage}
      setOverlay={setOverlay}
    />
  );
};
