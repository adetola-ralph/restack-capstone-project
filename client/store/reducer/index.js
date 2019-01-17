import { combineReducers } from 'redux';

import search from './searchReducer';
import auth from './authReducers';
import categoryItems from './categoryReducer';

export default combineReducers({
  auth,
  search,
  categoryItems,
});
