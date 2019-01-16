import { SET_SEARCH_VALUE, SET_SEARCH_INDEX_RESULT } from '../constants';

const defaultState = {
  searchIndexResult: [],
  searchValue: '',
};

const searchReducer = (state = defaultState, action) => {
  const { type } = action;

  switch (type) {
    case (SET_SEARCH_VALUE): {
      const { searchValue } = action;
      return { ...state, searchValue, };
    }
    case (SET_SEARCH_INDEX_RESULT): {
      const { searchIndexResult } = action;
      return { ...state, searchIndexResult: searchIndexResult.map(result => result.ref) };
    }
    default:
      return state;
  }
};

export default searchReducer;
