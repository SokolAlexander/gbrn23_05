import React, {useEffect, useMemo} from 'react';
import {ListRenderItemInfo, SectionList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextField} from '../../components/TextField/TextField';

import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changeTodo, deleteTodo, getTodos} from '../../store/actions';
import {selectTodos} from '../../store/selectors';
import {styles} from './TodoList.styles';
import {Todo, TodoListProps} from './TodoList.types';

export const TodoList = ({navigation}: TodoListProps) => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handlePressTodo = (id: number) => {
    const updatedTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(changeTodo(updatedTodo));
  };

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      completed: false,
      title: text,
      imgs: [],
    };

    dispatch(changeTodo(newTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const toDetails = (id: number) => {
    navigation.navigate('TodoDetails', {todoId: id});
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, [dispatch]);

  const renderTodo = ({item, index}: ListRenderItemInfo<Todo>) => (
    <TodoItem
      todo={item}
      i={index}
      onPress={toDetails}
      onComplete={handlePressTodo}
      onDelete={handleDeleteTodo}
      key={item.id}
    />
  );

  const sections = useMemo(() => {
    return Object.values(todos).reduce<{completed: Todo[]; notCompl: Todo[]}>(
      (acc, el) => {
        if (el.completed) {
          acc.completed.push(el);
        } else {
          acc.notCompl.push(el);
        }
        return acc;
      },
      {completed: [], notCompl: []},
    );
  }, [todos]);

  // return (
  //   <ScrollView contentContainerStyle={styles.container} style={styles.root}>
  //     <TextField onSubmit={handleAddTodo} />
  //     {Object.values(todos).map((el, i) => (
  //       <TodoItem
  //         todo={el}
  //         i={i}
  //         onComplete={handlePressTodo}
  //         onDelete={handleDeleteTodo}
  //         key={el.id}
  //       />
  //     ))}
  //   </ScrollView>
  // );
  return (
    <SectionList
      contentContainerStyle={styles.container}
      style={styles.root}
      ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
      sections={[
        {title: 'Completed', data: sections.completed},
        {title: 'Not Completed', data: sections.notCompl},
      ]}
      renderSectionHeader={({section}) => <Text>{section.title}</Text>}
      renderItem={renderTodo}
    />
  );
};
