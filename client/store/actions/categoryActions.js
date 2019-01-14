import Axios from 'axios';

import { LOADING_CATEGORY, LOAD_CATEGORY_SUCCESS, LOAD_CATEGORY_FAILURE } from '../constants';

export const loadingCategory = () => ({
  type: LOADING_CATEGORY,
});

export const loadCategorySuccess = (categoryItems) => ({
  type: LOAD_CATEGORY_SUCCESS,
  categoryItems,
});

export const loadCategoryFailure = (error) => ({
  type: LOAD_CATEGORY_FAILURE,
  error,
});

export const loadCategory = () => async (dispatch) => {
  dispatch(loadingCategory());
  try {
    const result = await Axios.get('/api/categoryItems')
    const categoryItems = result.data;
    dispatch(loadCategorySuccess(categoryItems));
  } catch (err) {
    dispatch(loadCategoryFailure(err));
  }
};
