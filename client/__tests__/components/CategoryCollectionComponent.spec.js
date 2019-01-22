import shortid from 'shortid';

import { CategoryCollectionComponent, mapStateToProps, mapDispatchToProps } from '../../components/CategoryCollectionComponent';

const { mount } = Enzyme;

const deleteCategory = jest.fn();
const openEditCategoryModal = jest.fn();

const defaultProps = {
  isAuthenticated: false,
  categoryItems: [
    {
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
    {
      _id: shortid.generate(),
      title: 'create repositories',
      instructions: [
        {
          _id: shortid.generate(),
          title: 'Creates a new local repository with the specified name',
          command: 'git init [project-name]',
        },
        {
          _id: shortid.generate(),
          title: 'Downloads a project and its entire version history',
          command: 'git clone [url]',
        },
      ],
    },
  ],
  deleteCategory,
  openEditCategoryModal,
};

let wrapper;

describe('CategoryCollectionComponent', () => {
  beforeAll(() => {
    wrapper = mount(<CategoryCollectionComponent {...defaultProps} />);
  });

  it('should render 2 category elements', () => {
    const categories = wrapper.find('.category');

    expect(categories).toHaveLength(2);
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).deleteCategory(defaultProps.categoryItems[0]._id);
    expect(dispatch).toHaveBeenCalled();

    dispatch.mockClear();

    mapDispatchToProps(dispatch).openEditCategoryModal(defaultProps.categoryItems[0]._id);
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    const args = {
      categoryItems: defaultProps.categoryItems,
      search: {
        searchIndexResult: '',
        searchValue: '',
      },
      auth: {
        isAuthenticated: false,
      },
    };

    expect(mapStateToProps(args)).toEqual({
      isAuthenticated: false,
      categoryItems: defaultProps.categoryItems,
    });

    const args2 = {
      ...args,
      search: {
        searchValue: 'value',
        searchIndexResult: [defaultProps.categoryItems[0]._id],
      },
    }

    expect(mapStateToProps(args2)).toEqual({
      isAuthenticated: false,
      categoryItems: [defaultProps.categoryItems[0]],
    });
  });
});
