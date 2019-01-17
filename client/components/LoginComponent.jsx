import React from 'react';
import PropTypes from 'prop-types';

import { AuthContainer, AuthContainerTitle, FormControl, FormInput, FormSwitch, FormButton, FormAction, ErrorMessage } from './styled';

const LoginComponent = ({ toggleAuthForm, loginForm, onFieldChange, loginAction, loginError, authError }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    loginAction();
  };

  return (
    <AuthContainer>
      <AuthContainerTitle>
        Login
      </AuthContainerTitle>
      {authError && <ErrorMessage>{ authError }</ErrorMessage>}
      <form onSubmit={onSubmit} noValidate>
      <FormControl>
        <FormInput
          type="email"
          name="email"
          placeholder="E-mail"
          autoComplete="off"
          value={loginForm.email}
          hasError={!!loginError.email}
          onChange={(e) => onFieldChange(e.target.name, e.target.value)}
        />
        {loginError.email && <ErrorMessage>{ loginError.email }</ErrorMessage>}
      </FormControl>
      <FormControl>
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
          hasError={!!loginError.password}
          onChange={(e) => onFieldChange(e.target.name, e.target.value)}
        />
        {loginError.password && <ErrorMessage>{ loginError.password }</ErrorMessage>}
      </FormControl>
      <FormAction>
        <FormButton type="submit">
          Login
        </FormButton>
      </FormAction>
      <FormSwitch onClick={toggleAuthForm}>
        Don’t have an account, Register here
      </FormSwitch>
      </form>
    </AuthContainer>
  );
};

LoginComponent.propTypes = {
  toggleAuthForm: PropTypes.func.isRequired,
  loginForm: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
  loginError: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  authError: PropTypes.string,
};

export default LoginComponent;
