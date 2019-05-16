import { success, error } from 'redux-saga-requests';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './actions';

const initialState = {
  userToken: null,
  user: null,
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case success(LOGIN_USER):
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
      localStorage.setItem('userToken', JSON.stringify(action.payload.data.userToken));
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        error: {},
      };
    case error(LOGIN_USER):
      return {
        ...state,
        loading: false,
        error: {
          ...action.payload.response.data,
        },
      };
    case REGISTER_USER:
      return {
        ...state,
        loading: true,
      };
    case success(REGISTER_USER):
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
      localStorage.setItem('userToken', JSON.stringify(action.payload.data.userToken));
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        error: {},
      };
    case error(REGISTER_USER):
      return {
        ...state,
        loading: false,
        error: {
          ...action.payload.response.data,
        },
      };
    case LOGOUT_USER:
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      return {
        userToken: null,
        user: null,
        loading: false,
        error: {},
      };
    default:
      return state;
  }
};
