import Axios from 'axios';

import {
  LOADING_CATEGORY, LOAD_CATEGORY_SUCCESS, LOAD_CATEGORY_FAILURE, EDIT_CATEGORY, DELETE_CATEGORY,
} from '../constants';

import { logout } from './authActions';

import SearchService from '../../service/search';

export const loadingCategory = () => ({
  type: LOADING_CATEGORY,
});

export const loadCategorySuccess = categoryItems => ({
  type: LOAD_CATEGORY_SUCCESS,
  categoryItems,
});

export const loadCategoryFailure = error => ({
  type: LOAD_CATEGORY_FAILURE,
  error,
});

export const loadCategory = () => async (dispatch) => {
  dispatch(loadingCategory());
  try {
    const result = await Axios.get('/api/categoryItems');
    const categoryItems = result.data;
    dispatch(loadCategorySuccess(categoryItems));

    // move this to its own block so it can determing the
    // availablity of the search service
    SearchService.init(categoryItems);
  } catch (err) {
    dispatch(loadCategoryFailure(err));
  }
};

export const editCategory = categoryId => ({
  type: EDIT_CATEGORY,
  categoryId,
});

export const deleteCategory = categoryId => ({
  type: DELETE_CATEGORY,
  categoryId,
});

export const deleteCategoryAction = categoryId => async (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth;

  if (!token) {
    return dispatch(logout());
  }

  try {
    await Axios.delete(`/api/categoryItems/${categoryId}`, { headers: { 'x-access-token': token } });
    dispatch(deleteCategory(categoryId));
  } catch (err) {
    const error = err.response || err.request;
    console.log(error);
  }
};
