import { success, error } from 'redux-saga-requests';
import {
    ADD_TODO,
    UPDATE_TODO_STATUS,
    DELETE_TODO,
    UPDATE_TODO_VALUE,
    FETCH_TODOS,
    FETCH_STATISTIC
} from './actions';

const initialState = {
    todoList: [],
    todoStatistic: {
        countOfUsers: 0,
        countOfTodos: 0,
        countOfCompletedTodos: 0
    }
};

export default (state = initialState, action) => {
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
        case FETCH_STATISTIC:
            return state;
        case success(FETCH_STATISTIC):
            return {
                ...state,
                todoStatistic: action.payload.data
            };
        case error(FETCH_STATISTIC):
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
                todoList: [action.payload.data, ...state.todoList]
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
