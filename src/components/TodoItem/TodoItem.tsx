import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  LightSpeedInLeft,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

import {Checkbox} from '../Checkbox/Checkbox';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

const MAX_OFFSET = -70;

export const TodoItem = ({
  i,
  todo,
  onComplete,
  onDelete,
  onPress,
}: TodoItemProps) => {
  const offset = useSharedValue(0);
  const start = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      console.log(e.translationX);
      if (
        e.translationX < -start.value &&
        e.translationX > MAX_OFFSET - start.value
      ) {
        offset.value = e.translationX + start.value;
      }
    })
    .onEnd(() => {
      start.value = offset.value;
    });

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{scale: offset.value / MAX_OFFSET}],
  }));

  const handlePress = () => {
    onPress(todo.id);
  };

  const handleComplete = () => {
    onComplete(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id);
  };
  return (
    <Animated.View entering={LightSpeedInLeft} style={[styles.row, style]}>
      <TouchableOpacity onPress={handlePress} style={styles.root}>
        <Checkbox checked={todo.completed} onPress={handleComplete} />
        <Text style={styles.todoText}>
          {i + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <GestureDetector gesture={gesture}>
        <View style={{height: 40, width: 30, backgroundColor: 'pink'}} />
      </GestureDetector>
      <Animated.View style={deleteStyle}>
        <TouchableOpacity onPress={handleDeletePress}>
          <Icon name="remove" color="red" size={24} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
