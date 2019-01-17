import React from 'react';
import PropTypes from 'prop-types';

import { AuthContainer, AuthContainerTitle, FormControl, FormInput, FormSwitch, FormButton, FormAction } from './styled';

const RegisterComponent = ({}) => {
  return (
    <AuthContainer>
      <AuthContainerTitle>
        Register
      </AuthContainerTitle>
      <FormControl>
        <FormInput type="text" name="firstname" placeholder="Firstname" autoComplete="off"/>
      </FormControl>
      <FormControl>
        <FormInput type="text" name="lastname" placeholder="Lastname" autoComplete="off"/>
      </FormControl>
      <FormControl>
        <FormInput type="email" name="email" placeholder="E-mail" autoComplete="off"/>
      </FormControl>
      <FormControl>
        <FormInput type="password" name="password" placeholder="Password" />
      </FormControl>
      <FormControl>
        <FormInput type="password" name="confirmpassword" placeholder="Confirm Password" />
      </FormControl>
      <FormSwitch>
        Already have an account, Login here
      </FormSwitch>
      <FormAction>
        <FormButton>
          Register
        </FormButton>
      </FormAction>
    </AuthContainer>
  );
};

RegisterComponent.propTypes = {
};

export default RegisterComponent;
