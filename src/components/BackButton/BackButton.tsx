import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {BackButtonProps} from './BackButton.types';

export const BackButton = ({onPress}: BackButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="chevron-left" size={24} />
  </TouchableOpacity>
);
