import { LOAD_CATEGORY_SUCCESS, DELETE_CATEGORY } from '../constants';

const categoryReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case (LOAD_CATEGORY_SUCCESS):
      return action.categoryItems;
    case (DELETE_CATEGORY):
      return state.filter(item => item._id !== action.categoryId);
    default:
      return state;
  }
};

export default categoryReducer;
