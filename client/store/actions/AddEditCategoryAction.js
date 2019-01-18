import {
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  CLOSE_CATEGORY_MODAL,
  OPEN_ADD_CATEGORY_MODAL,
  OPEN_EDIT_CATEGORY_MODAL
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
