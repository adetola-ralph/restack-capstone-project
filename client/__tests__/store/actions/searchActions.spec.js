import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { defaultState } from '../../../store/reducer/searchReducer';
import { SET_SEARCH_VALUE, SET_SEARCH_INDEX_RESULT } from '../../../store/constants';
import { searchWithValue, setSearchIndexResult, setSearchValue } from '../../../store/actions/searchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(defaultState);

describe('SearchActions', () => {
  test('setSearchValue', () => {
    expect(setSearchValue('Search Value')).toEqual({
      type: SET_SEARCH_VALUE,
      searchValue: 'Search Value',
    });
  });

  test('setSearchIndexResult', () => {
    expect(setSearchIndexResult('Search Value')).toEqual({
      type: SET_SEARCH_INDEX_RESULT,
      searchIndexResult: 'Search Value',
    });
  });

  test.skip('searchWithValue', () => {
    store.dispatch(searchWithValue('Value'));
  });
});
