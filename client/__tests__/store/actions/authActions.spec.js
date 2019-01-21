import indicative from 'indicative';
import Axios from 'axios';
import Moxios from 'moxios';
import shortid from 'shortid';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  LOGIN_ERROR,
  FAILED_LOGIN,
  SUCCESSFUL_LOGIN,
  REGISTRATION_ERROR,
  TOGGLE_AUTH_FIELDS,
  FAILED_REGISTRATION,
  SET_LOGIN_FORM_FIELD,
  SET_REGISTER_FORM_FIELD,
  SUCCESSFUL_REGISTRATION,
  LOGOUT,
} from '../../../store/constants';

import {
  failedLogin,
  failedRegister,
  loginAction,
  loginFormError,
  logout,
  registrationAction,
  registrationFormError,
  setLoginFormField,
  setRegisterFormField,
  succesfulLogin,
  succesfulRegistration,
  toggleAuthForm,
} from '../../../store/actions/authActions';

import { defaultState } from '../../../store/reducer/authReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: defaultState,
});

const formErrors = [
  {
    title: 'Title is required',
  },
];

const userId = shortid.generate();

const authObject = {
  token: 'token',
  user: {
    _id: userId,
  },
};

describe('AuthActions', () => {
  test('toggleAuthForm', () => {
    expect(toggleAuthForm()).toEqual({
      type: TOGGLE_AUTH_FIELDS,
    });
  });

  test('setLoginFormField', () => {
    expect(setLoginFormField('title', 'name')).toEqual({
      type: SET_LOGIN_FORM_FIELD,
      field: 'title',
      value: 'name',
    });
  });

  test('setRegisterFormField', () => {
    expect(setRegisterFormField('title', 'name')).toEqual({
      type: SET_REGISTER_FORM_FIELD,
      field: 'title',
      value: 'name',
    });
  });

  test('loginFormError', () => {
    expect(loginFormError(formErrors)).toEqual({
      type: LOGIN_ERROR,
      errors: formErrors,
    });
  });

  test('registrationFormError', () => {
    expect(registrationFormError(formErrors)).toEqual({
      type: REGISTRATION_ERROR,
      errors: formErrors,
    });
  });

  test('succesfulLogin', () => {
    expect(succesfulLogin(authObject)).toEqual({
      type: SUCCESSFUL_LOGIN,
      authObject,
    });
  });

  test('failedLogin', () => {
    expect(failedLogin('Error message')).toEqual({
      type: FAILED_LOGIN,
      message: 'Error message',
    });
  });

  test('failedRegister', () => {
    expect(failedRegister('Error message')).toEqual({
      type: FAILED_REGISTRATION,
      message: 'Error message',
    });
  });

  test('succesfulRegistration', () => {
    expect(succesfulRegistration(authObject)).toEqual({
      type: SUCCESSFUL_REGISTRATION,
      authObject,
    });
  });

  test('logout', () => {
    expect(logout()).toEqual({
      type: LOGOUT,
    });
  });

  describe('async actions', () => {
    beforeEach(() => {
      Moxios.install(Axios);
    });

    afterEach(() => {
      jest.resetAllMocks();
      store.clearActions();
      Moxios.uninstall(Axios);
    });

    test('loginAction', async () => {
      Moxios.stubOnce('post', '/api/auth/login', {
        status: 200,
        response: authObject,
      });

      indicative.validateAll = jest.fn(() => Promise.resolve());

      await store.dispatch(loginAction());

      expect(store.getActions()).toEqual([{ authObject, type: SUCCESSFUL_LOGIN }]);
      store.clearActions();
    });

    test('loginAction failed authentication', async () => {
      Moxios.stubFailure('post', '/api/auth/login', {
        status: 404,
        responsetext: 'User not found',
      });

      indicative.validateAll = jest.fn(() => Promise.resolve());

      await store.dispatch(loginAction());

      expect(store.getActions()).toEqual([
        {
          type: FAILED_LOGIN,
          message: 'Wrong username or password',
        },
      ]);
      store.clearActions();
    });

    test('loginAction failed validation', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      indicative.validateAll = jest.fn(() => Promise.reject([{ title: 'Title is required' }]));

      await store.dispatch(loginAction());

      expect(store.getActions()).toEqual([{ type: LOGIN_ERROR, errors: [{ title: 'Title is required' }] }]);
      store.clearActions();
    });

    test('registrationAction', async () => {
      Moxios.stubOnce('post', '/api/auth/register', {
        status: 200,
        response: authObject,
      });

      indicative.validateAll = jest.fn(() => Promise.resolve());

      await store.dispatch(registrationAction());

      expect(store.getActions()).toEqual([{ authObject, type: SUCCESSFUL_REGISTRATION }]);
      store.clearActions();
    });

    test('registrationAction failed authentication', async () => {
      Moxios.stubFailure('post', '/api/auth/register', {
        status: 404,
        responsetext: 'User not found',
      });

      indicative.validateAll = jest.fn(() => Promise.resolve());

      await store.dispatch(registrationAction());

      expect(store.getActions()).toEqual([
        {
          type: FAILED_REGISTRATION,
          message: 'User with the email already exists',
        },
      ]);
      store.clearActions();
    });

    test('registrationAction failed validation', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      indicative.validateAll = jest.fn(() => Promise.reject([{ title: 'Title is required' }]));

      await store.dispatch(registrationAction());

      expect(store.getActions()).toEqual([{ type: REGISTRATION_ERROR, errors: [{ title: 'Title is required' }] }]);
      store.clearActions();
    });
  });
});
