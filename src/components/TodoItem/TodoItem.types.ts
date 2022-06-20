import {Todo} from '../../screens/TodoList/TodoList.types';

export type TodoItemProps = {
  todo: Todo;
  i: number;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onPress: (id: number) => void;
};
