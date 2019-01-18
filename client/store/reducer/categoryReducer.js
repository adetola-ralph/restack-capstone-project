import {
  LOAD_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  ADD_NEW_CATEGORY_SUCCESSFUL,
  EDIT_CATEGORY_SUCCESSFUL
} from '../constants';

const categoryReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case (LOAD_CATEGORY_SUCCESS):
      return action.categoryItems;
    case (DELETE_CATEGORY):
      return state.filter(item => item._id !== action.categoryId);
    case (ADD_NEW_CATEGORY_SUCCESSFUL): {
      return [
        ...state,
        action.category,
      ];
    }
    case (EDIT_CATEGORY_SUCCESSFUL): {
      return state.map(item => {
        if (item._id === action.category._id) {
          return action.category;
        }

        return item;
      });
    }
    default:
      return state;
  }
};

export default categoryReducer;
