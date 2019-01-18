import { combineReducers } from 'redux';

import auth from './authReducer';
import search from './searchReducer';
import categoryItems from './categoryReducer';
import addEditCategory from './addEditCategoryReducer';

export default combineReducers({
  auth,
  search,
  addEditCategory,
  categoryItems,
});
