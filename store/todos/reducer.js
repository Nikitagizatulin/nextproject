import { success, error } from 'redux-saga-requests';
import {
    ADD_TODO,
    UPDATE_TODO_STATUS,
    DELETE_TODO,
    UPDATE_TODO_VALUE,
    FETCH_TODOS
} from './actions';

export default (state = { todoList: [] }, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return state;
        case success(FETCH_TODOS):
            return {
                ...state,
                todoList: action.payload.data
            };
        case error(FETCH_TODOS):
            return {
                ...state,
                error: action.payload.error,
                todoList: []
            };
        case ADD_TODO:
            return state;
        case success(ADD_TODO):
            return {
                ...state,
                todoList: [...state.todoList, action.payload.data]
            };
        case error(ADD_TODO):
            return {
                ...state,
                error: action.payload.error
            };
        case DELETE_TODO:
            return state;
        case success(DELETE_TODO):
            return {
                ...state,
                todoList: state.todoList.filter(
                    todo => todo._id !== action.payload.data.id
                )
            };
        case error(DELETE_TODO):
            return {
                ...state,
                error: action.payload.error
            };
        case UPDATE_TODO_STATUS:
            return {
                ...state
            };
        case success(UPDATE_TODO_STATUS):
            return {
                ...state,
                todoList: state.todoList.map(todo =>
                    todo._id === action.payload.data.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
        case error(UPDATE_TODO_STATUS):
            return {
                ...state,
                error: action.payload.error
            };
        case UPDATE_TODO_VALUE:
            return {
                ...state
            };
        default:
            return state;
    }
};
