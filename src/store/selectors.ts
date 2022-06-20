import {TodosState} from './types';

export const selectTodos = (state: TodosState) => state.todos;
export const selectTodoById = (id: number) => (state: TodosState) =>
  state.todos[id];
