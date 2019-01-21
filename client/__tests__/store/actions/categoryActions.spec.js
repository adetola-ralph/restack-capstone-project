import Axios from 'axios';
import Moxios from 'moxios';
import shortid from 'shortid';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  LOADING_CATEGORY,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  LOGOUT,
  DELETE_CATEGORY_FAILURE,
} from '../../../store/constants';

import {
  deleteCategory,
  deleteCategoryAction,
  editCategory,
  loadCategory,
  loadCategoryFailure,
  loadCategorySuccess,
  loadingCategory,
  deleteCategoryFailure,
} from '../../../store/actions/categoryActions';

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
];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  categoryItems: [],
  auth: {
    token: 'token',
  },
});

describe('CategoryActions', () => {
  test('loadingCategory', () => {
    expect(loadingCategory()).toEqual({
      type: LOADING_CATEGORY,
    });
  });

  test('loadCategorySuccess', () => {
    expect(loadCategorySuccess([])).toEqual({
      type: LOAD_CATEGORY_SUCCESS,
      categoryItems: [],
    });
  });

  test('loadCategoryFailure', () => {
    expect(loadCategoryFailure('Error')).toEqual({
      type: LOAD_CATEGORY_FAILURE,
      error: 'Error',
    });
  });

  test('editCategory', () => {
    expect(editCategory('categoryid')).toEqual({
      type: EDIT_CATEGORY,
      categoryId: 'categoryid',
    });
  });

  test('deleteCategory', () => {
    expect(deleteCategory('categoryid')).toEqual({
      type: DELETE_CATEGORY,
      categoryId: 'categoryid',
    });
  });

  test('deleteCategory', () => {
    expect(deleteCategoryFailure('Error message')).toEqual({
      type: DELETE_CATEGORY_FAILURE,
      error: 'Error message',
    });
  });

  describe('async action creators', () => {
    beforeEach(() => {
      Moxios.install(Axios);
    });

    afterEach(() => {
      store.clearActions();
      Moxios.uninstall(Axios);
    });

    test('loadCategory', async () => {
      Moxios.stubOnce('get', '/api/categoryItems', {
        status: 200,
        response: categoryItems,
      });

      await store.dispatch(loadCategory());

      expect(store.getActions()).toEqual([{ type: 'LOADING_CATEGORY' },
        { type: 'LOAD_CATEGORY_SUCCESS', categoryItems }]);
    });

    test('loadCategory failed request', async () => {
      Moxios.stubOnce('get', '/api/categoryItems', {
        status: 404,
        responseText: 'Error message',
      });

      await store.dispatch(loadCategory());

      expect(store.getActions()).toEqual([{ type: 'LOADING_CATEGORY' },
        { type: 'LOAD_CATEGORY_FAILURE', error: 'Error message' }]);
    });

    test('deleteCategoryAction', async () => {
      const categoryId = 'categoryId';

      Moxios.stubRequest(`/api/categoryItems/${categoryId}`, {
        status: 200,
      });

      await store.dispatch(deleteCategoryAction(categoryId));
      expect(store.getActions()).toEqual([{ type: 'DELETE_CATEGORY', categoryId: 'categoryId' }]);
    });

    test('deleteCategoryAction failed request', async () => {
      const categoryId = 'categoryId';

      Moxios.stubRequest(`/api/categoryItems/${categoryId}`, {
        status: 404,
        responseText: 'Error message',
      });

      await store.dispatch(deleteCategoryAction(categoryId));

      expect(store.getActions()).toEqual([{ type: 'DELETE_CATEGORY_FAILURE', error: 'Error message' }]);
    });

    test('deleteCategoryAction without token', async () => {
      const newStore = mockStore({
        categoryItems: [],
        auth: {
          token: '',
        },
      });

      const categoryId = 'categoryId';

      Moxios.stubRequest(`/api/categoryItems/${categoryId}`, {
        status: 200,
      });

      await newStore.dispatch(deleteCategoryAction(categoryId));
      expect(newStore.getActions()).toEqual([{ type: LOGOUT }]);
    });
  });
});
