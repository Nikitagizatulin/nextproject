import { success } from 'redux-saga-requests';
import {
  ADD_TODO,
  UPDATE_TODO_STATUS,
  DELETE_TODO,
  UPDATE_TODO_VALUE,
  FETCH_TODOS,
  FETCH_TODOS_FAILURE,
} from './actions';

export default (state = { todoList: [] }, action) => {
  switch (action.type) {
    case success(FETCH_TODOS):
      return {
        ...state,
        todoList: action.payload.data,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        todoList: [],
      };
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload.todo],
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload.todo.id),
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
      };
    case UPDATE_TODO_VALUE:
      return {
        ...state,
      };
    default:
      return state;
  }
};