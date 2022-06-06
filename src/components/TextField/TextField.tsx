import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField = ({onSubmit}: TextFieldProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <TextInput
      placeholder="Enter a Todo title"
      style={styles.root}
      value={value}
      onChangeText={setValue}
      onSubmitEditing={handleSubmit}
    />
  );
};
