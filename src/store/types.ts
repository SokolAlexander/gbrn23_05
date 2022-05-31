import {Todo} from '../screens/TodoList/TodoList.types';
import {FETCH_STATUSES} from '../utils/constants';

export type TodosMap = {
  [id: string]: Todo;
};

export type TodosState = {
  status: FETCH_STATUSES;
  todos: TodosMap;
};

export type GetTodosRequestAction = {
  type: string;
};
export type GetTodosSuccessAction = {
  type: string;
  payload: TodosMap;
};
export type GetTodosFailureAction = {
  type: string;
  payload: any;
};

export type ChangeTodoAction = {
  type: string;
  payload: Todo;
};

export type Action =
  | GetTodosRequestAction
  | GetTodosSuccessAction
  | GetTodosFailureAction
  | ChangeTodoAction;
