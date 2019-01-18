import { SET_SEARCH_VALUE, SET_SEARCH_INDEX_RESULT } from '../constants';

import SearchService from '../../service/search';

export const setSearchValue = searchValue => ({
  type: SET_SEARCH_VALUE,
  searchValue,
});

export const setSearchIndexResult = searchIndexResult => ({
  type: SET_SEARCH_INDEX_RESULT,
  searchIndexResult,
});

export const searchWithValue = searchValue => (dispatch) => {
  dispatch(setSearchValue(searchValue));

  // perform the search here
  const searchIndexResult = SearchService.search(searchValue);
  dispatch(setSearchIndexResult(searchIndexResult));
};
