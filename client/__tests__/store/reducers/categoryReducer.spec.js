import shortid from 'shortid';

import {
  LOAD_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  ADD_NEW_CATEGORY_SUCCESSFUL,
  EDIT_CATEGORY_SUCCESSFUL,
} from '../../../store/constants';

import CategoryReducer from '../../../store/reducer/categoryReducer';

const defaultState = [];

const categoryItems = [
  {
    _id: shortid.generate(),
    title: 'installing git',
    instructions: [
      {
        title: 'Install git on macOS with Homebrew',
        command: 'brew install git',
      },
      {
        title: 'Install git on Debian-based linux',
        command: 'sudo apt-get install git',
      },
      {
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
        title: 'Creates a new local repository with the specified name',
        command: 'git init [project-name]',
      },
      {
        title: 'Downloads a project and its entire version history',
        command: 'git clone [url]',
      },
    ],
  },
  {
    _id: shortid.generate(),
    title: 'make changes',
    instructions: [
      {
        title: 'Lists all new or modified files to be commited',
        command: 'git status',
      },
    ],
  },
];

describe('CategoryReducer', () => {
  it('should return the default state', () => {
    const state = CategoryReducer(undefined, { type: '' });

    expect(state).toEqual(defaultState);
  });

  test('loading category success', () => {
    const action = {
      type: LOAD_CATEGORY_SUCCESS,
      categoryItems,
    };

    const state = CategoryReducer(defaultState, action);

    expect(state).toEqual(categoryItems);
  });

  test('deleting category', () => {
    const initialAction = {
      type: LOAD_CATEGORY_SUCCESS,
      categoryItems,
    };

    const initialState = CategoryReducer(defaultState, initialAction);

    const newAction = {
      type: DELETE_CATEGORY,
      categoryId: categoryItems[1]._id,
    };

    const newState = CategoryReducer(initialState, newAction);

    expect(newState).not.toContainEqual(categoryItems[1]);
  });

  test('adding new category', () => {
    const initialAction = {
      type: LOAD_CATEGORY_SUCCESS,
      categoryItems,
    };

    const initialState = CategoryReducer(defaultState, initialAction);

    const newId = shortid.generate();
    const newCategory = {
      _id: newId,
      title: 'Some title here',
    };

    const newAction = {
      type: ADD_NEW_CATEGORY_SUCCESSFUL,
      category: newCategory,
    };

    const newState = CategoryReducer(initialState, newAction);

    expect(newState).toContainEqual(newCategory);
  });

  test('editing a category', () => {
    const initialAction = {
      type: LOAD_CATEGORY_SUCCESS,
      categoryItems,
    };

    const initialState = CategoryReducer(defaultState, initialAction);

    const category = categoryItems[1];

    const newAction = {
      type: EDIT_CATEGORY_SUCCESSFUL,
      category: {
        ...category,
        title: 'Something else',
      },
    };

    const newState = CategoryReducer(initialState, newAction);

    expect(newState[1]).toHaveProperty('title', 'Something else');
    expect(newState[1]).not.toEqual('title', category);
  });
});
