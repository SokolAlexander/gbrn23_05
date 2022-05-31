import {Todo} from '../../screens/TodoList/TodoList.types';

export type TodoItemProps = {
  todo: Todo;
  i: number;
  onComplete: (id: number) => void;
};
