import React from 'react';
import PropTypes from 'prop-types';

import { AuthContainer, AuthContainerTitle, FormControl, FormInput, FormSwitch, FormButton, FormAction, ErrorMessage } from './styled';

const RegisterComponent = ({ toggleAuthForm, registerForm, onFieldChange, registrationAction, registerError, authError }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    registrationAction()
  };

  return (
    <AuthContainer>
      <AuthContainerTitle>
        Register
      </AuthContainerTitle>
      {authError && <ErrorMessage>{ authError }</ErrorMessage>}
      <form onSubmit={onSubmit} noValidate>
        <FormControl>
          <FormInput
            type="text"
            name="firstname"
            placeholder="Firstname"
            autoComplete="off"
            value={registerForm.firstname}
            hasError={!!registerError.firstname}
            onChange={(e) => onFieldChange(e.target.name, e.target.value)}
          />
          {registerError.firstname && <ErrorMessage>{ registerError.firstname }</ErrorMessage>}
        </FormControl>
        <FormControl>
          <FormInput
            type="text"
            name="lastname"
            placeholder="Lastname"
            autoComplete="off"
            value={registerForm.lastname}
            hasError={!!registerError.lastname}
            onChange={(e) => onFieldChange(e.target.name, e.target.value)}
          />
          {registerError.lastname && <ErrorMessage>{ registerError.lastname }</ErrorMessage>}
        </FormControl>
        <FormControl>
          <FormInput
            type="email"
            name="email"
            placeholder="E-mail"
            autoComplete="off"
            value={registerForm.email}
            hasError={!!registerError.email}
            onChange={(e) => onFieldChange(e.target.name, e.target.value)}
          />
          {registerError.email && <ErrorMessage>{ registerError.email }</ErrorMessage>}
        </FormControl>
        <FormControl>
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            hasError={!!registerError.password}
            onChange={(e) => onFieldChange(e.target.name, e.target.value)}
          />
          {registerError.password && <ErrorMessage>{ registerError.password }</ErrorMessage>}
        </FormControl>
        <FormControl>
          <FormInput
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={registerForm.confirmpassword}
            hasError={!!registerError.confirmpassword}
            onChange={(e) => onFieldChange(e.target.name, e.target.value)}
          />
          {registerError.confirmpassword && <ErrorMessage>{ registerError.confirmpassword }</ErrorMessage>}
        </FormControl>
        <FormAction>
          <FormButton type="submit">
            Register
          </FormButton>
        </FormAction>
        <FormSwitch onClick={toggleAuthForm}>
          Already have an account, Login here
        </FormSwitch>
      </form>
    </AuthContainer>
  );
};

RegisterComponent.propTypes = {
  toggleAuthForm: PropTypes.func.isRequired,
  registerForm: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmpassword: PropTypes.string.isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  registrationAction: PropTypes.func.isRequired,
  registerError: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmpassword: PropTypes.string,
  }),
  authError: PropTypes.string,
};

export default RegisterComponent;
