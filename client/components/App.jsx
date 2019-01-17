import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import BodyComponent from './BodyComponent';
import LoginComponent from './LoginComponent';
import SidebarComponent from './SidebarComponent';
import RegisterComponent from './RegisterComponent';

import {
  loginAction,
  toggleAuthForm,
  registrationAction,
  setLoginFormField,
  setRegisterFormField,
} from '../store/actions/authActions';

import {
  Brand,
  Avatar,
  Header,
  AddButton,
  Container,
  TitleHeader,
  GlobalStyle,
  SidebarContainer,
} from './styled';

const App = ({
  user,
  loginForm,
  authError,
  loginError,
  isLoginForm,
  loginAction,
  registerForm,
  registerError,
  toggleAuthForm,
  isRegisterForm,
  isAuthenticated,
  setLoginFormField,
  registrationAction,
  setRegisterFormField,
}) => {
  return(
    <Fragment>
      <GlobalStyle />
      <SidebarComponent>
        <SidebarContainer>
          {
            isAuthenticated &&
            <Fragment>
              <Avatar size="200px"></Avatar>
              <p style={{'marginTop': '20px', 'textTransform': 'capitalize'}}>Hello { `${user.firstname} ${user.lastname}`}!</p>
            </Fragment>
          }
          {
            isLoginForm &&
            !isAuthenticated &&
            <LoginComponent
              loginForm={loginForm}
              loginError={loginError}
              authError={authError}
              loginAction={loginAction}
              toggleAuthForm={toggleAuthForm}
              onFieldChange={setLoginFormField}
            />
          }
          {
            isRegisterForm &&
            !isAuthenticated &&
            <RegisterComponent
              registerForm={registerForm}
              authError={authError}
              toggleAuthForm={toggleAuthForm}
              registrationAction={registrationAction}
              onFieldChange={setRegisterFormField}
              registerError={registerError}
            />
          }
        </SidebarContainer>
      </SidebarComponent>
      <Header>
        <Container>
          <Brand>a cheat sheet</Brand>
        </Container>
      </Header>
      <TitleHeader>
        <h1>
          Git <em>cheatsheet</em>
        </h1>
      </TitleHeader>
      <BodyComponent />
      <AddButton>
        <i className="fas fa-plus"></i>
      </AddButton>
    </Fragment>
  );
};

export const mapStateToProps = ({ auth }) => {
  const { isAuthenticated, isLoginForm, isRegisterForm, user, loginForm, registerForm, loginError, registerError, authError } = auth;

  return {
    user,
    loginForm,
    authError,
    loginError,
    isLoginForm,
    registerForm,
    registerError,
    isRegisterForm,
    isAuthenticated,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction()),
    registrationAction: () => dispatch(registrationAction()),
    toggleAuthForm: () => dispatch(toggleAuthForm()),
    setLoginFormField: (field, value) => dispatch(setLoginFormField(field, value)),
    setRegisterFormField: (field, value) => dispatch(setRegisterFormField(field, value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
