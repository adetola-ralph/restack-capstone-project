import LoginComponent from '../../components/LoginComponent';

const { mount } = Enzyme;

const toggleAuthForm = jest.fn();
const onFieldChange = jest.fn(x => x);
const loginAction = jest.fn();

const defaultProps = {
  toggleAuthForm,
  loginForm: {
    email: '',
    password: '',
  },
  onFieldChange,
  loginAction,
  loginError: {
    email: '',
    password: '',
  },
  authError: '',
};

let wrapper;

describe('LoginComponent', () => {
  beforeAll(() => {
    wrapper = mount(<LoginComponent {...defaultProps} />);
  });

  it('should render 2 input fields', () => {
    const inputFields = wrapper.find('input');
    expect(inputFields.length).toBe(2);
  });

  it('should onFieldChange event when the value of email field is changed', () => {
    const emailInputField = wrapper.find('input[type="email"]');

    emailInputField.simulate('change', {
      target: {
        name: emailInputField.props('name'),
        value: 'admin@oreofe.me',
      },
    });

    expect(onFieldChange).toHaveBeenCalled();
    onFieldChange.mockClear();
  });

  it('should onFieldChange event when the value of password field is changed', () => {
    const passwordInputField = wrapper.find('input[type="password"]');

    passwordInputField.simulate('change', {
      target: {
        name: passwordInputField.props('password'),
        value: 'password',
      },
    });

    expect(onFieldChange).toHaveBeenCalled();
    onFieldChange.mockClear();
  });

  it('should called login when form is submitted', () => {
    const form = wrapper.find('form');

    form.simulate('submit', {
      preventDefault: jest.fn(),
    });

    expect(loginAction).toHaveBeenCalled();
    loginAction.mockClear();
  });
});
