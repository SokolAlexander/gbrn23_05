import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import {SaveButton} from '../../components/SaveButton/SaveButton';
import {TextField} from '../../components/TextField/TextField';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';
import {TodoDetailsProps} from './TodoDetails.types';
import {Gallery} from '../../components/Gallery/Gallery';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const dispatch = useDispatch();

  const todo = useSelector(selectTodoById(route.params.todoId));
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [navigation, todo]);

  const handleChangeTodo = () => {
    const newTodo = {
      ...todo,
      title: editedTitle,
    };

    dispatch(changeTodo(newTodo));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          disabled={editedTitle === todo.title}
          onPress={handleChangeTodo}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, todo.title, editedTitle]);

  const handlePress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          const newTodo = {
            ...todo,
            imgs: [...todo.imgs, ...assets],
          };
          dispatch(changeTodo(newTodo));
        }
      },
    );
  };

  const handleImagePress = (imgUri?: string) => {
    navigation.navigate('ImgFull', {uri: imgUri || '', todoId: todo.id});
  };

  return (
    <ScrollView>
      <TextField onChangeText={setEditedTitle} initialValue={todo.title} />
      <Text style={{fontSize: 20}}>Hello, {todo.title}</Text>
      <Gallery onPress={handleImagePress} imgs={todo.imgs} />
      <Button onPress={handlePress} title="Select Image" />
    </ScrollView>
  );
};
