import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Checkbox} from '../Checkbox/Checkbox';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({i, todo, onComplete, onDelete}: TodoItemProps) => {
  const handlePress = () => {
    onComplete(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id);
  };
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handlePress} style={styles.root}>
        <Checkbox checked={todo.completed} onPress={handlePress} />
        <Text style={styles.todoText}>
          {i + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeletePress}>
        <Icon name="remove" color="red" size={24} />
      </TouchableOpacity>
    </View>
  );
};
