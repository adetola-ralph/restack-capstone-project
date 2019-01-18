import Axios from 'axios';

import {
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  CLOSE_CATEGORY_MODAL,
  SET_INSTRUCTION_FIELD,
  OPEN_ADD_CATEGORY_MODAL,
  OPEN_EDIT_CATEGORY_MODAL,
  SET_CATEGORY_TITLE_FIELD,
  EDIT_CATEGORY_SUCCESSFUL,
  ADD_NEW_CATEGORY_SUCCESSFUL,
} from '../constants';

export const addInstruction = () => ({
  type: ADD_INSTRUCTION,
});

export const removeInstruction = (index) => ({
  type: REMOVE_INSTRUCTION,
  index
});

export const openAddCategoryModal = () => ({
  type: OPEN_ADD_CATEGORY_MODAL,
});

export const openEditCategoryModal = (categoryId) => (dispatch, getState) => {
  const state = getState();
  const categoryItem = state.categoryItems.find(item => item._id === categoryId);
  dispatch({
    type: OPEN_EDIT_CATEGORY_MODAL,
    categoryItem,
  });
};

export const closeCategoryModal = () => ({
  type: CLOSE_CATEGORY_MODAL,
});

export const setInstructionField = (index, field, value) => ({
  type: SET_INSTRUCTION_FIELD,
  field,
  value,
  index,
});

export const setCategoryTitleField = (value) => ({
  type: SET_CATEGORY_TITLE_FIELD,
  value,
});

export const addCategory = () => async (dispatch, getState) => {
  const { addEditCategory, auth } = getState();
  const { newCategory } = addEditCategory;
  const { token } = auth;

  if (!token) {
    return dispatch(logout());
  }

  try {
    const result = await Axios.post('/api/categoryItems', newCategory, { headers: { 'x-access-token': token } });
    dispatch(addNewCategorySuccessful(result.data));
  } catch (err) {
    const error = err.response || err.request;
    console.log(error);
  }
};

export const editCategory = () => async (dispatch, getState) => {
  const { addEditCategory, auth } = getState();
  const { newCategory } = addEditCategory;
  const { token } = auth;

  if (!token) {
    return dispatch(logout());
  }

  try {
    const result = await Axios.patch(`/api/categoryItems/${newCategory._id}`, newCategory, { headers: { 'x-access-token': token } });
    dispatch(editCategorySuccessful(result.data));
  } catch (err) {
    const error = err.response || err.request;
    console.log(error);
  }
};

export const addNewCategorySuccessful = (category) => ({
  type: ADD_NEW_CATEGORY_SUCCESSFUL,
  category
});

export const editCategorySuccessful = (category) => ({
  type: EDIT_CATEGORY_SUCCESSFUL,
  category
});
