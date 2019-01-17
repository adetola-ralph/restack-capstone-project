import indicative from 'indicative';
import Axios from 'axios';

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
} from '../constants';

export const toggleAuthForm = () => ({
  type: TOGGLE_AUTH_FIELDS,
});

export const setLoginFormField = (field, value) => ({
  type: SET_LOGIN_FORM_FIELD,
  field,
  value,
});

export const setRegisterFormField = (field, value) => ({
  type: SET_REGISTER_FORM_FIELD,
  field,
  value,
});

const loginFormRules = {
  email: 'required|email',
  password: 'required|min:6',
};

const loginFormErrorMessages = {
  required: '{{ field }} is required',
  'email.email': 'Please enter a valid email',
  'password.min': 'Password must be more than 6 characters',
}

const registerFormRules = {
  firstname: 'required',
  lastname: 'required',
  email: 'required|email',
  password: 'required|min:6',
  confirmpassword: 'required|same:password',
};

const registraterFormErrorMessages = {
  ...loginFormErrorMessages,
  same: 'confirmpassword must be the same as password'
}

export const loginFormError = (errors) => ({
  type: LOGIN_ERROR,
  errors,
});

export const succesfulLogin = (authObject) => ({
  type: SUCCESSFUL_LOGIN,
  authObject,
});

export const failedLogin = (message) => ({
  type: FAILED_LOGIN,
  message,
});

export const failedRegister = (message) => ({
  type: FAILED_REGISTRATION,
  message,
});

export const loginAction = () => async (dispatch, getState) => {
  const { auth } = getState();

  try {
    await indicative.validateAll(auth.loginForm, loginFormRules, loginFormErrorMessages);
  } catch (err) {
    console.log(err);
    return dispatch(loginFormError(err));
  }

  try {
    const response = await Axios.post('/api/auth/login', auth.loginForm);
    const result = response.data;
    dispatch(succesfulLogin(result));
  } catch (err) {
    dispatch(failedLogin('Wrong username or password'));
  }
};

export const registrationFormError = (errors) => ({
  type: REGISTRATION_ERROR,
  errors,
});

export const succesfulRegistration = (authObject) => ({
  type: SUCCESSFUL_REGISTRATION,
  authObject,
});

export const registrationAction = () => async (dispatch, getState) => {
  const { auth } = getState();

  try {
    await indicative.validateAll(auth.registerForm, registerFormRules, registraterFormErrorMessages);
  } catch (err) {
    console.log(err);
    return dispatch(registrationFormError(err));
  }

  try {
    const response = await Axios.post('/api/auth/register', auth.registerForm);
    const result = response.data;
    dispatch(succesfulRegistration(result));
  } catch (err) {
    dispatch(failedRegister('User with the email already exists'));
  }
};
