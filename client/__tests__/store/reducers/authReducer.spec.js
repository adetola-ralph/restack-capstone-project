import {
  LOGOUT,
  LOGIN_ERROR,
  FAILED_LOGIN,
  SUCCESSFUL_LOGIN,
  REGISTRATION_ERROR,
  TOGGLE_AUTH_FIELDS,
  SET_LOGIN_FORM_FIELD,
  SET_REGISTER_FORM_FIELD,
  SUCCESSFUL_REGISTRATION,
} from '../../../store/constants';

import AuthReducer, { defaultState } from '../../../store/reducer/authReducer';

describe('AuthReducer', () => {
  it('should return the default state', () => {
    const state = AuthReducer(undefined, { type: '' });

    expect(state).toEqual(defaultState);
  });

  test('setting auth form values', () => {
    const initialAction = {
      type: TOGGLE_AUTH_FIELDS,
    };

    const initialState = AuthReducer(defaultState, initialAction);

    expect(initialState).toEqual({ ...defaultState, isLoginForm: false, isRegisterForm: true });

    const newAction = {
      type: TOGGLE_AUTH_FIELDS,
    };

    const newState = AuthReducer(initialState, newAction);

    expect(newState).toEqual({ ...initialState, isLoginForm: true, isRegisterForm: false });
  });

  test('setting login form field values', () => {
    const action = {
      type: SET_LOGIN_FORM_FIELD,
      field: 'title',
      value: 'admin@oreofe.me',
    };

    const state = AuthReducer(defaultState, action);

    expect(state.loginForm).toHaveProperty('title', 'admin@oreofe.me');
  });

  test('setting register form field values', () => {
    const action = {
      type: SET_REGISTER_FORM_FIELD,
      field: 'password',
      value: 'password',
    };

    const state = AuthReducer(defaultState, action);

    expect(state.registerForm).toHaveProperty('password', 'password');
  });

  test('setting login error field values', () => {
    const action = {
      type: LOGIN_ERROR,
      errors: [
        {
          field: 'email',
          message: 'Email is invalid',
        },
        {
          field: 'password',
          message: 'Pasword is required',
        },
      ],
    };

    const state = AuthReducer(defaultState, action);

    expect(state.loginError).toHaveProperty('email', 'Email is invalid');
    expect(state.loginError).toHaveProperty('password', 'Pasword is required');
  });

  test('setting register error field values', () => {
    const action = {
      type: REGISTRATION_ERROR,
      errors: [
        {
          field: 'confirmpassword',
          message: 'Must be same as the password',
        },
        {
          field: 'email',
          message: 'Email is required',
        },
        {
          field: 'firstname',
          message: 'Firstname is required',
        },
      ],
    };

    const state = AuthReducer(defaultState, action);

    expect(state.registerError).toHaveProperty('confirmpassword', 'Must be same as the password');
    expect(state.registerError).toHaveProperty('firstname', 'Firstname is required');
    expect(state.registerError).toHaveProperty('email', 'Email is required');
  });

  test('logout', () => {
    const action = {
      type: LOGOUT,
    };

    const state = AuthReducer(defaultState, action);

    expect(state).toEqual(defaultState);
  });

  test('successful registration', () => {
    const action = {
      type: SUCCESSFUL_REGISTRATION,
      authObject: {
        token: 'token',
        user: {
          _id: 'idvaluehere',
          firstname: 'firstname',
          lastname: 'lastname',
        },
      },
    };

    const state = AuthReducer(defaultState, action);

    expect(state).toHaveProperty('isAuthenticated', true);
    expect(state).toHaveProperty('token', 'token');
    expect(state).toHaveProperty('user', action.authObject.user);
  });

  test('successful login', () => {
    const action = {
      type: SUCCESSFUL_LOGIN,
      authObject: {
        token: 'token',
        user: {
          _id: 'idvaluehere',
          firstname: 'firstname',
          lastname: 'lastname',
        },
      },
    };

    const state = AuthReducer(defaultState, action);

    expect(state).toHaveProperty('isAuthenticated', true);
    expect(state).toHaveProperty('token', 'token');
    expect(state).toHaveProperty('user', action.authObject.user);
  });

  test('failed login and registration', () => {
    const action = {
      type: FAILED_LOGIN,
      message: 'Login failed',
    };

    const state = AuthReducer(defaultState, action);
    expect(state).toHaveProperty('authError', 'Login failed');
  });
});
