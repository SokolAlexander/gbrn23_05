import React, {useEffect, useMemo} from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  SectionList,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  IntervalTrigger,
  TriggerType,
} from '@notifee/react-native';

import {TextField} from '../../components/TextField/TextField';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changeTodo, deleteTodo, getTodos} from '../../store/actions';
import {selectTodos} from '../../store/selectors';
import {styles} from './TodoList.styles';
import {Todo, TodoListProps} from './TodoList.types';
import {GesturedComp} from '../../../GesturedComponent';

// 'https://my-cdn.com/icons/snooze.png',

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

  const sendPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000, // Через 5 секунд
    };

    await notifee.createTriggerNotification(
      {
        title: '<p style="color: #453424">Notification Title</p>',
        body: 'Main body content of the notification',
        android: {
          channelId,
          ongoing: true,
          importance: AndroidImportance.HIGH,
          asForegroundService: true,
          pressAction: {
            id: 'default',
          },
          actions: [
            {
              title: 'Action',
              icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                id: 'action1',
              },
            },
            {
              title: 'Action2',
              icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                id: 'action2',
              },
            },
          ],
        },
        data: {
          id: '1',
        },
      },
      trigger,
    );
  };

  const isAppOpenedByNotif = async () => {
    const initNotif = await notifee.getInitialNotification();
    if (initNotif) {
      const id = initNotif.notification.data?.id;
      navigation.navigate('TodoDetails', {
        todoId: +(id as string),
      });
    }
  };

  useEffect(() => {
    isAppOpenedByNotif();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        case EventType.ACTION_PRESS:
          console.log(detail.pressAction?.id);
      }
    });
  }, []);

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

  const stopService = () => {
    notifee.stopForegroundService();
  };

  return (
    <>
      {/* <SectionList
        contentContainerStyle={styles.container}
        style={styles.root}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        sections={[
          {title: 'Completed', data: sections.completed},
          {title: 'Not Completed', data: sections.notCompl},
        ]}
        renderSectionHeader={({section}) => <Text>{section.title}</Text>}
        renderItem={renderTodo}
      /> */}
      <FlatList
        data={sections.notCompl}
        contentContainerStyle={styles.container}
        style={styles.root}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        renderItem={renderTodo}
      />
    </>
  );
};
