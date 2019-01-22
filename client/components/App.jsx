import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import BodyComponent from './BodyComponent';
import LoginComponent from './LoginComponent';
import AddEditCategory from './AddEditCategory';
import SidebarComponent from './SidebarComponent';
import RegisterComponent from './RegisterComponent';

import {
  logout,
  loginAction,
  toggleAuthForm,
  registrationAction,
  setLoginFormField,
  setRegisterFormField,
} from './../store/actions/authActions';

import { openAddCategoryModal } from './../store/actions/addEditCategoryAction';

import {
  Brand,
  Avatar,
  Header,
  AddButton,
  Container,
  TitleHeader,
  GlobalStyle,
  AuthUserName,
  LogoutButton,
  SidebarContainer,
} from './styled';

const App = ({
  user,
  logout,
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
  openAddCategoryModal,
}) => (
  <Fragment>
    <GlobalStyle />
    <AddEditCategory />
    <SidebarComponent>
      <SidebarContainer>
        {
          isAuthenticated
          && (
            <Fragment>
              <Avatar size="200px" />
              <AuthUserName>
                Hello
                { `${user.firstname} ${user.lastname}`}
                !
              </AuthUserName>
              <LogoutButton width="85%" onClick={logout}>Logout</LogoutButton>
            </Fragment>
          )
        }
        {
          isLoginForm
          && !isAuthenticated
          && (
            <LoginComponent
              loginForm={loginForm}
              loginError={loginError}
              authError={authError}
              loginAction={loginAction}
              toggleAuthForm={toggleAuthForm}
              onFieldChange={setLoginFormField}
            />
          )
        }
        {
          isRegisterForm
          && !isAuthenticated
          && (
            <RegisterComponent
              registerForm={registerForm}
              authError={authError}
              toggleAuthForm={toggleAuthForm}
              registrationAction={registrationAction}
              onFieldChange={setRegisterFormField}
              registerError={registerError}
            />
          )
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
    {
      isAuthenticated
      && (
        <AddButton onClick={openAddCategoryModal}>
          <i className="fas fa-plus" />
        </AddButton>
      )
    }
  </Fragment>
);

App.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    __v: PropTypes.number,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  loginForm: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  authError: PropTypes.string.isRequired,
  loginError: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  isLoginForm: PropTypes.bool.isRequired,
  loginAction: PropTypes.func.isRequired,
  registerForm: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmpassword: PropTypes.string.isRequired,
  }).isRequired,
  registerError: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmpassword: PropTypes.string.isRequired,
  }).isRequired,
  toggleAuthForm: PropTypes.func.isRequired,
  isRegisterForm: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setLoginFormField: PropTypes.func.isRequired,
  registrationAction: PropTypes.func.isRequired,
  setRegisterFormField: PropTypes.func.isRequired,
  openAddCategoryModal: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ auth }) => {
  const {
    isAuthenticated,
    isLoginForm,
    isRegisterForm,
    user,
    loginForm,
    registerForm,
    loginError,
    registerError,
    authError,
  } = auth;

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

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loginAction: () => dispatch(loginAction()),
  registrationAction: () => dispatch(registrationAction()),
  openAddCategoryModal: () => dispatch(openAddCategoryModal()),
  toggleAuthForm: () => dispatch(toggleAuthForm()),
  setLoginFormField: (field, value) => dispatch(setLoginFormField(field, value)),
  setRegisterFormField: (field, value) => dispatch(setRegisterFormField(field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
