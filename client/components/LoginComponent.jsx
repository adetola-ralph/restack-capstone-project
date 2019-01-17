import React from 'react';
import PropTypes from 'prop-types';

import { AuthContainer, AuthContainerTitle, FormControl, FormInput, FormSwitch, FormButton, FormAction } from './styled';

const LoginComponent = ({}) => {
  return (
    <AuthContainer>
      <AuthContainerTitle>
        Login
      </AuthContainerTitle>
      <FormControl>
        <FormInput type="email" name="email" placeholder="E-mail" autoComplete="off"/>
      </FormControl>
      <FormControl>
        <FormInput type="password" name="password" placeholder="Password" />
      </FormControl>
      <FormSwitch>
        Don’t have an account, Register here
      </FormSwitch>
      <FormAction>
        <FormButton>
          Login
        </FormButton>
      </FormAction>
    </AuthContainer>
  );
};

LoginComponent.propTypes = {
};

export default LoginComponent;
