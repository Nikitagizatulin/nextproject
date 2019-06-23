export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = data => ({
    type: LOGIN_USER,
    payload: {
        request: {
            method: 'POST',
            url: 'api/login',
            data
        }
    }
});

export const SET_USER_FROM_COOKIE = 'SET_USER_FROM_COOKIE';
export const userFromCookie = data => ({
    type: SET_USER_FROM_COOKIE,
    payload: data
});

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = data => ({
    type: REGISTER_USER,
    payload: {
        request: {
            method: 'POST',
            url: 'api/register',
            data
        }
    }
});

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: {
        request: {
            method: 'POST',
            url: 'api/logout'
        }
    }
});
