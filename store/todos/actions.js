export const FETCH_TODOS = 'FETCH_TODOS';
export const fetchTodos = () => ({
    type: FETCH_TODOS,
    payload: {
        request: {
            method: 'GET',
            url: '/todos'
        }
    }
});

export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const fetchTodosFailure = error => ({
    type: FETCH_TODOS_FAILURE,
    payload: { error }
});

export const ADD_TODO = 'ADD_TODO';
export const addTodo = value => ({
    type: ADD_TODO,
    payload: {
        request: {
            method: 'POST',
            url: 'api/todo',
            data: { value } 
        }
    }
});

export const UPDATE_TODO_VALUE = 'UPDATE_TODO_VALUE';
export const updateTodoValue = (id, value) => ({
    type: UPDATE_TODO_VALUE,
    payload: {
        todo: {
            id,
            value
        }
    }
});

export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const updateTodoStatus = id => ({
    type: UPDATE_TODO_STATUS,
    payload: {
        todo: {
            id
        }
    }
});

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = id => ({
    type: DELETE_TODO,
    payload: {
        todo: {
            id
        }
    }
});
