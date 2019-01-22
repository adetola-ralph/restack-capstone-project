import shortid from 'shortid';

import CategoryItemComponent from '../../components/CategoryItemComponent';

const { mount } = Enzyme;

const deleteCategory = jest.fn();
const editCategory = jest.fn();

const defaultProps = {
  isAuthenticated: false,
  category: {
    _id: shortid.generate(),
    title: 'installing git',
    instructions: [
      {
        _id: shortid.generate(),
        title: 'Install git on macOS with Homebrew',
        command: 'brew install git',
      },
      {
        _id: shortid.generate(),
        title: 'Install git on Debian-based linux',
        command: 'sudo apt-get install git',
      },
      {
        _id: shortid.generate(),
        title: 'Install git on Windows with Chocolatey',
        command: 'choco install git',
      },
    ],
  },
  deleteCategory,
  editCategory,
};

let wrapper;

describe('CategoryItemComponent', () => {
  beforeAll(() => {
    wrapper = mount(<CategoryItemComponent {...defaultProps} />);
  });

  it('should not show action buttons if isAuthenticated is false', () => {
    const actionIcons = wrapper.find('header i');

    expect(actionIcons).toHaveLength(0);
  });

  it('should not show action buttons if isAuthenticated is false', () => {
    wrapper.setProps({ isAuthenticated: true });
    wrapper.update();
    const actionIcons = wrapper.find('header i');

    expect(actionIcons).toHaveLength(2);
  });

  it('edit icon should trigger editCategory function', () => {
    const editicon = wrapper.find('header i.far.fa-clone');

    editicon.simulate('click');
    expect(editCategory).toHaveBeenCalled();
    expect(editCategory).toHaveBeenCalledWith(defaultProps.category._id);
  });

  it('delete icon should trigger deleteCategory function', () => {
    const deleteicon = wrapper.find('header i.fas.fa-trash-alt');

    deleteicon.simulate('click');
    expect(deleteCategory).toHaveBeenCalled();
    expect(deleteCategory).toHaveBeenCalledWith(defaultProps.category._id);
  });
});
