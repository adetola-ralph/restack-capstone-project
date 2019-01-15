import Axios from 'axios';

import { LOADING_CATEGORY, LOAD_CATEGORY_SUCCESS, LOAD_CATEGORY_FAILURE } from '../constants';

import SearchService from '../../service/search';

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

    // move this to its own block so it can determing the
    // availablity of the search service
    SearchService.init(categoryItems);
  } catch (err) {
    dispatch(loadCategoryFailure(err));
  }
};
