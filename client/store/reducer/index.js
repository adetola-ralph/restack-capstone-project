import { combineReducers } from 'redux';

import categoryItems from './categoryReducer';
import search from './searchReducer';

export default combineReducers({
  categoryItems,
  search,
});
