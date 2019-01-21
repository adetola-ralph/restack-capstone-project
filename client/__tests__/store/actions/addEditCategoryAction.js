import Axios from 'axios';
import Moxios from 'moxios';
import shortid from 'shortid';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  CLOSE_CATEGORY_MODAL,
  SET_INSTRUCTION_FIELD,
  EDIT_CATEGORY_FAILURE,
  OPEN_ADD_CATEGORY_MODAL,
  OPEN_EDIT_CATEGORY_MODAL,
  SET_CATEGORY_TITLE_FIELD,
  ADD_NEW_CATEGORY_FAILURE,
  EDIT_CATEGORY_SUCCESSFUL,
  ADD_NEW_CATEGORY_SUCCESSFUL,
  LOGOUT,
} from '../../../store/constants';

import {
  addCategory,
  addInstruction,
  addNewCategoryFailure,
  addNewCategorySuccessful,
  closeCategoryModal,
  editCategory,
  editCategoryFailure,
  editCategorySuccessful,
  openAddCategoryModal,
  openEditCategoryModal,
  removeInstruction,
  setCategoryTitleField,
  setInstructionField
} from '../../../store/actions/addEditCategoryAction';

import { defaultState } from '../../../store/reducer/addEditCategoryReducer';

const categoryItemId = shortid.generate()

const categoryItems = [
  {
    _id: categoryItemId,
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
];

const newCategory = {
  title: 'Configuring Git',
  instructions: [
    {
      title: 'Install git on macOS with Homebrew',
      command: 'brew install git',
    },
  ],
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  addEditCategory: {
    ...defaultState,
    newCategory,
  },
  auth: {
    token: 'token',
  },
  categoryItems,
});

describe('AddEditCategoryAction', () => {
  describe('async actions', () => {
    beforeEach(() => {
      Moxios.install(Axios);
    });

    afterEach(() => {
      jest.resetAllMocks();
      store.clearActions();
      Moxios.uninstall(Axios);
    });

    test('openEditCategoryModal', () => {
      store.dispatch(openEditCategoryModal(categoryItemId));

      expect(store.getActions()).toEqual([{
        type: OPEN_EDIT_CATEGORY_MODAL,
        categoryItem: categoryItems[0],
      }]);
    });

    test('addCategory', async () => {
      const newCategoryId = shortid.generate();
      Moxios.stubOnce('post', '/api/categoryItems', {
        status: 200,
        response: {
          ...newCategory,
          _id: newCategoryId,
        },
      });

      await store.dispatch(addCategory());
      expect(store.getActions()).toEqual([
        {
          type: ADD_NEW_CATEGORY_SUCCESSFUL,
          category: {
            ...newCategory,
            _id: newCategoryId,
          },
        },
      ]);
    });

    test('addCategory error', async () => {
      Moxios.stubOnce('post', '/api/categoryItems', {
        status: 400,
        responseText: 'Error message',
      });

      await store.dispatch(addCategory());
      expect(store.getActions()).toEqual([
        {
          type: ADD_NEW_CATEGORY_FAILURE,
          error: 'Error message',
        },
      ]);
    });

    test('addCategory no token', async () => {
      const newStore = mockStore({
        addEditCategory: {
          ...defaultState,
        },
        auth: {
          token: '',
        },
      });

      await newStore.dispatch(addCategory());
      expect(newStore.getActions()).toEqual([
        {
          type: LOGOUT,
        },
      ]);
    });

    describe('editCategory', () => {
      let newStore;
      const newCategoryId = shortid.generate();

      beforeEach(() => {
        Moxios.install(Axios);
        newStore = mockStore({
          addEditCategory: {
            ...defaultState,
            newCategory: {
              ...newCategory,
              _id: newCategoryId,
              title: 'Some title here',
            },
          },
          auth: {
            token: 'token',
          },
          categoryItems,
        });
      });

      afterEach(() => {
        jest.resetAllMocks();
        store.clearActions();
        Moxios.uninstall(Axios);
      });

      test('editCategory', async () => {
        Moxios.stubOnce('patch', `/api/categoryItems/${newCategoryId}`, {
          status: 200,
          response: {
            ...newCategory,
            _id: newCategoryId,
            title: 'Some title here',
          },
        });

        await newStore.dispatch(editCategory());
        expect(newStore.getActions()).toEqual([
          {
            type: EDIT_CATEGORY_SUCCESSFUL,
            category: {
              ...newCategory,
              _id: newCategoryId,
              title: 'Some title here',
            },
          },
        ]);
      });

      test('editCategory error', async () => {
        Moxios.stubOnce('patch', `/api/categoryItems/${newCategoryId}`, {
          status: 400,
          responseText: 'Error message',
        });

        await newStore.dispatch(editCategory());
        expect(newStore.getActions()).toEqual([
          {
            type: EDIT_CATEGORY_FAILURE,
            error: 'Error message',
          },
        ]);
      });

      test('addCategory no token', async () => {
        const noTokenStore = mockStore({
          addEditCategory: {
            ...defaultState,
            newCategory: {
              ...newCategory,
              _id: newCategoryId,
              title: 'Some title here',
            },
          },
          auth: {
            token: '',
          },
          categoryItems,
        });

        await noTokenStore.dispatch(editCategory());
        expect(noTokenStore.getActions()).toEqual([
          {
            type: LOGOUT,
          },
        ]);
      });
    });
  });
});
