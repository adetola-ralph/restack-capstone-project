import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Search,
  SearchInput,
  SearchIcon,
  SearchLabel,
} from './styled';

import { searchWithValue } from '../store/actions/searchActions';

export const SearchComponent = ({ onChange, searchValue }) => (
  <Search>
    <SearchLabel>
      <SearchInput placeholder="Search..." value={searchValue} onChange={e => onChange(e.target.value)} />
      <SearchIcon />
    </SearchLabel>
  </Search>
);

SearchComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

SearchComponent.defaultProps = {
  searchValue: '',
};

export const mapStateToProps = ({ search }) => {
  const { searchValue } = search;
  return {
    searchValue,
  };
};

export const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(searchWithValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
