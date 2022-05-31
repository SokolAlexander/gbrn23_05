import {FETCH_STATUSES} from '../utils/constants';
import {
  CHANGE_TODO,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
} from './actions';
import {
  Action,
  ChangeTodoAction,
  GetTodosSuccessAction,
  TodosState,
} from './types';

const initialState: TodosState = {
  todos: {},
  status: FETCH_STATUSES.idle,
};

const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST: {
      return {
        ...state,
        status: FETCH_STATUSES.request,
      };
    }
    case GET_TODOS_SUCCESS: {
      return {
        ...state,
        status: FETCH_STATUSES.success,
        todos: (action as GetTodosSuccessAction).payload,
      };
    }
    case GET_TODOS_FAILURE: {
      return {
        ...state,
        status: FETCH_STATUSES.failure,
      };
    }
    case CHANGE_TODO: {
      const typedAction = action as ChangeTodoAction;
      return {
        ...state,
        todos: {
          ...state.todos,
          [typedAction.payload.id]: typedAction.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
