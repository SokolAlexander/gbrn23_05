import React from 'react';
import {Dimensions, Image, View} from 'react-native';

import {ImgFullProps} from './ImgFull.types';

const {width, height} = Dimensions.get('window');

export const ImgFull = ({route, navigation}: ImgFullProps) => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: route.params.uri}}
        resizeMode="contain"
        style={{width: width * 0.9, height: height * 0.6}}
      />
    </View>
  );
};
