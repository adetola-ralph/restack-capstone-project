import shortid from 'shortid';

import { SET_SEARCH_VALUE, SET_SEARCH_INDEX_RESULT } from '../../../store/constants';

import SearchReducer, { defaultState } from '../../../store/reducer/searchReducer';

describe('SearchReducer', () => {
  it('should return the default state', () => {
    const state = SearchReducer(undefined, { type: '' });

    expect(state).toEqual(defaultState);
  });

  test('setting the search text value', () => {
    const action = {
      type: SET_SEARCH_VALUE,
      searchValue: 'initialise',
    };

    const state = SearchReducer(defaultState, action);

    expect(state).toHaveProperty('searchValue', 'initialise');
  });

  test('setting the index result', () => {
    const action = {
      type: SET_SEARCH_INDEX_RESULT,
      searchIndexResult: [
        {
          ref: shortid.generate(),
        },
        {
          ref: shortid.generate(),
        },
      ],
    };

    const state = SearchReducer(defaultState, action);

    expect(state).toHaveProperty('searchIndexResult',
      action.searchIndexResult.map(searchIndex => searchIndex.ref));
  });
});
