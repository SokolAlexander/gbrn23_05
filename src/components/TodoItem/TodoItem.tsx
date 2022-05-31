import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {Checkbox} from '../Checkbox/Checkbox';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({i, todo, onComplete}: TodoItemProps) => {
  const handlePress = () => {
    onComplete(todo.id);
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <>
        <Checkbox checked={todo.completed} />
        <Text key={todo.id} style={styles.todoText}>
          {i + 1}: {todo.title}
        </Text>
      </>
    </TouchableOpacity>
  );
};
