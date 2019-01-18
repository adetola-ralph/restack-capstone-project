import { combineReducers } from 'redux';

import auth from './authReducers';
import search from './searchReducer';
import categoryItems from './categoryReducer';
import addEditCategory from './AddEditCategoryReducer';

export default combineReducers({
  auth,
  search,
  addEditCategory,
  categoryItems,
});
