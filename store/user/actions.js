export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = data => ({
  type: LOGIN_USER,
  payload: {
    request: {
      method: 'POST',
      url: '/login',
      data,
    },
  },
});

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = data => ({
  type: REGISTER_USER,
  payload: {
    request: {
      method: 'POST',
      url: '/register',
      data,
    },
  },
});

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
