import React from 'react';
import {View} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked}: CheckboxProps) => (
  <View style={[styles.box, checked && styles.filled]} />
);
