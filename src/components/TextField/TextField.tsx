import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField = ({
  onSubmit,
  initialValue = '',
  onChangeText,
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    if (value) {
      onSubmit && onSubmit(value);
      if (!initialValue) {
        setValue('');
      }
    }
  };

  const handleChange = (text: string) => {
    setValue(text);
    onChangeText && onChangeText(text);
  };

  return (
    <TextInput
      placeholder="Enter a Todo title"
      style={styles.root}
      value={value}
      onChangeText={handleChange}
      onSubmitEditing={handleSubmit}
    />
  );
};
