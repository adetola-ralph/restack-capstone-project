import { LOAD_CATEGORY_SUCCESS } from '../constants';

const categoryReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case (LOAD_CATEGORY_SUCCESS):
      return action.categoryItems;
    default:
      return state;
  }
};

export default categoryReducer;
