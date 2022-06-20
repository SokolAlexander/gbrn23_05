import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {styles} from './Gallery.styles';
import {GalleryProps} from './Gallery.types';

export const Gallery = ({imgs, onPress}: GalleryProps) => (
  <>
    {imgs.map(img => (
      <TouchableOpacity onPress={() => onPress(img.uri)} key={img.fileName}>
        <Image
          resizeMode="stretch"
          source={{uri: img.uri}}
          style={styles.img}
        />
      </TouchableOpacity>
    ))}
  </>
);
