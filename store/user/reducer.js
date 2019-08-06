import { success, error } from 'redux-saga-requests';
import { removeCookie } from 'utils/Cookies';
import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    SET_USER_FROM_COOKIE,
    UPDATE_USER
} from './actions';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loading: true
            };
        case success(LOGIN_USER):
            return {
                ...state,
                ...action.payload.data,
                isAuthenticated: true,
                loading: false,
                error: {}
            };
        case error(LOGIN_USER):
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: {
                    ...action.payload.response.data
                }
            };
        case REGISTER_USER:
            return {
                ...state,
                loading: true
            };
        case success(REGISTER_USER):
            return {
                ...state,
                ...action.payload.data,
                isAuthenticated: true,
                loading: false,
                error: {}
            };
        case error(REGISTER_USER):
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: {
                    ...action.payload.response.data
                }
            };
        case UPDATE_USER:
            return {
                ...state,
                loading: true
            };
        case success(UPDATE_USER):
            return {
                ...state,
                ...action.payload.data,
                loading: false,
                error: {}
            };
        case error(UPDATE_USER):
            return {
                ...state,
                loading: false,
                error: {
                    ...action.payload.response.data
                }
            };
        case LOGOUT_USER:
            removeCookie('jwt');
            return {
                isAuthenticated: false,
                user: {},
                loading: false,
                error: {}
            };
        case SET_USER_FROM_COOKIE:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        default:
            return state;
    }
};
