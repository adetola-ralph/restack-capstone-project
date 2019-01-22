import RegisterComponent from '../../components/RegisterComponent';

const { mount } = Enzyme;

const toggleAuthForm = jest.fn();
const onFieldChange = jest.fn(x => x);
const registrationAction = jest.fn();

const defaultProps = {
  toggleAuthForm,
  registerForm: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  },
  onFieldChange,
  registrationAction,
  registerError: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  },
  authError: '',
};

let wrapper;

describe('RegisterComponent', () => {
  beforeAll(() => {
    wrapper = mount(<RegisterComponent {...defaultProps} />);
  });

  it('should render 5 input fields', () => {
    const inputFields = wrapper.find('input');
    expect(inputFields.length).toBe(5);
  });

  it('should onFieldChange event when the value of email field is changed', () => {
    const firstnameInputField = wrapper.find('input[name="firstname"]');

    firstnameInputField.simulate('change', {
      target: {
        name: firstnameInputField.props('name'),
        value: 'oreofe',
      },
    });

    expect(onFieldChange).toHaveBeenCalled();
    onFieldChange.mockClear();
  });

  it('should onFieldChange event when the value of lastname field is changed', () => {
    const lastnameInputField = wrapper.find('input[name="lastname"]');

    lastnameInputField.simulate('change', {
      target: {
        name: lastnameInputField.props('name'),
        value: 'olutola',
      },
    });

    expect(onFieldChange).toHaveBeenCalled();
    onFieldChange.mockClear();
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
    const passwordInputField = wrapper.find('input[name="password"]');

    passwordInputField.simulate('change', {
      target: {
        name: passwordInputField.props('password'),
        value: 'password',
      },
    });

    expect(onFieldChange).toHaveBeenCalled();
    onFieldChange.mockClear();
  });

  it('should onFieldChange event when the value of confirmpassword field is changed', () => {
    const confirmPasswordInputField = wrapper.find('input[name="confirmpassword"]');

    confirmPasswordInputField.simulate('change', {
      target: {
        name: confirmPasswordInputField.props('password'),
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

    expect(registrationAction).toHaveBeenCalled();
    registrationAction.mockClear();
  });
});
