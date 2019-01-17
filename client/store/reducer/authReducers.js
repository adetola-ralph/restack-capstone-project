import {
  LOGOUT,
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

const defaultState = {
  isAuthenticated: false,
  isLoginForm: true,
  isRegisterForm: false,
  user: {},
  token: '',
  loginForm: {
    email: '',
    password: '',
  },
  loginError: {
    email: '',
    password: '',
  },
  registerError: {},
  registerForm: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  },
  authError: '',
}

const authReducer = (state = defaultState, action) => {
  const { type } = action;

  switch (type) {
    case (TOGGLE_AUTH_FIELDS): {
      const { isLoginForm, isRegisterForm } = state;
      return {
        ...state,
        isLoginForm: !isLoginForm,
        isRegisterForm: !isRegisterForm,
        loginError: {},
        registerError: {},
        loginForm: {},
        registerForm: {},
        authError: '',
      }
    }
    case (SET_LOGIN_FORM_FIELD): {
      const { field, value } = action;
      const { loginForm, loginError } = state;

      return {
        ...state,
        loginForm: {
          ...loginForm,
          [field]: value
        },
        loginError: {
          ...loginError,
          [field]: '',
        },
        authError: '',
      };
    }
    case (SET_REGISTER_FORM_FIELD): {
      const { field, value } = action;
      const { registerForm, registerError } = state;

      return {
        ...state,
        registerForm: {
          ...registerForm,
          [field]: value
        },
        registerError: {
          ...registerError,
          [field]: '',
        },
        authError: '',
      };
    }
    case (LOGIN_ERROR): {
      const { errors } = action;

      const loginError = errors.reduce((agg, error) => {
        agg[error.field] = error.message;
        return agg;
      }, {});

      return {
        ...state,
        loginError,
        authError: '',
      };
    }
    case (REGISTRATION_ERROR): {
      const { errors } = action;

      const registerError = errors.reduce((agg, error) => {
        agg[error.field] = error.message;
        return agg;
      }, {});

      return {
        ...state,
        registerError,
        authError: '',
      };
    }
    case (SUCCESSFUL_REGISTRATION): {
      const { token, user } = action.authObject

      return {
        ...state,
        user,
        token,
        isAuthenticated: true,
        loginError: {},
        registerError: {},
        loginForm: {},
        registerForm: {},
        authError: '',
      }
    }
    case (SUCCESSFUL_LOGIN): {
      const { token, user } = action.authObject

      return {
        ...state,
        user,
        token,
        isAuthenticated: true,
        loginError: {},
        registerError: {},
        loginForm: {},
        registerForm: {},
        authError: '',
      }
    }
    case (LOGOUT): {
      return defaultState;
    }
    case (FAILED_LOGIN):
    case (FAILED_REGISTRATION): {
      return {
        ...state,
        authError: action.message,
      }
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
